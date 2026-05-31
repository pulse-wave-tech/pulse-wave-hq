# Deployment

Static SPA built by Vite, served by nginx in a container. In production, a sibling `cloudflared` container joins the same docker network and tunnels public traffic in — no host ports are exposed to the internet.

## Topology

```
internet -> Cloudflare edge -> Cloudflare Tunnel -> cloudflared container -> web:80 (nginx)
                                                         (docker network "pulsewave")
```

## Local / dev verification (Windows, Docker Desktop)

No tunnel; just the web container on loopback.

```bash
docker compose up -d --build
curl -sI http://127.0.0.1:8080/healthz                      # expect HTTP 200
curl -sI http://127.0.0.1:8080/careers/some-deep-link       # expect HTTP 200 (SPA fallback)
docker compose logs -f web
docker compose down
```

## LXC production deploy (Proxmox)

One-time bootstrap. Ongoing releases are automated — see **Updates** below; you do
not repeat these steps per deploy.

Assumes an LXC container with Docker + compose plugin already installed (unprivileged + Nesting + keyctl features enabled).

```bash
sudo mkdir -p /opt/stacks/pulse-wave-hq
sudo chown $USER /opt/stacks/pulse-wave-hq
cd /opt/stacks/pulse-wave-hq
git clone https://github.com/pulse-wave-tech/pulse-wave-hq.git .

cp .env.example .env
# edit .env — paste the CLOUDFLARED_TOKEN you got from Cloudflare Zero Trust.
# VITE_* values can stay on defaults for prod.

docker compose --profile tunnel up -d --build
```

Verify:

```bash
docker compose ps
# STATUS: both "pulse-wave-hq" and "pulse-wave-hq-tunnel" should be Up / (healthy)
docker compose exec web wget -qO- http://127.0.0.1/healthz   # expect: ok
docker compose logs --tail=30 cloudflared                    # look for "Registered tunnel connection"
```

From any machine with internet, `curl -sI https://pulsewavetech.io` should return `HTTP/2 200` once DNS is switched over to the tunnel (see Cloudflare Zero Trust UI → Public Hostnames).

## Updates — automated (normal path)

Deploys are automated; **no SSH required.** Push to `main` and the pipeline does the rest:

```
push → main ──► GitHub Actions (.github/workflows/build-validate.yml)
                  validate: `docker compose up -d --build` (the prod build is the
                            content gate), then `docker compose exec web wget`
                            asserts /healthz=ok, /index.html, and each hashed
                            /assets/* entry → 200. Tunnel profile stays off in CI.
                  promote (push to main only): git push --force origin HEAD:refs/heads/live
                                                   │
LXC (Docker host)  ◄─────────────────────────────  live branch
  pulse-wave-hq-deploy.timer (every ~3 min) → pulse-wave-hq-deploy.service
    → /usr/local/bin/pulse-wave-hq-deploy.sh: fetch live; if HEAD != origin/live,
      git reset --hard origin/live && docker compose --profile tunnel up -d --build
```

A broken build never advances `live`, so it never reaches the host. The production
checkout at `/opt/stacks/pulse-wave-hq` tracks the **`live`** branch (not `main`).
This is the same CI-validated branch-promotion pipeline used by the other homelab
stacks.

**Blind spot:** build + HTTP 200 proves the site compiles and *serves*, not that it
*renders*. A change that builds clean but throws on mount still ships a blank 200 —
eyeball the live site after a redesign or otherwise risky deploy.

To release: `git push` to `main`, then confirm the run is green and `live` advanced:

```bash
gh run list --branch main --limit 1          # build-validate → success
git ls-remote origin main live               # both SHAs should match your commit
```

### Manual deploy / break-glass

Only when the timer is wedged or you need an out-of-band rebuild. SSH into the
production LXC (connection details in the private homelab inventory, not this public
repo):

```bash
cd /opt/stacks/pulse-wave-hq
git fetch && git reset --hard origin/live    # the checkout tracks live, not main
docker compose --profile tunnel up -d --build
docker image prune -f
```

Cloudflared restarts take ~5–10 seconds; the tunnel reconnects without DNS churn.

## Rolling back

**The durable rollback is `git revert` on `main`** — it re-runs validate and
re-promotes to `live`, and the timer redeploys the reverted tree within ~3 min.
A host-side rollback alone is *transient*: the deploy timer reconciles to
`origin/live` (`git reset --hard`) every tick, so it will overwrite any manual
container swap unless `live` is also moved back.

For an emergency host-side rollback (to ride out the next few minutes until `live`
is fixed), Docker keeps the previous image as `<none>` after a rebuild:

```bash
docker image ls pulse-wave-hq
docker tag pulse-wave-hq:<old-id> pulse-wave-hq:latest
docker compose --profile tunnel up -d
```

…but follow it immediately by reverting on `main` (or force-pushing `live` back),
or the timer will re-deploy the bad commit. For a more durable image history, tag
each release (e.g. `pulse-wave-hq:2026-04-17`) before the next build.

## Env vars

Vite inlines `VITE_*` at **build time**, not runtime — changing the domain means a rebuild, not a restart. The current code has production fallbacks baked in, so unset build env vars still produce a working site.

| Var | Default | Used in | When it matters |
| --- | --- | --- | --- |
| `VITE_CONTACT_EMAIL` | `info@pulsewavetech.io` | ContactSection, Footer | Build time |
| `VITE_SITE_URL` | `https://pulsewavetech.io` | Footer | Build time |
| `CLOUDFLARED_TOKEN` | *(none)* | cloudflared service | Runtime, only with `--profile tunnel` |

## Cloudflare Tunnel setup (one-time)

See separate walkthrough in the conversation / repo docs. Summary:

1. Cloudflare Zero Trust → **Networks → Tunnels → Create a tunnel**.
2. Choose **Cloudflared** as the connector, pick **Docker** as the environment, name it `pulsewave`.
3. Copy the displayed **token** (long base64 string) into `.env` as `CLOUDFLARED_TOKEN`.
4. Add **Public Hostnames**:
   - `pulsewavetech.io` → `HTTP` → `web:80`
   - `www.pulsewavetech.io` → `HTTP` → `web:80`
   - Cloudflare warns before overwriting any existing A/CNAME records — confirm the overwrite for the old Loveable records.
5. `docker compose --profile tunnel up -d --build` on the LXC.
6. The tunnel appears as **Healthy** in Zero Trust within ~30 seconds.

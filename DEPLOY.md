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

Assumes an LXC container with Docker + compose plugin already installed (unprivileged + Nesting + keyctl features enabled).

```bash
sudo mkdir -p /opt/stacks/pulse-wave-hq
sudo chown $USER /opt/stacks/pulse-wave-hq
cd /opt/stacks/pulse-wave-hq
git clone -b self-hosted https://github.com/zriser/pulse-wave-hq.git .

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

## Updates

```bash
cd /opt/stacks/pulse-wave-hq
git pull
docker compose --profile tunnel up -d --build
docker image prune -f
```

Cloudflared restarts take ~5–10 seconds; the tunnel reconnects without DNS churn.

## Rolling back

Docker keeps the previous image as `<none>` after a rebuild:

```bash
docker image ls pulse-wave-hq
docker tag pulse-wave-hq:<old-id> pulse-wave-hq:latest
docker compose --profile tunnel up -d
```

For a more durable history, tag each release (e.g. `pulse-wave-hq:2026-04-17`) before the next build.

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

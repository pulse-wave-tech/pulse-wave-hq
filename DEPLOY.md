# Deployment

The site is a static SPA built by Vite, served by nginx inside a Docker container. Cloudflare Tunnel (set up in Phase 3) is the only public path in — the container binds to `127.0.0.1` only.

## Local verification (Windows / WSL 2 / Docker Desktop)

```bash
docker compose up -d --build
curl -sI http://127.0.0.1:8080/healthz   # expect HTTP 200
curl -s  http://127.0.0.1:8080/          # expect full HTML
docker compose logs -f web               # tail logs
docker compose down                      # stop
```

Deep-link test (SPA fallback must serve `index.html`, not 404):

```bash
curl -sI http://127.0.0.1:8080/careers/some-deep-link   # expect HTTP 200
```

## Proxmox host setup (one-time)

Pick **a small Debian 12 VM** over LXC — Docker-in-LXC needs nesting and privileged flags you probably don't want. A VM with **1 vCPU, 1–2 GB RAM, 10 GB disk** is plenty for this site.

On that VM:

```bash
# Docker Engine + compose plugin (Debian 12)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER   # log out/in to take effect

# Pulse Wave Tech deploy dir
sudo mkdir -p /opt/pulse-wave-hq && sudo chown $USER /opt/pulse-wave-hq
cd /opt/pulse-wave-hq
git clone https://github.com/zriser/pulse-wave-hq.git .

# Optional: override defaults
cp .env.example .env
# edit .env if needed

docker compose up -d --build
```

Verify:

```bash
curl -sI http://127.0.0.1:8080/healthz
docker compose ps     # STATUS should show "(healthy)" after ~30s
```

## Updates

```bash
cd /opt/pulse-wave-hq
git pull
docker compose up -d --build
docker image prune -f
```

## Rolling back

Docker keeps the previous image as `<none>` after a rebuild. To roll back quickly:

```bash
docker image ls pulse-wave-hq
docker tag pulse-wave-hq:<old-id> pulse-wave-hq:latest
docker compose up -d
```

For a more durable history, tag each release (e.g. `pulse-wave-hq:2026-04-16`) before the next build.

## Build env vars

Vite inlines `VITE_*` at build time, not runtime — so changing the domain means a rebuild, not a container restart. The current code has production fallbacks baked in, so unset env vars still produce a working site.

| Var | Default | Used in |
| --- | --- | --- |
| `VITE_CONTACT_EMAIL` | `info@pulsewavetech.io` | ContactSection, Footer |
| `VITE_SITE_URL` | `https://pulsewavetech.io` | Footer |

## What's next (Phase 3)

Cloudflare Tunnel will run as a second container on the same Docker network and forward `pulsewavetech.io` to `http://web:80` without exposing any port on the Proxmox host. That goes in a follow-up `docker-compose.override.yml` once the tunnel is created in the Cloudflare dashboard.

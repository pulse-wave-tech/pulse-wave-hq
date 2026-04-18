# Pulse Wave Tech Website

Single-page React marketing site for [Pulse Wave Tech](https://pulsewavetech.io), self-hosted in Docker behind a Cloudflare Tunnel.

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS + shadcn/ui (minimal)
- nginx (alpine) for production serving
- Cloudflare Tunnel for public access

## Local development

```bash
npm install
npm run dev           # http://localhost:8080
npm run lint
npm run build         # outputs to dist/
```

## Production deployment

See [DEPLOY.md](./DEPLOY.md) for the full Docker Compose + Cloudflare Tunnel flow. Short version on the deploy host:

```bash
git clone https://github.com/zriser/pulse-wave-hq.git
cd pulse-wave-hq
cp .env.example .env   # fill in CLOUDFLARED_TOKEN
docker compose --profile tunnel up -d --build
```

## Project structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui primitives (minimal set)
│   ├── HeroSection.tsx
│   ├── MissionSection.tsx
│   ├── CompetenciesSection.tsx
│   ├── DifferentiatorsSection.tsx
│   ├── PerformanceSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── WaveformBackground.tsx
│   └── LoadingPulse.tsx
├── assets/
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
└── main.tsx
```

## Environment variables

Vite inlines `VITE_*` at build time. Defaults in `.env.example` match production, so unset values still produce a working site.

| Var | Default | Used in |
| --- | --- | --- |
| `VITE_CONTACT_EMAIL` | `info@pulsewavetech.io` | ContactSection, Footer |
| `VITE_SITE_URL` | `https://pulsewavetech.io` | Footer |
| `CLOUDFLARED_TOKEN` | *(required for tunnel profile)* | docker-compose cloudflared service |

## Contact

- Website: <https://pulsewavetech.io>
- Email: <info@pulsewavetech.io>

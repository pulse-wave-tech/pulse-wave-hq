# syntax=docker/dockerfile:1.7

# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_CONTACT_EMAIL
ARG VITE_SITE_URL
ENV VITE_CONTACT_EMAIL=${VITE_CONTACT_EMAIL}
ENV VITE_SITE_URL=${VITE_SITE_URL}

RUN npm run build

# ---------- Runtime stage ----------
FROM nginx:1.27-alpine AS runtime

RUN rm -rf /usr/share/nginx/html/* \
 && rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1

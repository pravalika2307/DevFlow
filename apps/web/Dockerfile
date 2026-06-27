# ==============================================================================
# STAGE 1: Pruner
# Isolates only the frontend 'web' application and the workspace dependencies 
# (like shared config, types, and UI packages) to optimize build caching.
# ==============================================================================
FROM node:20-alpine AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune web --docker

# ==============================================================================
# STAGE 2: Installer & Builder
# Installs dependencies for the pruned workspaces and builds the Next.js frontend.
# ==============================================================================
FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy pruned dependency manifests to cache dependency layers
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm install

# Copy pruned source files and shared packages
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

# Compile the application (produces apps/web/.next/standalone)
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx turbo run build --filter=web

# ==============================================================================
# STAGE 3: Runner
# Slim production stage that only bundles the standalone compiled server.js, 
# public assets, and static files. Minimizes container size and vulnerability surface.
# ==============================================================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root user setup for container security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static assets and built standalone server
COPY --from=installer /app/apps/web/public ./apps/web/public
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]

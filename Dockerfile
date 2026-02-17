FROM node:20-alpine AS base

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10.0.0 --activate

FROM base AS devdeps

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM devdeps AS build

COPY ./drizzle.config.ts ./
COPY ./server ./server
RUN pnpm db:migrate

COPY . .
RUN pnpm run build

FROM base AS production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nuxt -u 1001

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod

COPY --from=build --chown=nuxt:nodejs /app/.nuxt ./.nuxt
COPY --from=build --chown=nuxt:nodejs /app/.output ./.output
# COPY --from=build --chown=nuxt:nodejs /app/public ./public

USER nuxt
EXPOSE 3000

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["node", ".output/server/index.mjs"]

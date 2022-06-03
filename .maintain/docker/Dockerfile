# Install dependencies only when needed
FROM node:16.13.2-buster-slim AS dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 100000

# Rebuild the source code only when needed
FROM node:16.13.2-buster-slim AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN NODE_ENV=production yarn build

# Production image, copy all the files and run
FROM nginx:1.21.6-alpine AS runner
LABEL social.myriad.image.authors="myriad.dev@blocksphere.id"
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

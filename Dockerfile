# =====================
# BUILDER
# =====================
FROM node:18-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y \
  openssl \
  ca-certificates \
  python3 \
  make \
  g++ \
  build-essential \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

# =====================
# PRODUCTION
# =====================
FROM node:18-slim AS production

WORKDIR /app

RUN apt-get update && apt-get install -y \
  openssl \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

EXPOSE 3000

CMD ["node", "dist/server.js"]

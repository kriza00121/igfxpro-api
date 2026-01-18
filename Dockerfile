# ----------------------------
# Stage 1: Build
# ----------------------------
FROM node:18-slim AS builder

# Imposta la working directory
WORKDIR /app

# Installa dipendenze di sistema necessarie per Prisma e build
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    libssl-dev \
    python3 \
    make \
    g++ \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm ci --legacy-peer-deps

# Copia tutto il codice sorgente
COPY . .

# Genera Prisma Client (necessario prima della build)
RUN npx prisma generate

# Build dell'app per produzione (es: se usi TS -> JS)
RUN npm run build

# ----------------------------
# Stage 2: Production
# ----------------------------
FROM node:18-slim AS production

WORKDIR /app

# Installa dipendenze di sistema necessarie anche in runtime (OpenSSL per Prisma)
RUN apt-get update && apt-get install -y --no-install-recommends \
        openssl \
        ca-certificates \
        libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Installa solo dipendenze di produzione
COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps

# Copia solo build e Prisma Client
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Esponi porta
EXPOSE 3000

# Variabili ambiente consigliate (override in docker-compose o deploy)
ENV NODE_ENV=production

# Comando per partire
CMD ["node", "dist/main.js"]

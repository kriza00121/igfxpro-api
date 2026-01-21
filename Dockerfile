# ----------------------
# BUILD STAGE
# ----------------------
FROM node:18-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl python3 make g++

COPY package*.json ./
COPY prisma ./prisma

# installa TUTTO (dev + prod)
RUN npm ci --legacy-peer-deps

RUN npx prisma generate

COPY . .

RUN npm run build


# ----------------------
# PRODUCTION STAGE
# ----------------------
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci --omit=dev --legacy-peer-deps

# Prisma client
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma

# Build TS
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]

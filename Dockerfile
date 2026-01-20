FROM node:18-alpine

RUN apk add --no-cache openssl python3 make g++

WORKDIR /app

COPY . .

RUN npm ci --legacy-peer-deps
RUN npx prisma generate

# Installa ts-node globalmente
RUN npm install -g ts-node

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npx ts-node src/main.ts"]

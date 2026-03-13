# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Build tools for native modules (bcrypt, sharp) + openssl for Prisma
RUN apk add --no-cache openssl python3 make g++

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

# Prune dev dependencies after build
RUN npm prune --omit=dev
# Re-add runtime tools needed for entrypoint (prisma db push, ts-node seed)
# Pin prisma to 5.22.0 to avoid breaking changes in Prisma 7.x
RUN npm install prisma@5.22.0 ts-node typescript @types/node --save-optional --no-save

# ---- Production Stage ----
FROM node:20-alpine AS production
WORKDIR /app

# openssl needed by Prisma engine at runtime
RUN apk add --no-cache openssl

ENV NODE_ENV=production

# Copy everything we need from builder (node_modules already pruned + has native binaries)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]

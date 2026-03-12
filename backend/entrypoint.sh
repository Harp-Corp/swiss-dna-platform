#!/bin/sh
set -e

echo "Running Prisma db push..."
npx prisma db push --accept-data-loss 2>&1

echo "Seeding database..."
npx ts-node prisma/seed.ts 2>&1 || echo "Seed skipped (may already exist)"

echo "Starting backend..."
exec node dist/src/main.js

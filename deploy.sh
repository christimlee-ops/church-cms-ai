#!/bin/bash
set -e
echo "=== Starting deployment ==="

# Install dependencies
echo "Installing dependencies..."
npm install --production=false

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Push schema to database
echo "Pushing database schema..."
npx prisma db push --accept-data-loss || echo "Warning: db push had issues, continuing..."

# Build Next.js
echo "Building Next.js..."
npm run build

echo "=== Deployment complete ==="

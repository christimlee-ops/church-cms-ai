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

# Copy static assets into standalone output
echo "Copying static assets..."
cp -r public .next/standalone/public
mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/

echo "=== Deployment complete ==="

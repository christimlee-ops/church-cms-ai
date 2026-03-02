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

# Copy static assets into standalone output (clean first to prevent nesting)
echo "Copying static assets..."
rm -rf .next/standalone/public .next/standalone/.next/static
cp -r public .next/standalone/public
mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/

# Also copy _next/static to project root so Plesk's web server (Apache/Nginx)
# can serve static assets directly without proxying to Node.js
echo "Copying static assets to document root for Plesk..."
rm -rf _next
mkdir -p _next
cp -r .next/static _next/

echo "=== Deployment complete ==="

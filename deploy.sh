#!/bin/bash
# Deploy script for Plesk - run this after git pull
npm install
npx prisma generate
npx prisma db push
npm run build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
echo "Build complete. Restart the app in Plesk."

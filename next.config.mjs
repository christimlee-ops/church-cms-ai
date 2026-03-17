/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/assets',
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    unoptimized: true, // serve images directly — avoids assetPrefix routing issues on Plesk
  },
};

export default nextConfig;

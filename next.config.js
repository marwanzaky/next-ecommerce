/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  images: {
    domains: ['mamolio-api.vercel.app'],
    formats: ['image/avif', 'image/webp'],
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  images: {
    domains: ['storio-api.herokuapp.com'],
    formats: ['image/avif', 'image/webp'],
  }
}

module.exports = nextConfig

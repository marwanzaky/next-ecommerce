/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  images: {
    domains: [process.env.NEXT_PUBLIC_DOMAINS],
    formats: ['image/avif', 'image/webp'],
  }
}

module.exports = nextConfig

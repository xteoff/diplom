// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Игнорировать ошибки TypeScript при сборке
  },
  eslint: {
    ignoreDuringBuilds: true, // Также можно игнорировать ошибки ESLint
  },
}

module.exports = nextConfig
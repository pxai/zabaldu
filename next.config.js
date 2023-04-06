/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  i18n,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

module.exports = nextConfig

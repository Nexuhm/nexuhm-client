const withSvgr = require('next-svgr');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        hostname: 'nexuhmstaging.blob.core.windows.net',
      },
    ],
  },
};

module.exports = withSvgr(nextConfig);

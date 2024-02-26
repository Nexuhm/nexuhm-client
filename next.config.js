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

  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin/jobs',
        permanent: false,
      },
    ];
  },
};

module.exports = withSvgr(nextConfig);

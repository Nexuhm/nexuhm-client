const withSvgr = require('next-svgr');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/',
      },
    ];
  },
};

module.exports = withSvgr(nextConfig);

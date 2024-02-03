const withSvgr = require('next-svgr');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

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

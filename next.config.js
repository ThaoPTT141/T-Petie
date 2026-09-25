/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/sale', destination: '/uu-dai.html' },
      { source: '/tai-khoan', destination: '/tai-khoan.html' },
      { source: '/admin-login', destination: '/admin-login.html' },
      { source: '/admin', destination: '/admin.html' },
    ];
  },
};

module.exports = nextConfig;


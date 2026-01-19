/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: false, // Turbopack OFF
  },
  typescript: {
    ignoreBuildErrors: true, // Dev faster, optional
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: false,
  // swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/v1/chat/:path*",
        destination: "http://localhost:11444/api/v1/chat/:path*",
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "be23-2a09-bac5-3a10-137d-00-1f1-1fc.ngrok-free.app",
      },
    ],
  },
};

export default nextConfig;

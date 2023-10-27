/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    scope: "/app",
    sw: "service-worker.js",
  });
  
  const nextConfig = {
    env: {
      BASE_URL: "http://127.0.0.1:8080",
    },
    reactStrictMode: true,
  };
  
  // module.exports = withPWA(nextConfig);
  module.exports = nextConfig;
  
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enables automatic CSS inlining to fix render-blocking warnings
  experimental: {
    optimizeCss: true,
  },
  // Since you are running on port 3003, ensure your environment is set for production
  reactStrictMode: true,
  swcMinify: true,
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Enables automatic CSS inlining to fix render-blocking warnings
  experimental: {
    optimizeCss: true,
  },
  // swcMinify is now the default; removing it fixes the 'Unrecognized key' error
  reactStrictMode: true,
}

export default nextConfig

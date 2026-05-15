/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cms.playacleaning.com",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
  // images: {
  //   formats: ["image/avif", "image/webp"],
  // },
  // Enables automatic CSS inlining to fix render-blocking warnings
  experimental: {
    optimizeCss: true,
  },
  // swcMinify is now the default; removing it fixes the 'Unrecognized key' error
  reactStrictMode: true,
  async redirects() {
    return [
      // 1. FIX SERVICE SLUG MISMATCHES (Old/Short -> New Strapi Slugs)
      {
        source: "/services/maid-service/(.+)",
        destination: "/services/commercial-office-cleaning",
        permanent: true,
      },
      {
        source: "/services/houme-cleanig/:path*",
        destination: "/services/house-cleaning", // Or whichever you prefer as primary
        permanent: true,
      },

      // 2. LOCATION MIGRATION (Old structure -> New structure)
      // This maps your 11 active cities from the old /service-areas/ to /locations/
      {
        source:
          "/service-areas/:slug(santa-monica|culver-city|westchester|mar-vista|el-segundo|playa-del-rey|redondo-beach|pacific-palisades|marina-del-rey|west-los-angeles|playa-vista)",
        destination: "/locations/:slug",
        permanent: true,
      },

      // 3. SERVICE + CITY NESTED REDIRECTS (The "300 Pages" fix)
      // Redirects /services/ANY-SERVICE/ANY-CITY to the main Service page.
      // Example: /services/deep-cleaning/burbank -> /services/deep-cleaning
      {
        source: "/services/move-out-cleaning/(.+)",
        destination: "/services/move-out-cleaning",
        permanent: true,
      },
      {
        source: "/services/deep-cleaning/(.+)",
        destination: "/services/deep-cleaning",
        permanent: true,
      },
      {
        source: "/services/upholstery-cleaning/(.+)",
        destination: "/services/upholstery-cleaning",
        permanent: true,
      },
      {
        source: "/services/carpet-cleaning/(.+)",
        destination: "/services/carpet-cleaning",
        permanent: true,
      },
      {
        source: "/services/airbnb-cleaning/(.+)",
        destination: "/services/airbnb-cleaning",
        permanent: true,
      },
      {
        source: "/services/post-construction-cleaning/(.+)",
        destination: "/services/post-construction-cleaning",
        permanent: true,
      },
      // 4. THE JUNK CITY CATCH-ALL (The "Purge")
      // If someone goes to /service-areas/burbank (not in your top 11),
      // it sends them to your main location hub to prevent 404s.
      {
        source: "/service-areas/:path*",
        destination: "/locations/marina-del-rey",
        permanent: true,
      },

      // 5. MISC CLEANUP
      // {
      //   source: '/cleaning-calculator',
      //   destination: '/',
      //   permanent: true,
      // },
    ]
  },
}

export default nextConfig

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl:
    process.env.NEXT_PUBLIC_COMPANY_WEBSITE ?? "https://playacleaning.com", // Replace with your actual domain
  generateRobotsTxt: true,
  // Optional: Add other settings here
  exclude: [
    "/admin/*",
    "/secret-page",
    "/booking/*",
    "/styleguide",
    "/lp/**",
    "/offers",
    // after-booking page and app icons are not pages for Google
    "/thank-you",
    "/manifest.json",
    "/apple-icon.png",
    "/icon*",
  ],
}

export default config

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://playacleaning.com", // Replace with your actual domain
  generateRobotsTxt: true,
  // Optional: Add other settings here
  exclude: ["/admin/*", "/secret-page"],
}

export default config

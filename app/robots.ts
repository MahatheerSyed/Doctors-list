import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/*"],
    },
    sitemap: "https://apollo247-clone.vercel.app/sitemap.xml",
  }
}

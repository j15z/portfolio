import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://justinblumencranz.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/", "/blog/", "/portfolio/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

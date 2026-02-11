import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://ignitemindacademy.com/sitemap.xml", // TODO: update if domain changes
  };
}

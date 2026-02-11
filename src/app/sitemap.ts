import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ignitemindacademy.com"; // TODO: update when domain is final
  const now = new Date();

  const routes = ["/", "/naplan", "/pricing", "/about", "/resources", "/quiz", "/contact"];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

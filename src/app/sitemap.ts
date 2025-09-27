import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/apps`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/auth`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/docs/cloud`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/public`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];
  return routes;
}

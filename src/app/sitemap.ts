import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL = "https://orarilokalmajene.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: berita, error } = await supabase
    .from("berita")
    .select("slug, created_at")
    .eq("publish", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("ERROR SITEMAP BERITA:", error);
  }

  const urls: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/profil`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/layanan`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dokumen`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/berita`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  for (const item of berita ?? []) {
    urls.push({
      url: `${BASE_URL}/berita/${item.slug}`,
      lastModified: new Date(item.created_at),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return urls;
}

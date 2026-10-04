import type { Metadata, Viewport } from "next";
import type { Content } from "@/content/types";
import { site } from "@/content/site";

export function buildMetadata(c: Content): Metadata {
  const path = c.locale === "fa" ? "/" : "/en";
  return {
    metadataBase: new URL(site.url),
    title: c.meta.title,
    description: c.meta.description,
    keywords: c.meta.keywords,
    authors: [{ name: "Mohammad Alemzadeh", url: site.social.github }],
    creator: "Mohammad Alemzadeh",
    alternates: {
      canonical: path,
      languages: { fa: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "profile",
      url: path,
      title: c.meta.title,
      description: c.meta.description,
      siteName: c.hero.name,
      locale: c.locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: c.locale === "fa" ? "en_US" : "fa_IR",
      firstName: c.locale === "fa" ? "محمد" : "Mohammad",
      lastName: c.locale === "fa" ? "عالم‌زاده" : "Alemzadeh",
    },
    twitter: {
      card: "summary_large_image",
      title: c.meta.title,
      description: c.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f5f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1316" },
  ],
};

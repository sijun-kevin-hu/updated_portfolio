import type { Metadata } from "next";

export const siteBaseUrl = "https://example.com";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: "Kevin Hu – Portfolio",
    template: "%s | Kevin Hu",
  },
  description:
    "Mobile-first, Apple-style scroll storytelling portfolio with modern web engineering.",
  openGraph: {
    type: "website",
    siteName: "Kevin Hu Portfolio",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};



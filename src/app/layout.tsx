import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orarilokalmajene.vercel.app"),

  title: {
    default: "ORARI Lokal Majene",
    template: "%s | ORARI Lokal Majene",
  },

  description:
    "Website resmi ORARI Lokal Majene (Organisasi Amatir Radio Indonesia), Kabupaten Majene, Sulawesi Barat. Media informasi profil organisasi, berita kegiatan, layanan keanggotaan, CORE, dan dokumen resmi.",

  keywords: [
    "ORARI",
    "ORARI Lokal Majene",
    "Organisasi Amatir Radio Indonesia",
    "Amatir Radio Majene",
    "Radio Amatir Sulawesi Barat",
    "CORE ORARI",
    "Komunikasi Radio",
    "YH8FB",
  ],

  authors: [
    {
      name: "ORARI Lokal Majene",
    },
  ],

  creator: "ORARI Lokal Majene",

  publisher: "ORARI Lokal Majene",

  category: "organization",

  alternates: {
    canonical: "https://orarilokalmajene.vercel.app",
  },

  verification: {
    google: "q7PCd_Kb-tF2g36tSAzSmb4fIxzuVM-w3-yjPuIAkmE",
  },

  openGraph: {
    title: "ORARI Lokal Majene — Organisasi Amatir Radio Indonesia",

    description:
      "Media informasi resmi ORARI Lokal Majene. Profil organisasi, berita kegiatan, layanan keanggotaan, CORE, dan dokumen.",

    siteName: "ORARI Lokal Majene",

    locale: "id_ID",

    type: "website",

    url: "https://orarilokalmajene.vercel.app",
  },

  twitter: {
    card: "summary_large_image",

    title: "ORARI Lokal Majene — Organisasi Amatir Radio Indonesia",

    description:
      "Website resmi Organisasi Amatir Radio Indonesia Lokal Majene, Kabupaten Majene, Sulawesi Barat.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

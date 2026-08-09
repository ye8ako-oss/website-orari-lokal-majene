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

  authors: [{ name: "ORARI Lokal Majene" }],
  creator: "ORARI Lokal Majene",

  metadataBase: new URL("https://website-orari-lokal-majene.vercel.app"),

  openGraph: {
    title: "ORARI Lokal Majene — Organisasi Amatir Radio Indonesia",
    description:
      "Media informasi resmi ORARI Lokal Majene. Profil organisasi, berita, layanan keanggotaan, CORE, dan dokumen.",
    siteName: "ORARI Lokal Majene",
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ORARI Lokal Majene",
    description:
      "Website resmi Organisasi Amatir Radio Indonesia Lokal Majene, Sulawesi Barat.",
  },

  robots: {
    index: true,
    follow: true,
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

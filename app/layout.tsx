import type React from "react";
import type { Metadata, Viewport } from "next";
import { Poppins, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Dunamis Faith Resource Hub",
  description:
    "Access Christian content including sermons, worship materials, books, and movies",
  keywords:
    "Christian resources, sermons, worship, books, movies, faith, Dunamis, spiritual growth",
  authors: [{ name: "Dunamis Faith Resource Hub" }],
  creator: "Dunamis Faith Resource Hub",
  publisher: "Dunamis Faith Resource Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dunamis-faith-hub.com",
    title: "Dunamis Faith Resource Hub",
    description:
      "Access Christian content including sermons, worship materials, books, and movies",
    siteName: "Dunamis Faith Resource Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dunamis Faith Resource Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dunamis Faith Resource Hub",
    description:
      "Access Christian content including sermons, worship materials, books, and movies",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${lora.variable} font-sans min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import "./globals.css";

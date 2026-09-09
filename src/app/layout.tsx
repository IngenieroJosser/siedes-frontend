import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";
import SiteFrame from "@/components/SiteFrame";

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL_FRONTEND || "http://localhost:3000"
  ),
  title:
    "SIEDES - Plataforma Etnoeducativa con IA para Prevenir la Deserción Escolar en Colombia",
  description:
    "SIEDES es una plataforma etnoeducativa que usa inteligencia artificial para transformar la educación, fortalecer la identidad cultural y prevenir la deserción escolar.",
  keywords: [
    "SIEDES",
    "educación",
    "IA",
    "prevención",
    "deserción escolar",
    "etnoeducación",
  ],
  authors: [{ name: "Equipo SIEDES" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title:
      "SIEDES - Plataforma Etnoeducativa con IA para Prevenir la Deserción Escolar en Colombia",
    description:
      "SIEDES es una plataforma etnoeducativa que usa inteligencia artificial para transformar la educación, fortalecer la identidad cultural y prevenir la deserción escolar.",
    url: "https://siedes.com",
    siteName: "SIEDES",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "SIEDES Logo",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@siedes",
    creator: "@siedes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={dmMono.variable}>
      <body className="flex min-h-screen flex-col bg-[#F8F0AF] text-[#00343d] antialiased">
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}

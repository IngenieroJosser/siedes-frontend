import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/navbar";
import Footer from "@/footer";

// Fuente personalizada
const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

// Metadatos de la aplicación
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL_FRONTEND || "http://localhost:3000"),
  title: "SIEDES - Plataforma Etnoeducativa con IA para Prevenir la Deserción Escolar en Colombia",
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
    icon: "/favicon.ico", // coloca tu favicon en public/
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "SIEDES - Plataforma Etnoeducativa con IA para Prevenir la Deserción Escolar en Colombia",
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
    locale: "es_ES",
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
    <html lang="es" className={`${dmMono.variable}`}>
      <body className="antialiased bg-[#F8F0AF] text-[#00343d] flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
          </main>
        <Footer />
      </body>
    </html>
  );
}


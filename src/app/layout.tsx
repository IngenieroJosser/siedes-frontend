import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/navbar";
import Footer from "@/footer";

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: "300",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIEDES - Plataforma",
  description: "Sistema Inteligente para la Detección y Prevención de la Deserción Escolar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

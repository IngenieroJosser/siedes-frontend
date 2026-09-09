"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/navbar";
import Footer from "@/footer";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCore = pathname.startsWith("/core");

  if (isCore) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}

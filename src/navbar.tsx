"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Cómo funciona", href: "/como-funciona" },
  { label: "Beneficios", href: "/beneficios" },
  // { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#002930]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Inicio SIEDES"
          className="flex items-center gap-3 group"
        >
          <div className="h-10 w-10 rounded-xl bg-[#F8F0AF] flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-[#002930]"
            >
              <path
                d="M12 3l8 5v8l-8 5-8-5V8l8-5z"
                fill="currentColor"
                opacity="0.9"
              />
              <path
                d="M12 7l5 3v2l-5-3-5 3v-2l5-3z"
                fill="currentColor"
                fillOpacity="0.7"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-xl tracking-tight">
              SIEDES
            </span>
            <span className="text-xs text-[#F8F0AF] -mt-1">
              Prevención de deserción escolar
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => router.push(item.href)}
              className="relative text-white/90 hover:text-[#F8F0AF] transition-colors group/nav"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F8F0AF] transition-all group-hover/nav:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/solicitar-ayuda"
            onClick={() => router.push("/solicitar-ayuda")}
            className="hidden md:inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-gradient-to-r from-[#AC4A00] to-[#D45A10] text-white hover:shadow-lg hover:shadow-[#AC4A00]/30 transition-all duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Solicitar ayuda
          </Link>

          <button
            className="lg:hidden inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 backdrop-blur"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Abrir menú"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-white">
              {open ? (
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden absolute top-full left-0 right-0 border-t border-white/10 bg-[#002930]/95 backdrop-blur-md"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  setOpen(false);
                  router.push(item.href);
                }}
                className="py-3 px-4 text-white/90 hover:text-[#F8F0AF] hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/solicitar-ayuda"
              onClick={() => {
                setOpen(false);
                router.push("/solicitar-ayuda");
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-gradient-to-r from-[#AC4A00] to-[#D45A10] text-white hover:shadow-lg hover:shadow-[#AC4A00]/30 transition-all"
            >
              Solicitar ayuda
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

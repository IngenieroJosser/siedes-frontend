"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  description: string;
  number: string;
};

const NAV: NavItem[] = [
  {
    number: "01",
    label: "Inicio",
    href: "/",
    description: "Visión general de SIEDES",
  },
  {
    number: "02",
    label: "Cómo funciona",
    href: "/como-funciona",
    description: "Del dato a la intervención",
  },
  {
    number: "03",
    label: "Beneficios",
    href: "/beneficios",
    description: "Valor para la comunidad educativa",
  },
  {
    number: "04",
    label: "Tecnología",
    href: "/tecnologia",
    description: "IA, analítica y contexto",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#001c22] text-white">
        <div className="hidden border-b border-white/10 bg-[#002930] sm:block">
          <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-5 text-[10px] uppercase tracking-[0.2em] text-white/45 sm:px-6 lg:px-8">
            <span>Sistema de inteligencia para la permanencia escolar</span>
            <span className="text-[#F8F0AF]/75">Quibdó · Chocó</span>
          </div>
        </div>

        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label="Ir al inicio de SIEDES"
            className="group flex min-w-0 items-center gap-3"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#F8F0AF]/20 bg-[#002930]">
              <Image
                src="/favicon-32x32.png"
                alt=""
                width={32}
                height={32}
                className="h-7 w-7 object-contain"
                priority
              />
            </span>

            <span className="min-w-0">
              <span className="block text-lg font-medium tracking-[-0.03em] text-white">
                SIEDES
              </span>
              <span className="hidden truncate text-[9px] uppercase tracking-[0.17em] text-white/40 sm:block">
                IA · Analítica · Etnoeducación
              </span>
            </span>
          </Link>

          <nav className="hidden items-stretch self-stretch lg:flex" aria-label="Navegación principal">
            {NAV.map((item) => {
              const active = isActiveRoute(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "group relative flex min-w-[122px] flex-col justify-center border-l border-white/10 px-5 transition-colors last:border-r",
                    active
                      ? "bg-[#F8F0AF] text-[#002930]"
                      : "text-white hover:bg-white/[0.035]"
                  )}
                >
                  <span
                    className={cx(
                      "text-[9px] uppercase tracking-[0.18em]",
                      active ? "text-[#AC4A00]" : "text-white/30"
                    )}
                  >
                    {item.number}
                  </span>
                  <span className="mt-1 text-sm font-medium">{item.label}</span>
                  {!active && (
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-[#F8F0AF] transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/iniciar-sesion"
              className="hidden min-h-11 items-center border border-white/15 px-4 text-xs font-medium text-white/75 transition hover:border-[#F8F0AF]/35 hover:text-[#F8F0AF] md:inline-flex"
            >
              Acceder
            </Link>

            <Link
              href="/solicitar-ayuda"
              className="group hidden min-h-11 items-center gap-5 bg-[#AC4A00] px-4 text-xs font-medium text-white transition hover:bg-[#D45A10] sm:inline-flex"
            >
              Solicitar apoyo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-white transition hover:border-[#F8F0AF]/40 hover:text-[#F8F0AF] lg:hidden"
              aria-label="Abrir menú de navegación"
              aria-expanded={open}
              aria-controls="siedes-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="siedes-mobile-menu"
        className={cx(
          "fixed inset-0 z-[80] transition-opacity duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-[#001014]/80"
        />

        <aside
          className={cx(
            "absolute right-0 top-0 flex h-[100dvh] w-full max-w-[430px] flex-col border-l border-white/10 bg-[#001c22] text-white shadow-2xl shadow-black/40 transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-5">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center border border-[#F8F0AF]/20 bg-[#002930]">
                <Image
                  src="/favicon-32x32.png"
                  alt=""
                  width={32}
                  height={32}
                  className="h-7 w-7 object-contain"
                />
              </span>
              <span>
                <span className="block text-base font-medium">SIEDES</span>
                <span className="block text-[9px] uppercase tracking-[0.16em] text-white/35">
                  Permanencia escolar
                </span>
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-white/75 transition hover:border-[#F8F0AF]/40 hover:text-[#F8F0AF]"
              aria-label="Cerrar menú de navegación"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="border-b border-white/10 px-5 py-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#F8F0AF]">
              Explorar SIEDES
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/50">
              Conoce cómo la plataforma conecta datos, análisis predictivo,
              contexto etnoeducativo y acción humana.
            </p>
          </div>

          <nav className="flex-1 overflow-y-auto" aria-label="Navegación móvil">
            {NAV.map((item) => {
              const active = isActiveRoute(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-white/10 px-5 py-5 transition-colors",
                    active ? "bg-[#F8F0AF] text-[#002930]" : "hover:bg-white/[0.035]"
                  )}
                >
                  <span
                    className={cx(
                      "text-[10px] uppercase tracking-[0.18em]",
                      active ? "text-[#AC4A00]" : "text-white/30"
                    )}
                  >
                    {item.number}
                  </span>

                  <span>
                    <span className="block text-base font-medium">{item.label}</span>
                    <span
                      className={cx(
                        "mt-1 block text-xs",
                        active ? "text-[#002930]/55" : "text-white/40"
                      )}
                    >
                      {item.description}
                    </span>
                  </span>

                  <ArrowRight
                    className={cx(
                      "h-4 w-4 transition-transform group-hover:translate-x-1",
                      active ? "text-[#AC4A00]" : "text-[#F8F0AF]"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 bg-[#002930] p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/iniciar-sesion"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-12 items-center justify-center border border-white/15 px-4 text-sm font-medium text-white transition hover:border-[#F8F0AF]/40 hover:text-[#F8F0AF]"
              >
                Acceder
              </Link>
              <Link
                href="/solicitar-ayuda"
                onClick={() => setOpen(false)}
                className="group inline-flex min-h-12 items-center justify-between gap-5 bg-[#AC4A00] px-4 text-sm font-medium text-white transition hover:bg-[#D45A10]"
              >
                Solicitar apoyo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

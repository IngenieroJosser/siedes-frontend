"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  {
    href: "/core",
    label: "Resumen",
    description: "Vista general",
    icon: LayoutDashboard,
  },
  {
    href: "/core/students",
    label: "Estudiantes",
    description: "Trayectorias y riesgo",
    icon: Users,
  },
  {
    href: "/core/alerts",
    label: "Alertas",
    description: "Señales priorizadas",
    icon: AlertTriangle,
  },
  {
    href: "/core/interventions",
    label: "Intervenciones",
    description: "Acompañamiento",
    icon: BookOpenCheck,
  },
  {
    href: "/core/ai",
    label: "IA predictiva",
    description: "Modelo y trazabilidad",
    icon: BrainCircuit,
  },
  {
    href: "/core/reports",
    label: "Reportes",
    description: "Lectura operativa",
    icon: BarChart3,
  },
  {
    href: "/core/settings",
    label: "Configuración",
    description: "Sistema y gobernanza",
    icon: Settings,
  },
];

const SECTION_META: Record<string, { eyebrow: string; title: string }> = {
  "/core": { eyebrow: "Centro operativo", title: "Resumen" },
  "/core/students": { eyebrow: "Trayectorias", title: "Estudiantes" },
  "/core/alerts": { eyebrow: "Señales", title: "Alertas tempranas" },
  "/core/interventions": { eyebrow: "Acompañamiento", title: "Intervenciones" },
  "/core/ai": { eyebrow: "Inteligencia artificial", title: "IA predictiva" },
  "/core/reports": { eyebrow: "Análisis", title: "Reportes" },
  "/core/settings": { eyebrow: "Gobernanza", title: "Configuración" },
};

function getSection(pathname: string) {
  const match = Object.keys(SECTION_META)
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname === route || pathname.startsWith(route + "/"));

  return SECTION_META[match || "/core"];
}

export default function CoreWorkspace({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const section = useMemo(() => getSection(pathname), [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", handleKey);
    };
  }, [mobileOpen]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.push("/iniciar-sesion");
  };

  return (
    <div className="min-h-screen bg-[#EDE9DE] text-[#002930]">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[278px] border-r border-white/10 bg-[#001c22] text-white xl:flex xl:flex-col">
        <div className="border-b border-white/10 px-6 py-6">
          <Link href="/core" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center border border-[#F8F0AF]/20 bg-[#002930]">
              <Image
                src="/favicon-32x32.png"
                alt=""
                width={32}
                height={32}
                className="h-7 w-7 object-contain"
                priority
              />
            </span>
            <span>
              <span className="block text-lg font-medium tracking-[-0.03em]">SIEDES</span>
              <span className="block text-[9px] uppercase tracking-[0.18em] text-white/35">
                Workspace
              </span>
            </span>
          </Link>
        </div>

        <div className="px-6 py-6">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#F8F0AF]">
            Operación
          </p>
          <p className="mt-3 text-xs leading-5 text-white/38">
            Seguimiento de trayectorias, alertas e intervenciones para apoyar la
            permanencia escolar.
          </p>
        </div>

        <nav className="flex-1 px-3 pb-6" aria-label="Navegación del sistema">
          {NAV_ITEMS.map((item, index) => {
            const active =
              item.href === "/core"
                ? pathname === "/core"
                : pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "group grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-white/[0.07] px-3 py-4 transition-colors " +
                  (active
                    ? "bg-[#F8F0AF] text-[#002930]"
                    : "text-white/70 hover:bg-white/[0.035] hover:text-white")
                }
              >
                <span
                  className={
                    "flex h-8 w-8 items-center justify-center border " +
                    (active
                      ? "border-[#002930]/15 text-[#AC4A00]"
                      : "border-white/10 text-white/45")
                  }
                >
                  <Icon className="h-4 w-4" />
                </span>

                <span>
                  <span className="block text-sm font-medium">{item.label}</span>
                  <span
                    className={
                      "mt-1 block text-[10px] " +
                      (active ? "text-[#002930]/50" : "text-white/30")
                    }
                  >
                    {item.description}
                  </span>
                </span>

                <span
                  className={
                    "text-[9px] tracking-[0.16em] " +
                    (active ? "text-[#AC4A00]" : "text-white/18")
                  }
                >
                  0{index + 1}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            href="/"
            className="group flex min-h-11 items-center justify-between border border-white/10 px-4 text-xs text-white/55 transition hover:border-[#F8F0AF]/30 hover:text-[#F8F0AF]"
          >
            Sitio público
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 flex min-h-11 w-full items-center justify-between border border-white/10 px-4 text-xs text-white/55 transition hover:border-[#AC4A00]/50 hover:text-white"
          >
            Cerrar sesión
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      <div className="xl:pl-[278px]">
        <header className="sticky top-0 z-40 border-b border-[#002930]/12 bg-[#F8F0AF]/95 backdrop-blur">
          <div className="flex h-[76px] items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#002930]/15 text-[#002930] xl:hidden"
                aria-label="Abrir navegación"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="min-w-0">
                <p className="truncate text-[9px] uppercase tracking-[0.18em] text-[#AC4A00]">
                  {section.eyebrow}
                </p>
                <p className="mt-1 truncate text-lg font-medium tracking-[-0.025em]">
                  {section.title}
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <div className="border-l border-[#002930]/15 pl-4 text-right">
                <p className="text-[9px] uppercase tracking-[0.16em] text-[#002930]/40">
                  Plataforma
                </p>
                <p className="mt-1 text-xs text-[#002930]/65">
                  IA · Analítica · Etnoeducación
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="min-h-[calc(100vh-76px)]">{children}</div>
      </div>

      <div
        className={
          "fixed inset-0 z-[80] transition-opacity duration-200 xl:hidden " +
          (mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")
        }
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          aria-label="Cerrar navegación"
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-[#001014]/75"
        />

        <aside
          className={
            "absolute left-0 top-0 flex h-[100dvh] w-[min(88vw,390px)] flex-col border-r border-white/10 bg-[#001c22] text-white transition-transform duration-200 " +
            (mobileOpen ? "translate-x-0" : "-translate-x-full")
          }
        >
          <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-5">
            <Link href="/core" className="flex items-center gap-3">
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
                <span className="block text-[9px] uppercase tracking-[0.16em] text-white/30">
                  Workspace
                </span>
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-11 w-11 items-center justify-center border border-white/10"
              aria-label="Cerrar navegación"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {NAV_ITEMS.map((item, index) => {
              const active =
                item.href === "/core"
                  ? pathname === "/core"
                  : pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    "grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-white/[0.07] px-3 py-4 " +
                    (active ? "bg-[#F8F0AF] text-[#002930]" : "text-white/70")
                  }
                >
                  <span
                    className={
                      "flex h-8 w-8 items-center justify-center border " +
                      (active
                        ? "border-[#002930]/15 text-[#AC4A00]"
                        : "border-white/10 text-white/45")
                    }
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span
                      className={
                        "mt-1 block text-[10px] " +
                        (active ? "text-[#002930]/50" : "text-white/30")
                      }
                    >
                      {item.description}
                    </span>
                  </span>
                  <span className="text-[9px] tracking-[0.16em] opacity-40">
                    0{index + 1}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <Link
              href="/"
              className="flex min-h-11 items-center justify-between border border-white/10 px-4 text-xs text-white/55"
            >
              Sitio público
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 flex min-h-11 w-full items-center justify-between border border-white/10 px-4 text-xs text-white/55"
            >
              Cerrar sesión
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

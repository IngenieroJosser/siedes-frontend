"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string; description?: string };

const NAV: NavItem[] = [
  { 
    label: "Inicio", 
    href: "/",
    description: "Página principal del sistema"
  },
  { 
    label: "Cómo funciona", 
    href: "/como-funciona",
    description: "Conoce nuestro proceso"
  },
  { 
    label: "Beneficios", 
    href: "/beneficios",
    description: "Ventajas de usar SIEDES"
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    // Verificar estado activo/inactivo basado en la hora
    const checkActiveStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Inactivo después de las 11:20 PM (23:20) hasta las 6:00 AM
      const isAfterHours = (hours >= 23 && minutes >= 20) || hours < 6;
      setIsActive(!isAfterHours);
    };

    checkActiveStatus();
    
    // Verificar cada minuto
    const interval = setInterval(checkActiveStatus, 60000);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Función para verificar si una ruta está activa
  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 w-full z-50 bg-[#002930]/95 backdrop-blur-md h-20" />
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#002930]/98 backdrop-blur-xl shadow-2xl shadow-black/20 py-2"
          : "bg-gradient-to-b from-[#002930]/95 to-transparent backdrop-blur-md py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Inicio SIEDES"
            className="flex items-center gap-3 group relative"
          >
            <div className="relative">
              {/* Efecto de brillo detrás del logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
              
              {/* Contenedor principal del logo */}
              <div className="relative flex items-center gap-3 bg-[#002930]/80 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10 group-hover:border-[#F8F0AF]/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-[#F8F0AF]/20">
                <div className="relative">
                  <Image 
                    src="/favicon-32x32.png" 
                    alt="SIEDES" 
                    width={40}
                    height={40}
                    className="h-8 w-8 sm:h-10 sm:w-10 object-contain drop-shadow-lg"
                  />
                  {/* Efecto de partícula */}
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping ${
                    isActive ? "bg-green-400" : "bg-yellow-400"
                  }`}></div>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-lg sm:text-xl lg:text-2xl tracking-tight bg-gradient-to-r from-white to-[#F8F0AF] bg-clip-text text-transparent">
                      SIEDES
                    </span>
                    {/* Indicador de status */}
                    <div className={`hidden sm:flex items-center gap-1 px-2 py-1 rounded-full border ${
                      isActive 
                        ? "bg-green-500/20 border-green-500/30" 
                        : "bg-yellow-500/20 border-yellow-500/30"
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        isActive ? "bg-green-400" : "bg-yellow-400"
                      }`}></div>
                      <span className={`text-xs ${
                        isActive ? "text-green-300" : "text-yellow-300"
                      }`}>
                        {isActive ? "En línea" : "Fuera de horario"}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-[#F8F0AF]/80 -mt-1 hidden sm:block">
                    Prevención de deserción escolar
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-6 py-3 transition-all duration-300 group/nav overflow-hidden ${
                  isActiveRoute(item.href)
                    ? "text-[#F8F0AF] font-semibold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {/* Fondo animado para items activos */}
                {isActiveRoute(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F8F0AF]/10 to-[#AC4A00]/10 rounded-xl"></div>
                )}
                
                {/* Fondo animado al hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F8F0AF]/5 to-transparent translate-x-[-100%] group-hover/nav:translate-x-[100%] transition-transform duration-1000"></div>
                
                {/* Texto y borde inferior */}
                <span className="relative z-10 font-medium tracking-wide">
                  {item.label}
                </span>
                
                {/* Indicador activo */}
                <div className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] transition-all duration-300 ${
                  isActiveRoute(item.href)
                    ? "w-full left-0"
                    : "w-0 group-hover/nav:w-full group-hover/nav:left-0"
                }`}></div>
                
                {/* Número de item sutil */}
                <div className="absolute -top-2 -right-2 text-xs text-[#F8F0AF]/30 font-bold">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </Link>
            ))}
          </nav>

          {/* Tablet Navigation */}
          <nav className="hidden lg:flex xl:hidden items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-3 transition-all duration-300 group/nav ${
                  isActiveRoute(item.href)
                    ? "text-[#F8F0AF] font-semibold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <span className="font-medium text-sm">{item.label}</span>
                <div className={`absolute bottom-0 left-0 h-0.5 bg-[#F8F0AF] transition-all duration-300 ${
                  isActiveRoute(item.href)
                    ? "w-full"
                    : "w-0 group-hover/nav:w-full"
                }`}></div>
              </Link>
            ))}
          </nav>

          {/* CTA Section */}
          <div className="flex items-center gap-3">
            {/* Botón principal */}
            <Link
              href="/solicitar-ayuda"
              className="hidden md:flex items-center gap-3 rounded-2xl px-6 py-3 bg-gradient-to-r from-[#AC4A00] via-[#D45A10] to-[#AC4A00] text-white font-medium hover:shadow-2xl hover:shadow-[#AC4A00]/40 transition-all duration-500 transform hover:scale-105 hover:rotate-1 group/cta relative overflow-hidden"
            >
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-1000"></div>
              
              <svg
                className="w-5 h-5 relative z-10"
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
              <span className="relative z-10">Solicitar ayuda</span>
              
              {/* Efecto de partículas */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-2xl blur opacity-30 group-hover/cta:opacity-70 transition duration-1000 group-hover/cta:duration-200 animate-tilt"></div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group/toggle relative overflow-hidden"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Abrir menú"
            >
              {/* Fondo animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F8F0AF]/10 to-[#AC4A00]/10 opacity-0 group-hover/toggle:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative w-6 h-6 transform transition-all duration-300">
                <span className={`absolute top-1.5 left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  open ? "rotate-45 top-2.5" : ""
                }`}></span>
                <span className={`absolute top-2.5 left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}></span>
                <span className={`absolute top-3.5 left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  open ? "-rotate-45 top-2.5" : ""
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - MEJORADO Y CON TODAS LAS RUTAS */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop con blur */}
        <div 
          className="absolute inset-0 bg-[#00161a]/98 backdrop-blur-2xl"
          onClick={() => setOpen(false)}
        ></div>

        {/* Panel del menú */}
        <div className={`absolute top-0 left-0 h-full w-full bg-gradient-to-b from-[#002930] to-[#00161a] shadow-2xl shadow-black/50 transform transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}>
          
          {/* Contenedor principal con scroll */}
          <div className="flex flex-col h-full">
            {/* Header del menú móvil */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#002930]/80 backdrop-blur-sm">
              <Link
                href="/"
                className="flex items-center gap-3 group"
                onClick={() => setOpen(false)}
              >
                <Image 
                  src="/favicon-32x32.png" 
                  alt="SIEDES" 
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-white text-lg">SIEDES</span>
                  <span className="text-xs text-[#F8F0AF]">Prevención de deserción</span>
                </div>
              </Link>
              
              <button
                onClick={() => setOpen(false)}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navegación móvil - CON TODAS LAS RUTAS VISIBLES */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-4 space-y-3">
                {/* Mapeo de todas las rutas de NAV */}
                {NAV.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group/mobile-nav active:scale-95 ${
                      isActiveRoute(item.href)
                        ? "bg-[#F8F0AF]/10 border-[#F8F0AF]/30"
                        : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-[#F8F0AF]/30"
                    }`}
                  >
                    {/* Indicador numérico con estado activo */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 ${
                      isActiveRoute(item.href)
                        ? "bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] text-[#002930] scale-110"
                        : "bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] group-hover/mobile-nav:scale-110"
                    }`}>
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className={`font-medium transition-colors text-base ${
                        isActiveRoute(item.href)
                          ? "text-[#F8F0AF]"
                          : "text-white group-hover/mobile-nav:text-[#F8F0AF]"
                      }`}>
                        {item.label}
                      </div>
                      {item.description && (
                        <div className="text-xs text-white/60 mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                    
                    {/* Indicador de ruta activa */}
                    {isActiveRoute(item.href) && (
                      <div className="w-2 h-2 bg-[#F8F0AF] rounded-full animate-pulse"></div>
                    )}
                    
                    <svg className={`w-5 h-5 transition-colors ${
                      isActiveRoute(item.href)
                        ? "text-[#F8F0AF]"
                        : "text-white/40 group-hover/mobile-nav:text-[#F8F0AF]"
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}

                {/* Sección informativa adicional */}
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#AC4A00]/10 to-[#F8F0AF]/10 border border-[#AC4A00]/20">
                  <h3 className="text-[#F8F0AF] font-semibold text-sm mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Navegación completa
                  </h3>
                  <p className="text-white/70 text-xs">
                    Explora todas las secciones para conocer todo sobre nuestro sistema de prevención de deserción escolar.
                  </p>
                </div>
              </nav>
            </div>

            {/* CTA Móvil */}
            <div className="p-4 border-t border-white/10 bg-[#002930]/80 backdrop-blur-sm">
              <div className="space-y-3">
                {/* Estado del servicio */}
                <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    isActive ? "bg-green-400" : "bg-yellow-400"
                  }`}></div>
                  <span className="text-sm text-white/80">
                    {isActive ? "Servicio en línea" : "Fuera de horario de atención"}
                  </span>
                </div>

                {/* Botón principal */}
                <Link
                  href="/solicitar-ayuda"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-3 w-full rounded-2xl px-6 py-4 bg-gradient-to-r from-[#AC4A00] to-[#D45A10] text-white font-medium hover:shadow-2xl hover:shadow-[#AC4A00]/40 transition-all duration-300 transform hover:scale-105 active:scale-95 group/mobile-cta relative overflow-hidden"
                >
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/mobile-cta:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span className="relative z-10 font-semibold">Solicitar ayuda</span>
                </Link>
                
                {/* Información de contacto móvil */}
                <div className="text-center pt-2">
                  <p className="text-xs text-white/50 mb-1">
                    ¿Necesitas ayuda inmediata?
                  </p>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-[#F8F0AF] font-medium">
                      Línea de apoyo: <span className="text-white">01-8000-123456</span>
                    </p>
                    <p className="text-xs text-white/60">
                      Horario: 6:00 AM - 11:20 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

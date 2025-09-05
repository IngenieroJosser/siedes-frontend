"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardCore() {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState(5);
  const [isMounted, setIsMounted] = useState(false);

  // Efecto para manejar hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Función para formatear números consistentemente
  const formatNumber = (num: number) => {
    if (!isMounted) return num.toString();
    return num.toLocaleString('en-US');
  };

  const metricsData = {
    totalStudents: 8247,
    atRiskStudents: 1238,
    interventionsActive: 642,
    successRate: 78
  };

  const recentAlerts = [
    { id: 1, student: "Ana Lucía Moreno", level: "Alto", reason: "Baja asistencia persistente", time: "Hace 2 horas" },
    { id: 2, student: "Carlos Andrés Mosquera", level: "Medio", reason: "Bajo rendimiento académico", time: "Hace 5 horas" },
    { id: 3, student: "María González", level: "Alto", reason: "Factores socioeconómicos", time: "Ayer" },
    { id: 4, student: "Javier Rodríguez", level: "Bajo", reason: "Disminución participación", time: "Ayer" }
  ];

  const moduleIcons = {
    dashboard: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    students: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    alerts: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    interventions: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    reports: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    settings: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  };

  const modules = [
    { id: "dashboard", name: "Dashboard", icon: moduleIcons.dashboard, desc: "Visión general del sistema" },
    { id: "students", name: "Estudiantes", icon: moduleIcons.students, desc: "Gestión de estudiantes" },
    { id: "alerts", name: "Alertas", icon: moduleIcons.alerts, desc: "Alertas predictivas" },
    { id: "interventions", name: "Intervenciones", icon: moduleIcons.interventions, desc: "Estrategias de intervención" },
    { id: "reports", name: "Reportes", icon: moduleIcons.reports, desc: "Reportes y análisis" },
    { id: "settings", name: "Configuración", icon: moduleIcons.settings, desc: "Configuración del sistema" }
  ];

  return (
    <div className="flex h-screen bg-[#001c22] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed md:relative z-40 w-64 bg-[#002930] border-r border-white/10 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} md:flex flex-col h-full`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] flex items-center justify-center">
              <span className="font-bold text-[#002930]">S</span>
            </div>
            <span className="text-xl font-bold">SIEDES</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded-lg hover:bg-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeModule === module.id ? 'bg-gradient-to-r from-[#AC4A00]/20 to-[#F8F0AF]/20 text-[#F8F0AF] border border-[#F8F0AF]/30' : 'hover:bg-white/5'}`}
              >
                <span className="text-[#F8F0AF]">{module.icon}</span>
                <div>
                  <div className="font-medium">{module.name}</div>
                  <div className="text-xs text-white/60">{module.desc}</div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] flex items-center justify-center">
              <span className="font-bold">A</span>
            </div>
            <div>
              <div className="font-medium">Admin Usuario</div>
              <div className="text-xs text-white/60">Administrador</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="py-20 flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#002930] border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 mr-2 rounded-lg hover:bg-white/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold">Dashboard Principal</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-white/10 relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-[#AC4A00] text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>

            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="bg-white/5 border border-white/10 rounded-xl py-2 px-4 w-48 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-[#001c22] to-[#002029]">
          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white/70 text-sm">Total Estudiantes</h3>
                  <p className="text-2xl font-bold mt-1">{formatNumber(metricsData.totalStudents)}</p>
                </div>
                <div className="p-2 rounded-lg bg-[#F8F0AF]/10 text-[#F8F0AF]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-3">12 instituciones educativas</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white/70 text-sm">En Riesgo</h3>
                  <p className="text-2xl font-bold mt-1 text-[#F8F0AF]">{formatNumber(metricsData.atRiskStudents)}</p>
                </div>
                <div className="p-2 rounded-lg bg-[#AC4A00]/10 text-[#AC4A00]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF]" 
                  style={{ width: `${(metricsData.atRiskStudents / metricsData.totalStudents) * 100}%` }}
                />
              </div>
              <p className="text-xs text-white/60 mt-2">{((metricsData.atRiskStudents / metricsData.totalStudents) * 100).toFixed(1)}% de estudiantes</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white/70 text-sm">Intervenciones Activas</h3>
                  <p className="text-2xl font-bold mt-1">{formatNumber(metricsData.interventionsActive)}</p>
                </div>
                <div className="p-2 rounded-lg bg-[#AC4A00]/10 text-[#AC4A00]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-3">+24 esta semana</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white/70 text-sm">Tasa de Éxito</h3>
                  <p className="text-2xl font-bold mt-1 text-[#F8F0AF]">{metricsData.successRate}%</p>
                </div>
                <div className="p-2 rounded-lg bg-[#F8F0AF]/10 text-[#F8F0AF]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF]" 
                  style={{ width: `${metricsData.successRate}%` }}
                />
              </div>
              <p className="text-xs text-white/60 mt-2">+8% desde el mes pasado</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico principal */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Tendencias de Riesgo</h2>
                <select className="bg-white/5 border border-white/10 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30">
                  <option>Últimos 7 días</option>
                  <option>Últimos 30 días</option>
                  <option>Últimos 90 días</option>
                </select>
              </div>

              <div className="h-80">
                {/* Aquí iría un gráfico real con una librería como Chart.js o Recharts */}
                <div className="h-full flex items-center justify-center bg-white/5 rounded-xl border border-white/10">
                  <div className="text-center p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F8F0AF]/10 text-[#F8F0AF] mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2">Visualización de Datos</h3>
                    <p className="text-white/60 text-sm">Gráfico interactivo que muestra tendencias de riesgo a lo largo del tiempo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas recientes */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Alertas Recientes</h2>
                <Link href="/alerts" className="text-sm text-[#F8F0AF] hover:underline">
                  Ver todas
                </Link>
              </div>

              <div className="space-y-4">
                {recentAlerts.map(alert => (
                  <div key={alert.id} className="p-4 rounded-xl border border-white/10 hover:border-[#F8F0AF]/30 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{alert.student}</h3>
                        <p className="text-sm text-white/70 mt-1">{alert.reason}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${alert.level === 'Alto' ? 'bg-[#AC4A00]/20 text-[#AC4A00]' : alert.level === 'Medio' ? 'bg-[#F8F0AF]/20 text-[#F8F0AF]' : 'bg-white/20 text-white'}`}>
                        {alert.level}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-white/50">{alert.time}</span>
                      <button className="text-xs text-[#F8F0AF] hover:underline">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Módulos de acción rápida */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/students/add" className="p-4 rounded-xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] hover:from-[#00343d] hover:to-[#002029] transition-all flex items-center space-x-3 group">
                <div className="p-2 rounded-lg bg-[#F8F0AF]/10 text-[#F8F0AF] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span>Agregar Estudiante</span>
              </Link>

              <Link href="/interventions/new" className="p-4 rounded-xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] hover:from-[#00343d] hover:to-[#002029] transition-all flex items-center space-x-3 group">
                <div className="p-2 rounded-lg bg-[#AC4A00]/10 text-[#AC4A00] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span>Nueva Intervención</span>
              </Link>

              <Link href="/reports/generate" className="p-4 rounded-xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] hover:from-[#00343d] hover:to-[#002029] transition-all flex items-center space-x-3 group">
                <div className="p-2 rounded-lg bg-[#F8F0AF]/10 text-[#F8F0AF] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span>Generar Reporte</span>
              </Link>

              <Link href="/alerts" className="p-4 rounded-xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] hover:from-[#00343d] hover:to-[#002029] transition-all flex items-center space-x-3 group">
                <div className="p-2 rounded-lg bg-[#AC4A00]/10 text-[#AC4A00] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span>Gestionar Alertas</span>
              </Link>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay para móvil cuando el sidebar está abierto */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
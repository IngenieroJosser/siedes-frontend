"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ChartDataItem {
  day?: string;
  week?: string;
  riesgo: number;
  intervenciones: number;
}

export default function DashboardCore() {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState(5);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("7days");

  // Efecto para manejar hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Función para formatear números consistentemente
  const formatNumber = (num: number) => {
    if (!isMounted) return num.toString();
    return num.toLocaleString('en-US');
  };

  // Datos de ejemplo para el gráfico
  const chartData = {
    "7days": [
      { day: "Lun", riesgo: 45, intervenciones: 20 },
      { day: "Mar", riesgo: 52, intervenciones: 25 },
      { day: "Mié", riesgo: 48, intervenciones: 30 },
      { day: "Jue", riesgo: 60, intervenciones: 35 },
      { day: "Vie", riesgo: 55, intervenciones: 28 },
      { day: "Sáb", riesgo: 40, intervenciones: 22 },
      { day: "Dom", riesgo: 35, intervenciones: 18 }
    ],
    "30days": [
      { week: "Sem 1", riesgo: 45, intervenciones: 20 },
      { week: "Sem 2", riesgo: 52, intervenciones: 25 },
      { week: "Sem 3", riesgo: 60, intervenciones: 35 },
      { week: "Sem 4", riesgo: 55, intervenciones: 30 }
    ]
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
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    students: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    alerts: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    interventions: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    reports: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    settings: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  };

  const modules = [
    { id: "dashboard", name: "Dashboard", icon: moduleIcons.dashboard, desc: "Visión general del sistema" , href: "/core/"},
    { id: "students", name: "Estudiantes", icon: moduleIcons.students, desc: "Gestión de estudiantes" , href: "/core/students"},
    { id: "alerts", name: "Alertas", icon: moduleIcons.alerts, desc: "Alertas predictivas" },
    { id: "interventions", name: "Intervenciones", icon: moduleIcons.interventions, desc: "Estrategias de intervención" , href: "/core/interventions"},
    { id: "reports", name: "Reportes", icon: moduleIcons.reports, desc: "Reportes y análisis" , href: "/core/reports"},
    { id: "settings", name: "Configuración", icon: moduleIcons.settings, desc: "Configuración del sistema" , href: "/core/settings"},
  ];

  // Función para renderizar el gráfico simple
  const renderMiniChart = (data: ChartDataItem[]) => {
    const maxValue = Math.max(...data.map(item => Math.max(item.riesgo, item.intervenciones)));
  
    return (
      <div className="flex items-end h-8 gap-px mt-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex items-end justify-center gap-px" style={{ height: '24px' }}>
              <div
                className="w-1 bg-[#F8F0AF] rounded-t"
                style={{ height: `${(item.riesgo / maxValue) * 100}%`, minHeight: '2px' }}
              />
              <div
                className="w-1 bg-[#AC4A00] rounded-t"
                style={{ height: `${(item.intervenciones / maxValue) * 100}%`, minHeight: '2px' }}
              />
            </div>
            <span className="text-[8px] text-white/50 mt-1">
              {item.day ? item.day : item.week?.substring(0, 3)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="pt-20 flex h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed md:relative z-40 w-64 bg-[#00232a] border-r border-white/10 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} md:flex flex-col h-full shadow-xl`}>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {modules.map((module) => (
              <Link
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                href={module.href || "/core"}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${activeModule === module.id ? 'bg-gradient-to-r from-[#AC4A00]/30 to-[#F8F0AF]/30 text-[#F8F0AF] border border-[#F8F0AF]/20 shadow-lg' : 'hover:bg-white/5'}`}
              >
                <span className={`transition-transform duration-200 group-hover:scale-110 ${activeModule === module.id ? 'text-[#F8F0AF]' : 'text-[#AC4A00]'}`}>
                  {module.icon}
                </span>
                <div>
                  <div className="font-medium">{module.name}</div>
                  <div className="text-xs text-white/60">{module.desc}</div>
                </div>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="font-bold text-[#002930]">A</span>
            </div>
            <div>
              <div className="font-medium">Admin Usuario</div>
              <div className="text-xs text-white/60">Administrador</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="pt-20 bg-[#00232a]/90 backdrop-blur-sm border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 mr-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] bg-clip-text text-transparent">Dashboard Principal</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors relative group">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-[#AC4A00] text-xs rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-md">
                    {notifications}
                  </span>
                )}
                <div className="absolute invisible group-hover:visible -left-24 mt-2 w-48 bg-[#002930] border border-white/10 rounded-lg shadow-lg py-1 z-10">
                  <div className="px-4 py-2 text-sm border-b border-white/10">Tienes {notifications} notificaciones</div>
                  <div className="px-4 py-2 text-sm hover:bg-white/5 cursor-pointer">Ver todas</div>
                </div>
              </button>
            </div>

            <div className="relative">
              <div className="relative">
                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 w-48 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-[#001c22] to-[#002029]">
          {/* Welcome Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Bienvenido de vuelta, Admin</h2>
            <p className="text-white/70">Aquí está el resumen de tu sistema de alertas tempranas</p>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#00232a] to-[#001c22] p-5 shadow-lg hover:shadow-xl transition-shadow">
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
              {renderMiniChart(chartData[selectedPeriod as keyof typeof chartData])}
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#00232a] to-[#001c22] p-5 shadow-lg hover:shadow-xl transition-shadow">
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
              <div className="flex items-center mt-3">
                <svg className="w-4 h-4 text-[#AC4A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-xs text-[#F8F0AF] ml-1">+5% desde ayer</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#00232a] to-[#001c22] p-5 shadow-lg hover:shadow-xl transition-shadow">
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
              <div className="flex items-center mt-3">
                <svg className="w-4 h-4 text-[#F8F0AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-xs text-[#F8F0AF] ml-1">12% más efectivas</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#00232a] to-[#001c22] p-5 shadow-lg hover:shadow-xl transition-shadow">
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
              <div className="flex items-center mt-3">
                <svg className="w-4 h-4 text-[#F8F0AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-xs text-[#F8F0AF] ml-1">Meta: 85%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico principal */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-gradient-to-b from-[#00232a] to-[#001c22] p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Tendencias de Riesgo</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedPeriod("7days")}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${selectedPeriod === "7days" ? 'bg-[#AC4A00] text-white' : 'bg-white/5 hover:bg-white/10'}`}
                  >
                    7 días
                  </button>
                  <button
                    onClick={() => setSelectedPeriod("30days")}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${selectedPeriod === "30days" ? 'bg-[#AC4A00] text-white' : 'bg-white/5 hover:bg-white/10'}`}
                  >
                    30 días
                  </button>
                </div>
              </div>

              <div className="h-80">
                <div className="h-full flex flex-col justify-center bg-white/5 rounded-xl border border-white/10 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#F8F0AF] rounded-full mr-2"></div>
                        <span className="text-sm">Nivel de riesgo</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#AC4A00] rounded-full mr-2"></div>
                        <span className="text-sm">Intervenciones</span>
                      </div>
                    </div>
                    <div className="text-sm text-white/60">
                      {selectedPeriod === "7days" ? "Últimos 7 días" : "Últimos 30 días"}
                    </div>
                  </div>

                  <div className="flex-1 relative">
                    {/* Eje Y */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-white/50">
                      <span>100%</span>
                      <span>75%</span>
                      <span>50%</span>
                      <span>25%</span>
                      <span>0%</span>
                    </div>

                    {/* Gráfico */}
                    <div className="ml-8 h-full flex flex-col justify-between">
                      <div className="h-full flex items-end">
                        <div className="flex-1 flex items-end justify-around">
                          {chartData[selectedPeriod as keyof typeof chartData].map((item, index) => (
                            <div key={index} className="flex flex-col items-center" style={{ height: '90%' }}>
                              <div className="flex items-end justify-center h-full pb-2 space-x-1">
                                <div
                                  className="w-4 bg-[#F8F0AF] rounded-t transition-all hover:opacity-80 cursor-pointer"
                                  style={{ height: `${item.riesgo}%` }}
                                  title={`Riesgo: ${item.riesgo}%`}
                                ></div>
                                <div
                                  className="w-4 bg-[#AC4A00] rounded-t transition-all hover:opacity-80 cursor-pointer"
                                  style={{ height: `${item.intervenciones}%` }}
                                  title={`Intervenciones: ${item.intervenciones}%`}
                                ></div>
                              </div>
                              <div className="text-xs text-white/60 mt-2">
                                {'day' in item ? item.day : item.week}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas recientes */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#00232a] to-[#001c22] p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Alertas Recientes</h2>
                <Link href="/alerts" className="text-sm text-[#F8F0AF] hover:underline flex items-center">
                  Ver todas
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="space-y-4">
                {recentAlerts.map(alert => (
                  <div key={alert.id} className="p-4 rounded-xl border border-white/10 hover:border-[#F8F0AF]/30 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium group-hover:text-[#F8F0AF] transition-colors">{alert.student}</h3>
                        <p className="text-sm text-white/70 mt-1">{alert.reason}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${alert.level === 'Alto' ? 'bg-[#AC4A00]/20 text-[#AC4A00]' : alert.level === 'Medio' ? 'bg-[#F8F0AF]/20 text-[#F8F0AF]' : 'bg-white/20 text-white'}`}>
                        {alert.level}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-white/50">{alert.time}</span>
                      <button className="text-xs text-[#F8F0AF] hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                        Ver detalles →
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
              <Link href="/core/students/add" className="p-4 rounded-xl border border-white/10 bg-gradient-to-b from-[#00232a] to-[#001c22] hover:from-[#00343d] hover:to-[#002029] transition-all flex items-center space-x-3 group hover:shadow-lg">
                <div className="p-2 rounded-lg bg-[#F8F0AF]/10 text-[#F8F0AF] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="group-hover:text-[#F8F0AF] transition-colors">Agregar Estudiante</span>
              </Link>

              <Link href="/interventions/new" className="p-4 rounded-xl border border-white/10 bg-gradient-to-b from-[#00232a] to-[#001c22] hover:from-[#00343d] hover:to-[#002029] transition-all flex items-center space-x-3 group hover:shadow-lg">
                <div className="p-2 rounded-lg bg-[#AC4A00]/10 text-[#AC4A00] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="group-hover:text-[#F8F0AF] transition-colors">Nueva Intervención</span>
              </Link>

              <Link href="/reports/generate" className="p-4 rounded-xl border border-white/10 bg-gradient-to-b from-[#00232a] to-[#001c22] hover:from-[#00343d] hover:to-[#002029] transition-all flex items-center space-x-3 group hover:shadow-lg">
                <div className="p-2 rounded-lg bg-[#F8F0AF]/10 text-[#F8F0AF] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="group-hover:text-[#F8F0AF] transition-colors">Generar Reporte</span>
              </Link>

              <Link href="/alerts" className="p-4 rounded-xl border border-white/10 bg-gradient-to-b from-[#00232a] to-[#001c22] hover:from-[#00343d] hover:to-[#002029] transition-all flex items-center space-x-3 group hover:shadow-lg">
                <div className="p-2 rounded-lg bg-[#AC4A00]/10 text-[#AC4A00] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="group-hover:text-[#F8F0AF] transition-colors">Gestionar Alertas</span>
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
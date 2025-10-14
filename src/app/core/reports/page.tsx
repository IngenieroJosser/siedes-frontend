"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getAlerts } from "@/services/alerts";
import { getStudents } from "@/services/students";
import { Alert, Student } from "@/lib/type";

export default function ReportsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [institutionFilter, setInstitutionFilter] = useState("all");

  // Cargar datos
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [alertsData, studentsData] = await Promise.all([
          getAlerts(),
          getStudents()
        ]);
        
        setAlerts(alertsData || []);
        setStudents(studentsData || []);
        
      } catch (error) {
        console.error("Error cargando datos:", error);
        setError("Error al cargar los reportes. Por favor, intenta nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Obtener instituciones únicas
  const institutions = useMemo(() => {
    const uniqueInstitutions = students.reduce((acc: any[], student) => {
      if (student.institucion && !acc.find(inst => inst.id === student.institucion.id)) {
        acc.push(student.institucion);
      }
      return acc;
    }, []);
    
    return [
      { id: "all", nombre: "Todas las instituciones" },
      ...uniqueInstitutions
    ];
  }, [students]);

  // Filtrar datos por fecha e institución
  const filteredData = useMemo(() => {
    let filteredAlerts = alerts.filter(alert => {
      const alertDate = new Date(alert.creadaEn);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999);
      
      return alertDate >= startDate && alertDate <= endDate;
    });

    let filteredStudents = students;

    if (institutionFilter !== "all") {
      filteredAlerts = filteredAlerts.filter(alert => 
        alert.estudiante?.institucion?.id === institutionFilter
      );
      filteredStudents = filteredStudents.filter(student =>
        student.institucion?.id === institutionFilter
      );
    }

    return { alerts: filteredAlerts, students: filteredStudents };
  }, [alerts, students, dateRange, institutionFilter]);

  // Estadísticas principales
  const stats = useMemo(() => {
    const { alerts: filteredAlerts, students: filteredStudents } = filteredData;

    // Estadísticas de alertas
    const totalAlertas = filteredAlerts.length;
    const alertasCriticas = filteredAlerts.filter(a => a.nivelRiesgo === "CRITICO").length;
    const alertasAltas = filteredAlerts.filter(a => a.nivelRiesgo === "ALTO").length;
    const alertasRevisadas = filteredAlerts.filter(a => a.revisada).length;
    const alertasPendientes = totalAlertas - alertasRevisadas;

    // Estadísticas de estudiantes
    const totalEstudiantes = filteredStudents.length;
    const estudiantesConAlerta = filteredAlerts.reduce((acc, alert) => {
      if (!acc.includes(alert.estudianteId)) acc.push(alert.estudianteId);
      return acc;
    }, [] as string[]).length;

    // Distribución por etnia
    const etnias = filteredStudents.reduce((acc, student) => {
      acc[student.etnia] = (acc[student.etnia] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Distribución por género
    const generos = filteredStudents.reduce((acc, student) => {
      acc[student.genero] = (acc[student.genero] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Factores de riesgo más comunes
    const factoresRiesgo = filteredAlerts.reduce((acc, alert) => {
      alert.factores.forEach(factor => {
        acc[factor] = (acc[factor] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const factoresTop = Object.entries(factoresRiesgo)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    return {
      totalAlertas,
      alertasCriticas,
      alertasAltas,
      alertasRevisadas,
      alertasPendientes,
      totalEstudiantes,
      estudiantesConAlerta,
      etnias,
      generos,
      factoresTop
    };
  }, [filteredData]);

  // Datos para gráficos
  const chartData = useMemo(() => {
    return {
      nivelesRiesgo: {
        labels: ['Crítico', 'Alto', 'Medio', 'Bajo'],
        data: [
          stats.alertasCriticas,
          stats.alertasAltas,
          filteredData.alerts.filter(a => a.nivelRiesgo === "MEDIO").length,
          filteredData.alerts.filter(a => a.nivelRiesgo === "BAJO").length
        ],
        colors: ['#EF4444', '#F97316', '#EAB308', '#22C55E']
      },
      estadoAlertas: {
        labels: ['Revisadas', 'Pendientes'],
        data: [stats.alertasRevisadas, stats.alertasPendientes],
        colors: ['#22C55E', '#EAB308']
      },
      etnias: {
        labels: Object.keys(stats.etnias).map(etnia => {
          const labels: Record<string, string> = {
            'AFRODESCENDIENTE': 'Afro',
            'INDIGENA': 'Indígena',
            'ROM': 'Gitano/Rom',
            'RAIZAL': 'Raizal',
            'PALENQUERO': 'Palenquero',
            'NINGUNA': 'No especificado'
          };
          return labels[etnia] || etnia;
        }),
        data: Object.values(stats.etnias),
        colors: ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#6B7280']
      }
    };
  }, [stats, filteredData.alerts]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F8F0AF] mx-auto mb-4"></div>
          <p>Cargando reportes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/20 border border-red-500 rounded-2xl p-6 max-w-md">
            <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Error al cargar reportes</h3>
            <p className="text-white/70 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#AC4A00] text-white rounded-xl hover:opacity-90 transition-opacity"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="pt-18 flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] bg-clip-text text-transparent">
              Dashboard de Reportes
            </h1>
            <p className="text-white/70 mt-2">
              Análisis y estadísticas del sistema de alertas tempranas
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
            <Link
              href="/core/alerts"
              className="inline-flex items-center px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Ver Alertas
            </Link>
            <button className="inline-flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium hover:opacity-90 transition-opacity">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exportar Reporte
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Fecha inicial</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fecha final</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Institución</label>
              <select
                value={institutionFilter}
                onChange={(e) => setInstitutionFilter(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
              >
                {institutions.map((institution) => (
                  <option key={institution.id} value={institution.id}>
                    {institution.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#00232a] rounded-2xl p-6 border border-white/10 hover:border-[#F8F0AF]/30 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Alertas</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.totalAlertas}</p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-[#00232a] rounded-2xl p-6 border border-white/10 hover:border-[#F8F0AF]/30 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Alertas Críticas</p>
                <p className="text-3xl font-bold text-red-400 mt-2">{stats.alertasCriticas}</p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-[#00232a] rounded-2xl p-6 border border-white/10 hover:border-[#F8F0AF]/30 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Estudiantes</p>
                <p className="text-3xl font-bold text-blue-400 mt-2">{stats.totalEstudiantes}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-[#00232a] rounded-2xl p-6 border border-white/10 hover:border-[#F8F0AF]/30 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">En Riesgo</p>
                <p className="text-3xl font-bold text-orange-400 mt-2">{stats.estudiantesConAlerta}</p>
                <p className="text-white/60 text-sm mt-1">
                  {stats.totalEstudiantes > 0 
                    ? `${((stats.estudiantesConAlerta / stats.totalEstudiantes) * 100).toFixed(1)}% del total`
                    : '0%'
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos y análisis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Distribución de niveles de riesgo */}
          <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4 text-[#F8F0AF]">Distribución de Niveles de Riesgo</h3>
            <div className="space-y-4">
              {chartData.nivelesRiesgo.labels.map((label, index) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: chartData.nivelesRiesgo.colors[index] }}
                    ></div>
                    <span className="text-white/80">{label}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white font-medium mr-3">{chartData.nivelesRiesgo.data[index]}</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          backgroundColor: chartData.nivelesRiesgo.colors[index],
                          width: `${(chartData.nivelesRiesgo.data[index] / Math.max(1, stats.totalAlertas)) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estado de alertas */}
          <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4 text-[#F8F0AF]">Estado de Alertas</h3>
            <div className="space-y-4">
              {chartData.estadoAlertas.labels.map((label, index) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: chartData.estadoAlertas.colors[index] }}
                    ></div>
                    <span className="text-white/80">{label}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white font-medium mr-3">{chartData.estadoAlertas.data[index]}</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          backgroundColor: chartData.estadoAlertas.colors[index],
                          width: `${(chartData.estadoAlertas.data[index] / Math.max(1, stats.totalAlertas)) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Factores de riesgo más comunes */}
        <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
          <h3 className="text-lg font-semibold mb-6 text-[#F8F0AF]">Factores de Riesgo Más Comunes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.factoresTop.map(([factor, count], index) => (
              <div key={factor} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[#F8F0AF]/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm font-medium">{factor}</span>
                  <span className="text-[#F8F0AF] font-bold">{count}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF]"
                    style={{ width: `${(count / Math.max(1, stats.totalAlertas)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribución demográfica */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Distribución por etnia */}
          <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4 text-[#F8F0AF]">Distribución por Etnia</h3>
            <div className="space-y-3">
              {chartData.etnias.labels.map((label, index) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: chartData.etnias.colors[index] }}
                    ></div>
                    <span className="text-white/80">{label}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white font-medium mr-3">{chartData.etnias.data[index]}</span>
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          backgroundColor: chartData.etnias.colors[index],
                          width: `${(chartData.etnias.data[index] / Math.max(1, stats.totalEstudiantes)) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen de actividades */}
          <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4 text-[#F8F0AF]">Resumen del Período</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/70">Período analizado</span>
                <span className="text-white font-medium">
                  {new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/70">Institución</span>
                <span className="text-white font-medium">
                  {institutionFilter === "all" 
                    ? "Todas las instituciones" 
                    : institutions.find(i => i.id === institutionFilter)?.nombre
                  }
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/70">Tasa de riesgo</span>
                <span className="text-orange-400 font-medium">
                  {stats.totalEstudiantes > 0 
                    ? `${((stats.estudiantesConAlerta / stats.totalEstudiantes) * 100).toFixed(1)}%`
                    : '0%'
                  }
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-white/70">Eficiencia en revisión</span>
                <span className="text-green-400 font-medium">
                  {stats.totalAlertas > 0 
                    ? `${((stats.alertasRevisadas / stats.totalAlertas) * 100).toFixed(1)}%`
                    : '0%'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

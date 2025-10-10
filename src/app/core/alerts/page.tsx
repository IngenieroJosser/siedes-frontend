"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getStudents } from "@/services/students";
import { Student as StudentType } from "@/lib/type";
import { deleteAlert, markAlertAsReviewed } from "@/services/alerts";

type Student = StudentType;

// Funciones auxiliares
const getEthnicityLabel = (etnia: string) => {
  switch (etnia) {
    case "AFRODESCENDIENTE": return "Afrodescendiente";
    case "INDIGENA": return "Indígena";
    case "ROM": return "Gitano/Rom";
    case "RAIZAL": return "Raizal";
    case "PALENQUERO": return "Palenquero";
    case "NINGUNA": return "No especificado";
    default: return etnia;
  }
};

const getNivelRiesgo = (riesgoDesercion: number): string => {
  if (riesgoDesercion >= 0.8) return "CRITICO";
  if (riesgoDesercion >= 0.6) return "ALTO";
  if (riesgoDesercion >= 0.4) return "MEDIO";
  return "BAJO";
};

const getRiskColor = (riesgoDesercion: number) => {
  const nivelRiesgo = getNivelRiesgo(riesgoDesercion);
  switch (nivelRiesgo) {
    case "CRITICO": return "bg-red-600";
    case "ALTO": return "bg-orange-500";
    case "MEDIO": return "bg-yellow-500";
    case "BAJO": return "bg-green-500";
    default: return "bg-gray-500";
  }
};

const getRiskText = (riesgoDesercion: number) => {
  const nivelRiesgo = getNivelRiesgo(riesgoDesercion);
  switch (nivelRiesgo) {
    case "CRITICO": return "Crítico";
    case "ALTO": return "Alto";
    case "MEDIO": return "Medio";
    case "BAJO": return "Bajo";
    default: return "Sin riesgo";
  }
};

const getRiskIcon = (riesgoDesercion: number) => {
  const nivelRiesgo = getNivelRiesgo(riesgoDesercion);
  switch (nivelRiesgo) {
    case "CRITICO":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    case "ALTO":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      );
    case "MEDIO":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
  }
};

// Simulación de datos de alertas (deberías reemplazar con tu API real)
const generateMockAlerts = (students: Student[]) => {
  return students
    .filter(student => getNivelRiesgo(student.riesgoDesercion) === "CRITICO" || getNivelRiesgo(student.riesgoDesercion) === "ALTO")
    .map(student => {
      const nivelRiesgo = getNivelRiesgo(student.riesgoDesercion);
      const factores = [];
      
      // Generar factores de riesgo basados en el contexto
      if (student.contexto) {
        if (student.contexto.trabaja) factores.push("Trabaja mientras estudia");
        if (!student.contexto.accesoInternet) factores.push("Sin acceso a internet");
        if (!student.contexto.apoyoFamiliar) factores.push("Falta de apoyo familiar");
        if (student.contexto.distanciaEscuela > 5) factores.push("Larga distancia a la escuela");
        if (student.contexto.ingresosFamiliares && student.contexto.ingresosFamiliares < 500000) factores.push("Bajos ingresos familiares");
      }
      
      // Factores por etnia
      if (student.etnia !== "NINGUNA") {
        factores.push(`Pertenece a comunidad ${getEthnicityLabel(student.etnia).toLowerCase()}`);
      }
      
      // Factores académicos
      if (student.riesgoDesercion > 0.7) {
        factores.push("Bajo rendimiento académico");
      }
      
      return {
        id: `${student.id}`, // o alert- `alert-${student.id}`
        estudianteId: student.id,
        nivelRiesgo: nivelRiesgo as "CRITICO" | "ALTO" | "MEDIO" | "BAJO",
        descripcion: `Alerta de deserción ${nivelRiesgo.toLowerCase()} para ${student.usuario.nombre} ${student.usuario.apellido}`,
        factores: factores.length > 0 ? factores : ["Factores múltiples de riesgo identificados"],
        creadaEn: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Últimos 7 días
        revisada: Math.random() > 0.7, // 30% revisadas
        fechaRevision: Math.random() > 0.7 ? new Date().toISOString() : undefined,
        estudiante: student
      };
    });
};

export default function AlertsPage() {
  const [_, setStudents] = useState<Student[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [institutionFilter, setInstitutionFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [deletingAlertId, setDeletingAlertId] = useState<string | null>(null);
  const [reviewingAlertId, setReviewingAlertId] = useState<string | null>(null);

  // Cargar estudiantes y generar alertas
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const studentsData = await getStudents();
        setStudents(studentsData);
        
        // Generar alertas mock (reemplazar con tu API real)
        const mockAlerts = generateMockAlerts(studentsData);
        setAlerts(mockAlerts);
      } catch (error) {
        console.error("Error cargando datos:", error);
        setError("Error al cargar las alertas. Por favor, intenta nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Obtener instituciones únicas de las alertas
  const institutions = useMemo(() => {
    const uniqueInstitutions = alerts.reduce((acc: any[], alert) => {
      if (alert.estudiante.institucion && !acc.find(inst => inst.id === alert.estudiante.institucion.id)) {
        acc.push(alert.estudiante.institucion);
      }
      return acc;
    }, []);
    
    return [
      { id: "all", nombre: "Todas las instituciones" },
      ...uniqueInstitutions
    ];
  }, [alerts]);

  // Filtrar alertas
  const filteredAlerts = useMemo(() => {
    let result = alerts;

    // Filtro de búsqueda
    if (searchTerm) {
      result = result.filter(alert => 
        `${alert.estudiante.usuario?.nombre || ''} ${alert.estudiante.usuario?.apellido || ''}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        alert.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por nivel de riesgo
    if (riskFilter !== "all") {
      result = result.filter(alert => alert.nivelRiesgo === riskFilter);
    }

    // Filtro por estado (revisada/no revisada)
    if (statusFilter !== "all") {
      result = result.filter(alert => 
        statusFilter === "revisada" ? alert.revisada : !alert.revisada
      );
    }

    // Filtro por institución
    if (institutionFilter !== "all") {
      result = result.filter(alert => alert.estudiante.institucion?.id === institutionFilter);
    }

    return result;
  }, [alerts, searchTerm, riskFilter, statusFilter, institutionFilter]);

  // Calcular páginas
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAlerts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Calcular estadísticas
  const stats = useMemo(() => {
    const total = alerts.length;
    const critico = alerts.filter(a => a.nivelRiesgo === "CRITICO").length;
    const alto = alerts.filter(a => a.nivelRiesgo === "ALTO").length;
    const revisadas = alerts.filter(a => a.revisada).length;
    const pendientes = total - revisadas;
    
    return { total, critico, alto, revisadas, pendientes };
  }, [alerts]);

  // Función para marcar alerta como revisada
  const handleMarkAsReviewed = async (alertId: string) => {
    setReviewingAlertId(alertId);
    try {
      // Si estás usando la API real, descomenta esta línea:
      // await markAlertAsReviewed(alertId);
      
      // Por ahora, actualizamos el estado local
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, revisada: true, fechaRevision: new Date().toISOString() }
          : alert
      ));
    } catch (error) {
      console.error("Error marcando alerta como revisada:", error);
      setError("Error al marcar la alerta como revisada");
    } finally {
      setReviewingAlertId(null);
    }
  };

  // Función para eliminar alerta
  const handleDeleteAlert = async (alertId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta alerta? Esta acción no se puede deshacer.")) {
      return;
    }

    setDeletingAlertId(alertId);
    try {
      // Si estás usando la API real, descomenta esta línea:
      // await deleteAlert(alertId);
      
      // Por ahora, actualizamos el estado local
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    } catch (error) {
      console.error("Error eliminando alerta:", error);
      setError("Error al eliminar la alerta");
    } finally {
      setDeletingAlertId(null);
    }
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F8F0AF] mx-auto mb-4"></div>
          <p>Cargando alertas...</p>
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
            <h3 className="text-lg font-semibold mb-2">Error al cargar alertas</h3>
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
        <div className="pt-18 flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] bg-clip-text text-transparent">
              Sistema de Alertas Tempranas
            </h1>
            <p className="text-white/70 mt-2">
              Monitorea y gestiona las alertas de deserción escolar en tiempo real
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Link
              href="/core/students"
              className="inline-flex items-center px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Ver Estudiantes
            </Link>
            <Link href="/core/alerts/add" className="inline-flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium hover:opacity-90 transition-opacity">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Crear Nueva Alerta
            </Link>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-[#00232a] rounded-xl p-4 border border-white/10">
            <div className="text-sm text-white/60">Total alertas</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-red-500/30">
            <div className="text-sm text-white/60">Riesgo Crítico</div>
            <div className="text-2xl font-bold text-red-400">
              {stats.critico}
            </div>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-orange-500/30">
            <div className="text-sm text-white/60">Riesgo Alto</div>
            <div className="text-2xl font-bold text-orange-400">
              {stats.alto}
            </div>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-white/10">
            <div className="text-sm text-white/60">Pendientes</div>
            <div className="text-2xl font-bold text-yellow-400">
              {stats.pendientes}
            </div>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-white/10">
            <div className="text-sm text-white/60">Revisadas</div>
            <div className="text-2xl font-bold text-green-400">
              {stats.revisadas}
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Buscar alerta</label>
              <div className="relative">
                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Estudiante o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nivel de riesgo</label>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
              >
                <option value="all">Todos los niveles</option>
                <option value="CRITICO">Crítico</option>
                <option value="ALTO">Alto</option>
                <option value="MEDIO">Medio</option>
                <option value="BAJO">Bajo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Estado</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
              >
                <option value="all">Todos los estados</option>
                <option value="pendiente">Pendientes</option>
                <option value="revisada">Revisadas</option>
              </select>
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

        {/* Grid de Alertas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {currentItems.length > 0 ? (
            currentItems.map((alert) => (
              <div
                key={alert.id}
                className={`bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl ${
                  alert.nivelRiesgo === "CRITICO" 
                    ? "border-red-500/50 hover:shadow-red-500/20" 
                    : alert.nivelRiesgo === "ALTO"
                    ? "border-orange-500/50 hover:shadow-orange-500/20"
                    : "border-yellow-500/50 hover:shadow-yellow-500/20"
                }`}
              >
                {/* Header de la alerta */}
                <div className={`p-4 ${
                  alert.nivelRiesgo === "CRITICO" 
                    ? "bg-red-500/20" 
                    : alert.nivelRiesgo === "ALTO"
                    ? "bg-orange-500/20"
                    : "bg-yellow-500/20"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${
                        alert.nivelRiesgo === "CRITICO" 
                          ? "bg-red-500 text-white" 
                          : alert.nivelRiesgo === "ALTO"
                          ? "bg-orange-500 text-white"
                          : "bg-yellow-500 text-[#002930]"
                      }`}>
                        {getRiskIcon(alert.estudiante.riesgoDesercion)}
                      </div>
                      <div className="ml-3">
                        <div className={`font-bold ${
                          alert.nivelRiesgo === "CRITICO" 
                            ? "text-red-300" 
                            : alert.nivelRiesgo === "ALTO"
                            ? "text-orange-300"
                            : "text-yellow-300"
                        }`}>
                          {alert.nivelRiesgo}
                        </div>
                        <div className="text-sm text-white/70">
                          {formatDate(alert.creadaEn)}
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      alert.revisada 
                        ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                        : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                    }`}>
                      {alert.revisada ? "Revisada" : "Pendiente"}
                    </div>
                  </div>
                </div>

                {/* Contenido de la alerta */}
                <div className="p-4">
                  {/* Información del estudiante */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] flex items-center justify-center mr-3">
                      <span className="font-bold text-[#002930] text-sm">
                        {alert.estudiante.usuario?.nombre?.charAt(0) || ''}{alert.estudiante.usuario?.apellido?.charAt(0) || ''}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        {alert.estudiante.usuario?.nombre || ''} {alert.estudiante.usuario?.apellido || ''}
                      </div>
                      <div className="text-sm text-white/60">
                        {alert.estudiante.grado} • {alert.estudiante.edad} años
                      </div>
                      <div className="text-sm text-white/60">
                        {alert.estudiante.institucion?.nombre}
                      </div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="mb-4">
                    <div className="text-sm text-white/70 mb-2">{alert.descripcion}</div>
                    
                    {/* Barra de progreso de riesgo */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Probabilidad de deserción</span>
                        <span className="font-bold">{(alert.estudiante.riesgoDesercion * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${getRiskColor(alert.estudiante.riesgoDesercion)}`} 
                          style={{ width: `${alert.estudiante.riesgoDesercion * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Factores de riesgo */}
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2 text-white/80">Factores identificados:</div>
                    <div className="flex flex-wrap gap-1">
                      {alert.factores.slice(0, 3).map((factor: string, index: number) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-white/5 rounded-lg text-xs text-white/70 border border-white/10"
                        >
                          {factor}
                        </span>
                      ))}
                      {alert.factores.length > 3 && (
                        <span className="px-2 py-1 bg-white/5 rounded-lg text-xs text-white/70 border border-white/10">
                          +{alert.factores.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="flex space-x-2">
                      <Link
                        href={`/core/students/${alert.estudiante.id}`}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        title="Ver estudiante"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/core/alerts/edit/${alert.id}`}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        title="Editar alerta"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      {/* <button 
                        onClick={() => handleDeleteAlert(alert.id)}
                        disabled={deletingAlertId === alert.id}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        title="Eliminar alerta"
                      >
                        {deletingAlertId === alert.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                        ) : (
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button> */}
                    </div>
                    
                    {!alert.revisada && (
                      <button
                        onClick={() => handleMarkAsReviewed(alert.id)}
                        disabled={reviewingAlertId === alert.id}
                        className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-sm hover:bg-green-500/30 transition-colors border border-green-500/30 disabled:opacity-50 flex items-center"
                      >
                        {reviewingAlertId === alert.id ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-300 mr-2"></div>
                            Procesando...
                          </>
                        ) : (
                          "Marcar como revisada"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">No hay alertas activas</h3>
                <p className="text-white/60 mb-6">
                  {alerts.length === 0 
                    ? "No se han generado alertas en el sistema" 
                    : "No se encontraron alertas con los filtros aplicados"
                  }
                </p>
                {alerts.length === 0 && (
                  <Link
                    href="/core/students"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium rounded-xl hover:opacity-90 transition-opacity"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Ver Estudiantes
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Paginación */}
        {filteredAlerts.length > 0 && (
          <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-white/60">
              Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredAlerts.length)} de {filteredAlerts.length} alertas
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    currentPage === page 
                      ? 'bg-[#AC4A00] text-white' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

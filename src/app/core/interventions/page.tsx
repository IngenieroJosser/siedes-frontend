"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getStudents } from "@/services/students";
import { Student } from "@/lib/type";
import { 
  getInterventions, 
  deleteIntervention, 
  getInterventionsStats
} from "@/services/interventions";

import { Intervention as InterventionType, FilterInterventionsParams } from "@/lib/type";

export default function InterventionsPage() {
  const [interventions, setInterventions] = useState<InterventionType[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [institutionFilter, setInstitutionFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [deletingInterventionId, setDeletingInterventionId] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    activas: 0,
    completadas: 0,
    suspendidas: 0,
    canceladas: 0,
    efectividadPromedio: 0
  });

  // Cargar datos desde el backend
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Cargar estudiantes e intervenciones en paralelo
        const [studentsData, interventionsResponse, statsResponse] = await Promise.all([
          getStudents(),
          getInterventions(),
          getInterventionsStats()
        ]);
        
        setStudents(studentsData || []);
        setInterventions(interventionsResponse || []);
        
        // Procesar estadísticas desde el backend
        if (statsResponse) {
          const backendStats = statsResponse;
          setStats({
            total: backendStats.total,
            activas: backendStats.porEstado.ACTIVA?.count || 0,
            completadas: backendStats.porEstado.COMPLETADA?.count || 0,
            suspendidas: backendStats.porEstado.SUSPENDIDA?.count || 0,
            canceladas: backendStats.porEstado.CANCELADA?.count || 0,
            efectividadPromedio: backendStats.efectividadPromedio || 0
          });
        }
        
      } catch (error) {
        console.error("Error cargando datos:", error);
        setError("Error al cargar las intervenciones. Por favor, intenta nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Cargar intervenciones con filtros
  const loadFilteredInterventions = async (filters: FilterInterventionsParams = {}) => {
    try {
      setIsLoading(true);
      const interventionsResponse = await getInterventions(filters);
      setInterventions(interventionsResponse || []);
    } catch (error) {
      console.error("Error cargando intervenciones filtradas:", error);
      setError("Error al aplicar los filtros.");
    } finally {
      setIsLoading(false);
    }
  };

  // Aplicar filtros automáticamente cuando cambien
  useEffect(() => {
    const filters: FilterInterventionsParams = {};
    
    if (typeFilter !== "all") filters.tipo = typeFilter as any;
    if (statusFilter !== "all") filters.estado = statusFilter as any;
    if (institutionFilter !== "all") filters.institucionId = institutionFilter;
    if (searchTerm) filters.search = searchTerm;

    loadFilteredInterventions(filters);
  }, [typeFilter, statusFilter, institutionFilter, searchTerm]);

  // Obtener instituciones únicas
  const institutions = useMemo(() => {
    const uniqueInstitutions = interventions.reduce((acc: any[], intervention) => {
      if (intervention.estudiante?.institucion && !acc.find(inst => inst.id === intervention.estudiante!.institucion.id)) {
        acc.push(intervention.estudiante.institucion);
      }
      return acc;
    }, []);
    
    return [
      { id: "all", nombre: "Todas las instituciones" },
      ...uniqueInstitutions
    ];
  }, [interventions]);

  // Filtrar intervenciones localmente para paginación
  const filteredInterventions = useMemo(() => {
    return interventions; // Ya viene filtrado del backend
  }, [interventions]);

  // Calcular páginas
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInterventions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInterventions.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Función para eliminar intervención
  const handleDeleteIntervention = async (interventionId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta intervención? Esta acción no se puede deshacer.")) {
      return;
    }

    setDeletingInterventionId(interventionId);
    try {
      await deleteIntervention(interventionId);
      
      // Actualizar el estado local eliminando la intervención
      setInterventions(prev => prev.filter(intervention => intervention.id !== interventionId));
      
      // Recargar estadísticas
      const statsResponse = await getInterventionsStats();
      if (statsResponse) {
        const backendStats = statsResponse;
        setStats({
          total: backendStats.total,
          activas: backendStats.porEstado.ACTIVA?.count || 0,
          completadas: backendStats.porEstado.COMPLETADA?.count || 0,
          suspendidas: backendStats.porEstado.SUSPENDIDA?.count || 0,
          canceladas: backendStats.porEstado.CANCELADA?.count || 0,
          efectividadPromedio: backendStats.efectividadPromedio || 0
        });
      }
    } catch (error) {
      console.error("Error eliminando intervención:", error);
      setError("Error al eliminar la intervención");
    } finally {
      setDeletingInterventionId(null);
    }
  };

  // Formatear fecha
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "En curso";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Obtener color según el estado
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "ACTIVA": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "COMPLETADA": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "SUSPENDIDA": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "CANCELADA": return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  // Obtener color según el tipo
  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case "ACADEMICA": return "bg-purple-500/20 text-purple-300";
      case "PSICOLOGICA": return "bg-pink-500/20 text-pink-300";
      case "ECONOMICA": return "bg-orange-500/20 text-orange-300";
      case "FAMILIAR": return "bg-teal-500/20 text-teal-300";
      case "COMUNITARIA": return "bg-indigo-500/20 text-indigo-300";
      case "CULTURAL": return "bg-amber-500/20 text-amber-300";
      case "TUTORIA": return "bg-cyan-500/20 text-cyan-300";
      default: return "bg-gray-500/20 text-gray-300";
    }
  };

  // Obtener icono según el tipo
  const getTypeIcon = (tipo: string) => {
    switch (tipo) {
      case "ACADEMICA":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9 5m9-5v9" />
          </svg>
        );
      case "PSICOLOGICA":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case "ECONOMICA":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
    }
  };

  // Manejar cambio de filtros
  const handleFilterChange = () => {
    setCurrentPage(1); // Resetear a primera página al cambiar filtros
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F8F0AF] mx-auto mb-4"></div>
          <p>Cargando intervenciones...</p>
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
            <h3 className="text-lg font-semibold mb-2">Error al cargar intervenciones</h3>
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
              Sistema de Intervenciones
            </h1>
            <p className="text-white/70 mt-2">
              Gestiona y monitorea las intervenciones para prevenir la deserción escolar
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
            <Link href="/core/interventions/add" className="inline-flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium hover:opacity-90 transition-opacity">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Nueva Intervención
            </Link>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-[#00232a] rounded-xl p-4 border border-white/10">
            <div className="text-sm text-white/60">Total</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-green-500/30">
            <div className="text-sm text-white/60">Activas</div>
            <div className="text-2xl font-bold text-green-400">
              {stats.activas}
            </div>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-blue-500/30">
            <div className="text-sm text-white/60">Completadas</div>
            <div className="text-2xl font-bold text-blue-400">
              {stats.completadas}
            </div>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-yellow-500/30">
            <div className="text-sm text-white/60">Suspendidas</div>
            <div className="text-2xl font-bold text-yellow-400">
              {stats.suspendidas}
            </div>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-red-500/30">
            <div className="text-sm text-white/60">Canceladas</div>
            <div className="text-2xl font-bold text-red-400">
              {stats.canceladas}
            </div>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-[#F8F0AF]/30">
            <div className="text-sm text-white/60">Efectividad</div>
            <div className="text-2xl font-bold text-[#F8F0AF]">
              {(stats.efectividadPromedio * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Buscar</label>
              <div className="relative">
                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Estudiante, descripción..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tipo</label>
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  handleFilterChange();
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
              >
                <option value="all">Todos los tipos</option>
                <option value="ACADEMICA">Académica</option>
                <option value="PSICOLOGICA">Psicológica</option>
                <option value="ECONOMICA">Económica</option>
                <option value="FAMILIAR">Familiar</option>
                <option value="COMUNITARIA">Comunitaria</option>
                <option value="CULTURAL">Cultural</option>
                <option value="TUTORIA">Tutoría</option>
                <option value="OTRA">Otra</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Estado</label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  handleFilterChange();
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
              >
                <option value="all">Todos los estados</option>
                <option value="ACTIVA">Activa</option>
                <option value="COMPLETADA">Completada</option>
                <option value="SUSPENDIDA">Suspendida</option>
                <option value="CANCELADA">Cancelada</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Institución</label>
              <select
                value={institutionFilter}
                onChange={(e) => {
                  setInstitutionFilter(e.target.value);
                  handleFilterChange();
                }}
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

        {/* Grid de Intervenciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {currentItems.length > 0 ? (
            currentItems.map((intervention) => (
              <div
                key={intervention.id}
                className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#F8F0AF]/10"
              >
                {/* Header de la intervención */}
                <div className="p-4 bg-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${getTypeColor(intervention.tipo)}`}>
                        {getTypeIcon(intervention.tipo)}
                      </div>
                      <div className="ml-3">
                        <div className={`font-bold ${getTypeColor(intervention.tipo).split(' ')[1]}`}>
                          {intervention.tipo}
                        </div>
                        <div className="text-sm text-white/70">
                          {formatDate(intervention.creadoEn)}
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(intervention.estado)}`}>
                      {intervention.estado}
                    </div>
                  </div>

                  {/* Barra de efectividad */}
                  {intervention.efectividad && (
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Efectividad</span>
                        <span className="font-bold">{(intervention.efectividad * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${
                            intervention.efectividad >= 0.8 ? 'bg-green-500' :
                            intervention.efectividad >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${intervention.efectividad * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Contenido de la intervención */}
                <div className="p-4">
                  {/* Información del estudiante */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] flex items-center justify-center mr-3">
                      <span className="font-bold text-[#002930] text-sm">
                        {intervention.estudiante?.usuario?.nombre?.charAt(0) || ''}{intervention.estudiante?.usuario?.apellido?.charAt(0) || ''}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        {intervention.estudiante?.usuario?.nombre || ''} {intervention.estudiante?.usuario?.apellido || ''}
                      </div>
                      <div className="text-sm text-white/60">
                        {intervention.estudiante?.grado} • {intervention.estudiante?.institucion?.nombre}
                      </div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="mb-4">
                    <div className="text-sm text-white/70 line-clamp-2">{intervention.descripcion}</div>
                  </div>

                  {/* Fechas */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div>
                      <div className="text-white/60 text-xs">Inicio</div>
                      <div className="text-white">{formatDate(intervention.fechaInicio)}</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-xs">Fin</div>
                      <div className="text-white">{formatDate(intervention.fechaFin || null)}</div>
                    </div>
                  </div>

                  {/* Recursos y participantes */}
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2 text-white/80">Recursos utilizados:</div>
                    <div className="flex flex-wrap gap-1">
                      {intervention.recursosUtilizados.slice(0, 2).map((recurso: string, index: number) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-white/5 rounded-lg text-xs text-white/70 border border-white/10"
                        >
                          {recurso}
                        </span>
                      ))}
                      {intervention.recursosUtilizados.length > 2 && (
                        <span className="px-2 py-1 bg-white/5 rounded-lg text-xs text-white/70 border border-white/10">
                          +{intervention.recursosUtilizados.length - 2} más
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Observaciones */}
                  {intervention.observaciones && (
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-1 text-white/80">Observaciones:</div>
                      <div className="text-sm text-white/60 line-clamp-2">{intervention.observaciones}</div>
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="flex space-x-2">
                      <Link
                        href={`/core/students/${intervention.estudianteId}`}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        title="Ver estudiante"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/core/interventions/edit/${intervention.id}`}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        title="Editar intervención"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button 
                        onClick={() => handleDeleteIntervention(intervention.id)}
                        disabled={deletingInterventionId === intervention.id}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        title="Eliminar intervención"
                      >
                        {deletingInterventionId === intervention.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                        ) : (
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>
                    
                    <Link
                      href={`/core/interventions/${intervention.id}`}
                      className="px-3 py-1 bg-white/5 text-white rounded-lg text-sm hover:bg-white/10 transition-colors border border-white/10"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">No hay intervenciones activas</h3>
                <p className="text-white/60 mb-6">
                  {interventions.length === 0 
                    ? "No se han registrado intervenciones en el sistema" 
                    : "No se encontraron intervenciones con los filtros aplicados"
                  }
                </p>
                {interventions.length === 0 && (
                  <Link
                    href="/core/interventions/add"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium rounded-xl hover:opacity-90 transition-opacity"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Crear Primera Intervención
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Paginación */}
        {filteredInterventions.length > 0 && (
          <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-white/60">
              Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredInterventions.length)} de {filteredInterventions.length} intervenciones
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
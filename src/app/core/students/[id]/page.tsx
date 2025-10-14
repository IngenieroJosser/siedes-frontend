"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getStudentById } from "@/services/students";
import { Student as StudentType, Alerta, RegistroAcademico, Nota, Intervencion as IntervencionDetalle } from "@/lib/type";

// Definir tipos extendidos para las propiedades adicionales que usa el frontend
interface AlertaDetalle extends Alerta {
  tipo?: string;
  severidad?: string;
  creadaEn: string;
  revisada?: boolean;
}

interface RegistroAcademicoDetalle extends RegistroAcademico {
  periodo: string;
  promedio: number;
  creadoEn: string;
  materiasAprobadas: number;
  materiasReprobadas: number;
  inasistencias: number;
  comportamiento: number;
  observaciones: string;
}

type Student = StudentType & {
  alertas?: AlertaDetalle[];
  registros?: RegistroAcademicoDetalle[];
  notas?: Nota[];
  intervenciones?: IntervencionDetalle[];
  edad?: number;
};

// Funciones auxiliares - definirlas antes de su uso
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

// Función para determinar el nivel de riesgo basado en el porcentaje
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

const getSeverityColor = (severidad: string) => {
  switch (severidad) {
    case "ALTA": return "bg-red-500/20 text-red-300 border border-red-500/30";
    case "MEDIA": return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";
    case "BAJA": return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
    default: return "bg-gray-500/20 text-gray-300 border border-gray-500/30";
  }
};

// Formatear fecha
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'Fecha no disponible';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return dateString || 'Fecha no disponible';
  }
};

// Formatear fecha y hora
const formatDateTime = (dateString: string | undefined) => {
  if (!dateString) return 'Fecha no disponible';
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
    return dateString || 'Fecha no disponible';
  }
};

// Calcular tiempo relativo
const getRelativeTime = (dateString: string | undefined) => {
  if (!dateString) return 'Fecha no disponible';
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return "Hace unos segundos";
    if (diffMinutes < 60) return `Hace ${diffMinutes} minutos`;
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    if (diffDays === 1) return "Hace 1 día";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return formatDate(dateString);
  } catch {
    return dateString || 'Fecha no disponible';
  }
};

export default function StudentDetail() {
  const params = useParams();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [isHovered, setIsHovered] = useState(false);

  // Cargar estudiante del backend
  useEffect(() => {
    const loadStudent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const studentData = await getStudentById(params.id as string);
        setStudent(studentData as Student);
      } catch (err: unknown) {
        console.error("Error cargando estudiante:", err);
        const errorMessage = err instanceof Error ? err.message : "Error al cargar la información del estudiante. Por favor, intenta nuevamente.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      loadStudent();
    }
  }, [params.id]);

  // Calcular estadísticas en tiempo real
  const stats = useMemo(() => {
    if (!student) return null;

    const totalAlertas = student.alertas?.length || 0;
    const alertasNoRevisadas = student.alertas?.filter(a => !a.revisada).length || 0; 
    const totalRegistros = student.registros?.length || 0;
    const ultimoRegistro = student.registros?.[0];
    
    return { 
      totalAlertas, 
      alertasNoRevisadas, 
      totalRegistros,
      ultimoRegistro 
    };
  }, [student]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00161a] via-[#00232a] to-[#00303a] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F8F0AF] mx-auto mb-4"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] rounded-full animate-ping"></div>
            </div>
          </div>
          <p className="mt-4 text-lg animate-pulse">Cargando información del estudiante...</p>
          <div className="mt-6 h-2 w-48 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00161a] via-[#00232a] to-[#00303a] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/20 border border-red-500 rounded-2xl p-8 max-w-md">
            <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Error al cargar estudiante</h3>
            <p className="text-white/70 mb-6">{error || "El estudiante no existe o no se pudo cargar la información"}</p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-[#AC4A00] text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                Reintentar
              </button>
              <Link 
                href="/core/students"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                Volver al listado
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-[#00161a] via-[#00232a] to-[#00303a] text-white p-6">
      {/* Efecto de partículas sutiles en el fondo */}
      <div className="fixed inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              background: `rgba(${i % 3 === 0 ? '248, 240, 175' : i % 3 === 1 ? '172, 74, 0' : '255, 255, 255'}, ${Math.random() * 0.3 + 0.1})`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header con navegación y acciones */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/core/students"
              className="inline-flex items-center p-3 rounded-xl bg-[#00232a]/60 hover:bg-[#00232a] border border-white/10 text-[#F8F0AF] hover:text-white transition-all transform hover:translate-x-1 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] bg-clip-text text-transparent">
                {student.usuario?.nombre} {student.usuario?.apellido}
              </h1>
              <p className="text-white/70 mt-1 flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${student.activo ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></span>
                {student.activo ? 'Estudiante activo' : 'Estudiante inactivo'} • {student.usuario?.email}
              </p>
            </div>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Link
              href={`/core/students/edit/${student.id}`}
              className="inline-flex items-center px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10 backdrop-blur-sm border border-white/10"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar
            </Link>
            <button className="inline-flex items-center px-5 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/10 backdrop-blur-sm border border-red-500/20">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {student.activo ? 'Desactivar' : 'Activar'}
            </button>
          </div>
        </div>

        {/* Tarjeta principal con información del estudiante */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Tarjeta de perfil */}
          <div className="lg:col-span-2 bg-[#00232a]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 overflow-hidden transform transition-all hover:shadow-2xl hover:shadow-[#F8F0AF]/10">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div 
                className="relative w-24 h-24 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] flex items-center justify-center mr-6 transform transition-all hover:scale-105 hover:rotate-3 mb-4 md:mb-0"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="font-bold text-3xl text-[#002930]">
                  {student.usuario?.nombre?.charAt(0) || ''}{student.usuario?.apellido?.charAt(0) || ''}
                </span>
                {isHovered && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full backdrop-blur-sm">
                    <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">
                  {student.usuario?.nombre} {student.usuario?.apellido}
                </h2>
                <p className="text-white/60 mb-4">{student.usuario?.email}</p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-3 ${getRiskColor(student.riesgoDesercion)} animate-pulse`}></div>
                    <span className="font-medium bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] bg-clip-text text-transparent">
                      Riesgo {getRiskText(student.riesgoDesercion)} ({(student.riesgoDesercion * 100).toFixed(0)}%)
                    </span>
                  </div>
                  
                  {stats && stats.alertasNoRevisadas > 0 && (
                    <div className="flex items-center text-sm bg-[#001a20] px-3 py-1 rounded-lg border border-white/5">
                      <svg className="w-4 h-4 mr-1 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {stats.alertasNoRevisadas} alertas pendientes
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm bg-[#001a20] px-3 py-1 rounded-lg border border-white/5">
                    <svg className="w-4 h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {stats?.totalRegistros || 0} registros académicos
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta de indicadores de riesgo */}
          <div className="bg-[#00232a]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 overflow-hidden transform transition-all hover:shadow-2xl hover:shadow-[#F8F0AF]/10">
            <h3 className="font-medium mb-4 text-[#F8F0AF] flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Indicadores de Riesgo
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Probabilidad de deserción</span>
                  <span className="font-bold">{(student.riesgoDesercion * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`h-2.5 rounded-full ${getRiskColor(student.riesgoDesercion)}`} 
                    style={{ width: `${student.riesgoDesercion * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#001a20] p-3 rounded-xl border border-white/5 transform transition-all hover:scale-105">
                  <div className="text-xs text-white/60">Nivel de riesgo</div>
                  <div className="font-medium">{getRiskText(student.riesgoDesercion)}</div>
                </div>
                <div className="bg-[#001a20] p-3 rounded-xl border border-white/5 transform transition-all hover:scale-105">
                  <div className="text-xs text-white/60">Alertas activas</div>
                  <div className="font-medium">{stats?.alertasNoRevisadas || 0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjetas de información secundaria */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#00232a]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5 transform transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#F8F0AF]/5">
            <h3 className="font-medium mb-3 text-[#F8F0AF] flex items-center text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l-9 5m9-5v6" />
              </svg>
              Información académica
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="text-white/60 w-20">Institución:</span>
                <span className="truncate">{student.institucion?.nombre || 'No asignada'}</span>
              </div>
              <div className="flex">
                <span className="text-white/60 w-20">Grado:</span>
                <span>{student.grado}</span>
              </div>
              <div className="flex">
                <span className="text-white/60 w-20">Edad:</span>
                <span>{student.edad} años</span>
              </div>
            </div>
          </div>

          <div className="bg-[#00232a]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5 transform transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#F8F0AF]/5">
            <h3 className="font-medium mb-3 text-[#F8F0AF] flex items-center text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Información personal
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="text-white/60 w-20">Género:</span>
                <span className="capitalize">{student.genero?.toLowerCase()}</span>
              </div>
              <div className="flex">
                <span className="text-white/60 w-20">Etnia:</span>
                <span>{getEthnicityLabel(student.etnia)}</span>
              </div>
              <div className="flex">
                <span className="text-white/60 w-20">Estado:</span>
                <span className={student.activo ? 'text-green-400' : 'text-red-400'}>
                  {student.activo ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#00232a]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5 transform transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#F8F0AF]/5">
            <h3 className="font-medium mb-3 text-[#F8F0AF] flex items-center text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contacto
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="text-white/60 w-20">Email:</span>
                <span className="truncate">{student.usuario?.email}</span>
              </div>
              <div className="flex">
                <span className="text-white/60 w-20">Teléfono:</span>
                <span>{student.usuario?.telefono || 'No registrado'}</span>
              </div>
              <div className="flex">
                <span className="text-white/60 w-20">Registro:</span>
                <span>{formatDate(student.creadoEn)}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#00232a]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5 transform transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#F8F0AF]/5">
            <h3 className="font-medium mb-3 text-[#F8F0AF] flex items-center text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Acciones rápidas
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="p-2 bg-[#001a20] hover:bg-[#002a32] rounded-lg border border-white/5 transition-all transform hover:-translate-y-0.5 flex flex-col items-center justify-center group text-xs">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span>Registrar nota</span>
              </button>
              <button className="p-2 bg-[#001a20] hover:bg-[#002a32] rounded-lg border border-white/5 transition-all transform hover:-translate-y-0.5 flex flex-col items-center justify-center group text-xs">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Nueva alerta</span>
              </button>
              <button className="p-2 bg-[#001a20] hover:bg-[#002a32] rounded-lg border border-white/5 transition-all transform hover:-translate-y-0.5 flex flex-col items-center justify-center group text-xs">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>Enviar mensaje</span>
              </button>
              <button className="p-2 bg-[#001a20] hover:bg-[#002a32] rounded-lg border border-white/5 transition-all transform hover:-translate-y-0.5 flex flex-col items-center justify-center group text-xs">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span>Generar reporte</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pestañas con efecto de neón */}
        <div className="bg-[#00232a]/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden mb-8 transform transition-all hover:shadow-2xl hover:shadow-[#F8F0AF]/5">
          <div className="border-b border-white/10 flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("general")}
              className={`px-6 py-4 font-medium flex items-center transition-all ${activeTab === "general" ? "text-[#F8F0AF] border-b-2 border-[#F8F0AF] bg-gradient-to-r from-[#F8F0AF]/10 to-transparent" : "text-white/60 hover:text-[#F8F0AF] hover:bg-white/5"}`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 01118 0z" />
              </svg>
              Información General
            </button>
            <button
              onClick={() => setActiveTab("alertas")}
              className={`px-6 py-4 font-medium flex items-center transition-all ${activeTab === "alertas" ? "text-[#F8F0AF] border-b-2 border-[#F8F0AF] bg-gradient-to-r from-[#F8F0AF]/10 to-transparent" : "text-white/60 hover:text-[#F8F0AF] hover:bg-white/5"}`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Historial de Alertas
              {stats && stats.alertasNoRevisadas > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 animate-pulse">
                  {stats.alertasNoRevisadas}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("academico")}
              className={`px-6 py-4 font-medium flex items-center transition-all ${activeTab === "academico" ? "text-[#F8F0AF] border-b-2 border-[#F8F0AF] bg-gradient-to-r from-[#F8F0AF]/10 to-transparent" : "text-white/60 hover:text-[#F8F0AF] hover:bg-white/5"}`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
              Registro Académico
            </button>
            <button
              onClick={() => setActiveTab("contexto")}
              className={`px-6 py-4 font-medium flex items-center transition-all ${activeTab === "contexto" ? "text-[#F8F0AF] border-b-2 border-[#F8F0AF] bg-gradient-to-r from-[#F8F0AF]/10 to-transparent" : "text-white/60 hover:text-[#F8F0AF] hover:bg-white/5"}`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Contexto Estudiantil
            </button>
          </div>

          <div className="p-6">
            {/* Pestaña de Información General */}
            {activeTab === "general" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-[#001a20]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                  <h3 className="font-medium mb-4 text-[#F8F0AF] flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Resumen del Estudiante
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 text-[#F8F0AF]">Información Básica</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">ID del Estudiante:</span>
                          <span className="font-mono">{student.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Usuario ID:</span>
                          <span className="font-mono">{student.usuarioId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Institución ID:</span>
                          <span className="font-mono">{student.institucionId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Fecha de Registro:</span>
                          <span>{formatDateTime(student.creadoEn)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Última Actualización:</span>
                          <span>{formatDateTime(student.actualizadoEn)}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3 text-[#F8F0AF]">Factores de Riesgo</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                          <div className="font-medium mb-1 flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                            Nivel de Riesgo Actual
                          </div>
                          <div className="text-sm text-red-300">
                            {getRiskText(student.riesgoDesercion)} ({(student.riesgoDesercion * 100).toFixed(0)}%)
                          </div>
                        </div>
                        {student.contexto && (
                          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                            <div className="font-medium mb-1 flex items-center">
                              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                              Contexto Registrado
                            </div>
                            <div className="text-sm text-yellow-300">
                              Información socioeconómica disponible
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pestaña de Historial de Alertas */}
            {activeTab === "alertas" && (
              <div className="animate-fadeIn">
                <div className="mb-6 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-[#F8F0AF]">Historial de Alertas y Notificaciones</h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-[#F8F0AF]/30 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Nueva alerta
                  </button>
                </div>
                
                {student.alertas && student.alertas.length > 0 ? (
                  <div className="space-y-4">
                    {student.alertas.map((alerta, index) => (
                      <div key={alerta.id || index} className="bg-[#001a20]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/5 transform transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-white/5">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium">{alerta.tipo || 'Alerta del sistema'} - {formatDate(alerta.creadaEn)}</div>
                            <p className="text-white/70 mt-1">{alerta.descripcion || 'Descripción no disponible'}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs ${getSeverityColor(alerta.severidad || 'MEDIA')} transform transition-all hover:scale-110`}>
                              {alerta.severidad || 'MEDIA'}
                            </span>
                            {!alerta.revisada && (
                              <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-300 border border-red-500/30 animate-pulse">
                                Pendiente
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-white/60">
                            {getRelativeTime(alerta.creadaEn)}
                          </div>
                          <button className="text-sm text-[#F8F0AF] hover:underline flex items-center">
                            {alerta.revisada ? 'Marcar como pendiente' : 'Marcar como revisada'}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-white/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-lg font-medium text-white/60 mb-2">No hay alertas registradas</h4>
                    <p className="text-white/40">Este estudiante no tiene alertas activas en el sistema.</p>
                  </div>
                )}
              </div>
            )}

            {/* Pestaña de Registro Académico */}
            {activeTab === "academico" && (
              <div className="animate-fadeIn">
                <div className="mb-6 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-[#F8F0AF]">Registro Académico</h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-[#F8F0AF]/30 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Nuevo registro
                  </button>
                </div>
                
                {student.registros && student.registros.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {student.registros.map((registro, index) => (
                      <div key={registro.id || index} className="bg-[#001a20]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/5 transform transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="font-medium">{registro.periodo || 'Periodo no especificado'}</div>
                            <div className="text-sm text-white/60 mt-1">{formatDate(registro.creadoEn)}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#F8F0AF]">{registro.promedio?.toFixed(1) || '0.0'}</div>
                            <div className="text-xs text-white/60">Promedio</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-green-400">{registro.materiasAprobadas || 0}</div>
                            <div className="text-xs text-white/60">Aprobadas</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-red-400">{registro.materiasReprobadas || 0}</div>
                            <div className="text-xs text-white/60">Reprobadas</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-yellow-400">{registro.inasistencias || 0}</div>
                            <div className="text-xs text-white/60">Inasistencias</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-blue-400">{registro.comportamiento || 0}/10</div>
                            <div className="text-xs text-white/60">Comportamiento</div>
                          </div>
                        </div>

                        {registro.observaciones && (
                          <div className="text-sm text-white/70 border-t border-white/10 pt-3">
                            {registro.observaciones}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-white/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                    <h4 className="text-lg font-medium text-white/60 mb-2">No hay registros académicos</h4>
                    <p className="text-white/40">Este estudiante no tiene registros académicos en el sistema.</p>
                  </div>
                )}
              </div>
            )}

            {/* Pestaña de Contexto Estudiantil */}
            {activeTab === "contexto" && (
              <div className="animate-fadeIn">
                <div className="mb-6 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-[#F8F0AF]">Contexto Estudiantil</h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-[#F8F0AF]/30 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Actualizar contexto
                  </button>
                </div>
                
                {student.contexto ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#001a20]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                      <h4 className="font-medium mb-4 text-[#F8F0AF]">Situación Socioeconómica</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-white/60">Distancia a la escuela:</span>
                          <span>{student.contexto.distanciaEscuela} km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Tiempo de desplazamiento:</span>
                          <span>{student.contexto.tiempoDesplazamiento} min</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Personas en el hogar:</span>
                          <span>{student.contexto.personasHogar}</span>
                        </div>
                        {student.contexto.ingresosFamiliares && (
                          <div className="flex justify-between">
                            <span className="text-white/60">Ingresos familiares:</span>
                            <span>${student.contexto.ingresosFamiliares.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#001a20]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                      <h4 className="font-medium mb-4 text-[#F8F0AF]">Factores Adicionales</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-3 rounded-lg ${student.contexto.trabaja ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-gray-500/20 border border-gray-500/30'}`}>
                          <div className="text-sm font-medium">Trabaja</div>
                          <div className="text-lg">{student.contexto.trabaja ? 'Sí' : 'No'}</div>
                          {student.contexto.horasTrabajo && (
                            <div className="text-xs text-white/60">{student.contexto.horasTrabajo} hrs/semana</div>
                          )}
                        </div>
                        <div className={`p-3 rounded-lg ${student.contexto.apoyoFamiliar ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                          <div className="text-sm font-medium">Apoyo familiar</div>
                          <div className="text-lg">{student.contexto.apoyoFamiliar ? 'Sí' : 'No'}</div>
                        </div>
                        <div className={`p-3 rounded-lg ${student.contexto.accesoInternet ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                          <div className="text-sm font-medium">Acceso a internet</div>
                          <div className="text-lg">{student.contexto.accesoInternet ? 'Sí' : 'No'}</div>
                        </div>
                        <div className={`p-3 rounded-lg ${student.contexto.dispositivoElectronico ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                          <div className="text-sm font-medium">Dispositivo electrónico</div>
                          <div className="text-lg">{student.contexto.dispositivoElectronico ? 'Sí' : 'No'}</div>
                        </div>
                      </div>
                    </div>

                    {(student.contexto.situacionesEspeciales || student.contexto.necesidadesEspeciales) && (
                      <div className="md:col-span-2 bg-[#001a20]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                        <h4 className="font-medium mb-4 text-[#F8F0AF]">Observaciones Especiales</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {student.contexto.situacionesEspeciales && (
                            <div>
                              <div className="text-sm font-medium text-white/60 mb-2">Situaciones especiales:</div>
                              <p className="text-white/80">{student.contexto.situacionesEspeciales}</p>
                            </div>
                          )}
                          {student.contexto.necesidadesEspeciales && (
                            <div>
                              <div className="text-sm font-medium text-white/60 mb-2">Necesidades especiales:</div>
                              <p className="text-white/80">{student.contexto.necesidadesEspeciales}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-white/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h4 className="text-lg font-medium text-white/60 mb-2">Contexto no registrado</h4>
                    <p className="text-white/40">Este estudiante no tiene información de contexto registrada en el sistema.</p>
                    <button className="mt-4 px-6 py-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium rounded-lg transition-all transform hover:scale-105">
                      Registrar Contexto
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Estilos para animaciones personalizadas */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
            opacity: 1;
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
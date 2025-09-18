"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Define interfaces for our data structures
interface Alerta {
  fecha: string;
  tipo: string;
  descripcion: string;
  severidad: string;
}

interface Intervencion {
  id: string;
  tipo: string;
  estado: string;
  fechaInicio: string;
  responsable: string;
}

interface Nota {
  fecha: string;
  autor: string;
  contenido: string;
}

interface Student {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  edad: number;
  genero: string;
  etnia: string;
  grado: string;
  institucion: string;
  direccion: string;
  telefono: string;
  acudiente: string;
  telefonoAcudiente: string;
  riesgoDesercion: number;
  nivelRiesgo: string;
  ultimaAlerta: string;
  intervencionesActivas: number;
  historialAlertas: Alerta[];
  intervenciones: Intervencion[];
  notas: Nota[];
}

export default function StudentDetail() {
  const params = useParams();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");
  const [isHovered, setIsHovered] = useState(false);

  // Memoize mockStudent to prevent recreation on every render
  const mockStudent = useMemo(() => ({
    id: params.id as string,
    nombre: "Ana",
    apellido: "Moreno",
    email: "ana.moreno@ejemplo.com",
    edad: 15,
    genero: "FEMENINO",
    etnia: "AFRODESCENDIENTE",
    grado: "9°",
    institucion: "Institución Educativa San Francisco de Asís",
    direccion: "Calle 45 # 12-34, Barrio El Centro",
    telefono: "+57 312 456 7890",
    acudiente: "María Moreno",
    telefonoAcudiente: "+57 310 123 4567",
    riesgoDesercion: 0.85,
    nivelRiesgo: "ALTO",
    ultimaAlerta: "Hace 2 días",
    intervencionesActivas: 2,
    historialAlertas: [
      { fecha: "2023-10-15", tipo: "Asistencia", descripcion: "Falta injustificada por 3 días consecutivos", severidad: "ALTA" },
      { fecha: "2023-09-28", tipo: "Académica", descripcion: "Bajo rendimiento en matemáticas", severidad: "MEDIA" },
      { fecha: "2023-08-10", tipo: "Comportamiento", descripcion: "Aislamiento en actividades grupales", severidad: "MEDIA" }
    ],
    intervenciones: [
      { id: "1", tipo: "Refuerzo académico", estado: "ACTIVA", fechaInicio: "2023-10-20", responsable: "Prof. Carlos Martínez" },
      { id: "2", tipo: "Acompañamiento psicológico", estado: "ACTIVA", fechaInicio: "2023-10-18", responsable: "Psic. Laura Díaz" }
    ],
    notas: [
      { fecha: "2023-11-05", autor: "Psic. Laura Díaz", contenido: "Ana mostró mejoría en su participación en clase hoy." },
      { fecha: "2023-10-25", autor: "Prof. Carlos Martínez", contenido: "Se programó sesión de refuerzo para matemáticas los martes y jueves." }
    ]
  }), [params.id]);

  useEffect(() => {
    // Simular carga de datos
    const loadData = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setStudent(mockStudent);
        setIsLoading(false);
      }, 800);
    };

    loadData();
  }, [params.id, mockStudent]);

  const getRiskColor = (nivelRiesgo: string) => {
    switch (nivelRiesgo) {
      case "CRITICO": return "bg-red-600";
      case "ALTO": return "bg-orange-500";
      case "MEDIO": return "bg-yellow-500";
      case "BAJO": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getRiskText = (nivelRiesgo: string) => {
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

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "ACTIVA": return "bg-green-500/20 text-green-300 border border-green-500/30";
      case "PENDIENTE": return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";
      case "CERRADA": return "bg-gray-500/20 text-gray-300 border border-gray-500/30";
      default: return "bg-gray-500/20 text-gray-300 border border-gray-500/30";
    }
  };

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
          <div className="mt-6 h-2 w-48 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-full mx-auto animate-rainbow"></div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00161a] via-[#00232a] to-[#00303a] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-6 font-bold bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] bg-clip-text text-transparent animate-pulse">
            Estudiante no encontrado
          </div>
          <Link 
            href="/core/students"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#F8F0AF]/30"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al listado
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00161a] via-[#00232a] to-[#00303a] text-white p-6">
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
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] bg-clip-text text-transparent animate-gradient">
                {student.nombre} {student.apellido}
              </h1>
              <p className="text-white/70 mt-1 flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                Información detallada y gestión del estudiante
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
              Eliminar
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
                  {student.nombre.charAt(0)}{student.apellido.charAt(0)}
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
                  {student.nombre} {student.apellido}
                </h2>
                <p className="text-white/60 mb-4">{student.email}</p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-3 ${getRiskColor(student.nivelRiesgo)} animate-pulse`}></div>
                    <span className="font-medium bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] bg-clip-text text-transparent">
                      Riesgo {getRiskText(student.nivelRiesgo)} ({(student.riesgoDesercion * 100).toFixed(0)}%)
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm bg-[#001a20] px-3 py-1 rounded-lg border border-white/5">
                    <svg className="w-4 h-4 mr-1 text-[#F8F0AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {student.ultimaAlerta}
                  </div>
                  
                  <div className="flex items-center text-sm bg-[#001a20] px-3 py-1 rounded-lg border border-white/5">
                    <svg className="w-4 h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {student.intervencionesActivas} intervenciones activas
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
                    className={`h-2.5 rounded-full ${getRiskColor(student.nivelRiesgo)} animate-progress`} 
                    style={{ width: `${student.riesgoDesercion * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#001a20] p-3 rounded-xl border border-white/5 transform transition-all hover:scale-105">
                  <div className="text-xs text-white/60">Nivel de riesgo</div>
                  <div className="font-medium">{getRiskText(student.nivelRiesgo)}</div>
                </div>
                <div className="bg-[#001a20] p-3 rounded-xl border border-white/5 transform transition-all hover:scale-105">
                  <div className="text-xs text-white/60">Intervenciones activas</div>
                  <div className="font-medium">{student.intervencionesActivas}</div>
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
                <span className="truncate">{student.institucion}</span>
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
                <span>{student.genero === "FEMENINO" ? "Femenino" : "Masculino"}</span>
              </div>
              <div className="flex">
                <span className="text-white/60 w-20">Etnia:</span>
                <span>{student.etnia}</span>
              </div>
              <div className="flex">
                <span className="text-white/60 w-20">Dirección:</span>
                <span className="truncate">{student.direccion}</span>
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
                <span className="text-white/60 w-20">Teléfono:</span>
                <span>{student.telefono}</span>
              </div>
              <div className="flex">
                <span className="text-white/60 w-20">Acudiente:</span>
                <span>{student.acudiente}</span>
              </div>
              <div className="flex">
                <span className="text-white/60 w-20">Teléfono acudiente:</span>
                <span>{student.telefonoAcudiente}</span>
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
                <span>Nueva intervención</span>
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
            </button>
            <button
              onClick={() => setActiveTab("intervenciones")}
              className={`px-6 py-4 font-medium flex items-center transition-all ${activeTab === "intervenciones" ? "text-[#F8F0AF] border-b-2 border-[#F8F0AF] bg-gradient-to-r from-[#F8F0AF]/10 to-transparent" : "text-white/60 hover:text-[#F8F0AF] hover:bg-white/5"}`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Intervenciones
            </button>
            <button
              onClick={() => setActiveTab("notas")}
              className={`px-6 py-4 font-medium flex items-center transition-all ${activeTab === "notas" ? "text-[#F8F0AF] border-b-2 border-[#F8F0AF] bg-gradient-to-r from-[#F8F0AF]/10 to-transparent" : "text-white/60 hover:text-[#F8F0AF] hover:bg-white/5"}`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Notas y Seguimiento
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
                    Factores de Riesgo Identificados
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl transform transition-all hover:scale-105 group">
                      <div className="font-medium mb-2 flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                        Asistencia irregular
                      </div>
                      <div className="text-sm text-red-300">5 faltas en los últimos 15 días</div>
                    </div>
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl transform transition-all hover:scale-105 group">
                      <div className="font-medium mb-2 flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2 animate-pulse"></div>
                        Bajo rendimiento académico
                      </div>
                      <div className="text-sm text-yellow-300">Notas por debajo del promedio en 3 materias</div>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl transform transition-all hover:scale-105 group">
                      <div className="font-medium mb-2 flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2 animate-pulse"></div>
                        Situación socioeconómica
                      </div>
                      <div className="text-sm text-blue-300">Reporta dificultades económicas en el hogar</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#001a20]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                  <h3 className="font-medium mb-4 text-[#F8F0AF] flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Plan de Acción Recomendado
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#00232a] rounded-xl border border-white/5">
                      <div className="font-medium mb-2 text-[#F8F0AF]">Refuerzo académico</div>
                      <div className="text-sm text-white/70">Sesiones de apoyo en matemáticas y ciencias</div>
                    </div>
                    <div className="p-4 bg-[#00232a] rounded-xl border border-white/5">
                      <div className="font-medium mb-2 text-[#F8F0AF]">Acompañamiento psicológico</div>
                      <div className="text-sm text-white/70">Sesiones semanales de apoyo emocional</div>
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
                
                <div className="space-y-4">
                  {student.historialAlertas.map((alerta: Alerta, index: number) => (
                    <div key={index} className="bg-[#001a20]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/5 transform transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-white/5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">{alerta.tipo} - {alerta.fecha}</div>
                          <p className="text-white/70 mt-1">{alerta.descripcion}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${getSeverityColor(alerta.severidad)} transform transition-all hover:scale-110`}>
                          {alerta.severidad}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-white/60">
                          Registrada por: Sistema automático
                        </div>
                        <button className="text-sm text-[#F8F0AF] hover:underline flex items-center">
                          Ver detalles completos
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pestaña de Intervenciones */}
            {activeTab === "intervenciones" && (
              <div className="animate-fadeIn">
                <div className="mb-6 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-[#F8F0AF]">Intervenciones y Planes de Acción</h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-[#F8F0AF]/30 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Nueva intervención
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {student.intervenciones.map((intervencion: Intervencion, index: number) => (
                    <div key={index} className="bg-[#001a20]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/5 transform transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-medium">{intervencion.tipo}</div>
                          <div className="text-sm text-white/60 mt-1">Iniciada: {intervencion.fechaInicio}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(intervencion.estado)} transform transition-all hover:scale-110`}>
                          {intervencion.estado}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm text-white/60">Responsable:</div>
                        <div className="text-sm">{intervencion.responsable}</div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1.5 bg-[#00232a] hover:bg-[#002a32] rounded-lg text-sm transition-all transform hover:-translate-y-0.5 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Ver detalles
                        </button>
                        <button className="px-3 py-1.5 bg-[#00232a] hover:bg-[#002a32] rounded-lg text-sm transition-all transform hover:-translate-y-0.5 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Registrar avance
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pestaña de Notas y Seguimiento */}
            {activeTab === "notas" && (
              <div className="animate-fadeIn">
                <div className="mb-6 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-[#F8F0AF]">Notas y Seguimiento</h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-[#F8F0AF]/30 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Agregar nota
                  </button>
                </div>
                
                <div className="space-y-4">
                  {student.notas.map((nota: Nota, index: number) => (
                    <div key={index} className="bg-[#001a20]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/5 transform transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-white/5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-medium">{nota.autor}</div>
                          <div className="text-sm text-white/60 mt-1">{nota.fecha}</div>
                        </div>
                        <button className="text-[#F8F0AF] hover:text-[#AC4A00] transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-white/80">{nota.contenido}</p>
                    </div>
                  ))}
                  
                  <div className="bg-[#001a20]/40 backdrop-blur-sm rounded-2xl p-5 border border-dashed border-white/10 hover:border-[#F8F0AF]/30 transition-all transform hover:scale-[1.01] cursor-pointer flex items-center justify-center group">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-[#002930]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div className="text-white/60 group-hover:text-[#F8F0AF] transition-colors">Agregar nueva nota de seguimiento</div>
                    </div>
                  </div>
                </div>
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
        @keyframes progress {
          0% { width: 0%; }
          100% { width: attr(style); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-progress {
          animation: progress 1.5s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        .animate-rainbow {
          background: linear-gradient(90deg, #AC4A00, #F8F0AF, #AC4A00);
          background-size: 200% auto;
          animation: rainbow 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Reutilizamos las mismas interfaces
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

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!student) return;
    
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simular guardado
    setTimeout(() => {
      setIsSaving(false);
      router.push(`/core/students/${student?.id}`);
    }, 1500);
  };

  const handleCancel = () => {
    router.push(`/core/students/${student?.id}`);
  };

  const getRiskColor = (nivelRiesgo: string) => {
    switch (nivelRiesgo) {
      case "CRITICO": return "bg-red-600";
      case "ALTO": return "bg-orange-500";
      case "MEDIO": return "bg-yellow-500";
      case "BAJO": return "bg-green-500";
      default: return "bg-gray-500";
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header con navegación */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href={`/core/students/${student.id}`}
              className="inline-flex items-center p-3 rounded-xl bg-[#00232a]/60 hover:bg-[#00232a] border border-white/10 text-[#F8F0AF] hover:text-white transition-all transform hover:translate-x-1 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] bg-clip-text text-transparent animate-gradient">
                Editar: {student.nombre} {student.apellido}
              </h1>
              <p className="text-white/70 mt-1 flex items-center">
                <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 animate-pulse"></span>
                Modifica la información del estudiante
              </p>
            </div>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10 backdrop-blur-sm border border-white/10"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="inline-flex items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#F8F0AF]/30 disabled:opacity-50 disabled:transform-none"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#002930] mr-2"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Guardar cambios
                </>
              )}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
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
                  <h2 className="text-2xl font-bold mb-4 text-[#F8F0AF]">
                    Información Básica
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={student.nombre}
                        onChange={handleInputChange}
                        className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        name="apellido"
                        value={student.apellido}
                        onChange={handleInputChange}
                        className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={student.email}
                        onChange={handleInputChange}
                        className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Edad *
                      </label>
                      <input
                        type="number"
                        name="edad"
                        value={student.edad}
                        onChange={handleInputChange}
                        min="5"
                        max="25"
                        className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicador de riesgo (solo lectura) */}
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
                      className={`h-2.5 rounded-full ${getRiskColor(student.nivelRiesgo)}`} 
                      style={{ width: `${student.riesgoDesercion * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#001a20] p-3 rounded-xl border border-white/5">
                    <div className="text-xs text-white/60">Nivel de riesgo</div>
                    <div className="font-medium">{student.nivelRiesgo}</div>
                  </div>
                  <div className="bg-[#001a20] p-3 rounded-xl border border-white/5">
                    <div className="text-xs text-white/60">Intervenciones activas</div>
                    <div className="font-medium">{student.intervencionesActivas}</div>
                  </div>
                </div>
                <div className="text-xs text-white/40 mt-4">
                  * Los indicadores de riesgo son calculados automáticamente por el sistema
                </div>
              </div>
            </div>
          </div>

          {/* Información académica y personal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Información académica */}
            <div className="bg-[#00232a]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 transform transition-all hover:shadow-2xl hover:shadow-[#F8F0AF]/10">
              <h3 className="font-medium mb-4 text-[#F8F0AF] flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l-9 5m9-5v6" />
                </svg>
                Información Académica
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Institución Educativa *
                  </label>
                  <input
                    type="text"
                    name="institucion"
                    value={student.institucion}
                    onChange={handleInputChange}
                    className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Grado *
                    </label>
                    <select
                      name="grado"
                      value={student.grado}
                      onChange={handleInputChange}
                      className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all"
                      required
                    >
                      <option value="6°">6° Grado</option>
                      <option value="7°">7° Grado</option>
                      <option value="8°">8° Grado</option>
                      <option value="9°">9° Grado</option>
                      <option value="10°">10° Grado</option>
                      <option value="11°">11° Grado</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Género *
                    </label>
                    <select
                      name="genero"
                      value={student.genero}
                      onChange={handleInputChange}
                      className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all"
                      required
                    >
                      <option value="FEMENINO">Femenino</option>
                      <option value="MASCULINO">Masculino</option>
                      <option value="OTRO">Otro</option>
                      <option value="PREFIERO_NO_DECIR">Prefiero no decir</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Información personal */}
            <div className="bg-[#00232a]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 transform transition-all hover:shadow-2xl hover:shadow-[#F8F0AF]/10">
              <h3 className="font-medium mb-4 text-[#F8F0AF] flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Información Personal
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Etnia *
                  </label>
                  <select
                    name="etnia"
                    value={student.etnia}
                    onChange={handleInputChange}
                    className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all"
                    required
                  >
                    <option value="AFRODESCENDIENTE">Afrodescendiente</option>
                    <option value="INDIGENA">Indígena</option>
                    <option value="MESTIZO">Mestizo</option>
                    <option value="OTRO">Otro</option>
                    <option value="PREFIERO_NO_DECIR">Prefiero no decir</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Dirección *
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={student.direccion}
                    onChange={handleInputChange}
                    className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Información de contacto y acudiente */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Información de contacto */}
            <div className="bg-[#00232a]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 transform transition-all hover:shadow-2xl hover:shadow-[#F8F0AF]/10">
              <h3 className="font-medium mb-4 text-[#F8F0AF] flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Información de Contacto
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={student.telefono}
                    onChange={handleInputChange}
                    className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Información del acudiente */}
            <div className="bg-[#00232a]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 transform transition-all hover:shadow-2xl hover:shadow-[#F8F0AF]/10">
              <h3 className="font-medium mb-4 text-[#F8F0AF] flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Información del Acudiente
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Nombre del Acudiente *
                  </label>
                  <input
                    type="text"
                    name="acudiente"
                    value={student.acudiente}
                    onChange={handleInputChange}
                    className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Teléfono del Acudiente *
                  </label>
                  <input
                    type="tel"
                    name="telefonoAcudiente"
                    value={student.telefonoAcudiente}
                    onChange={handleInputChange}
                    className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Observaciones adicionales */}
          <div className="bg-[#00232a]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 transform transition-all hover:shadow-2xl hover:shadow-[#F8F0AF]/10 mb-8">
            <h3 className="font-medium mb-4 text-[#F8F0AF] flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Observaciones Adicionales
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Notas importantes (opcional)
              </label>
              <textarea
                name="observaciones"
                rows={4}
                className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all resize-none"
                placeholder="Agregue cualquier observación adicional relevante sobre el estudiante..."
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-4 pb-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10 backdrop-blur-sm border border-white/10"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#F8F0AF]/30 disabled:opacity-50 disabled:transform-none flex items-center"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#002930] mr-2"></div>
                  Guardando cambios...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Guardar cambios
                </>
              )}
            </button>
          </div>
        </form>
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
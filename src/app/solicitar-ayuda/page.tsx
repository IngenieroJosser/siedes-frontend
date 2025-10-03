"use client";

import { useState, useEffect, useMemo } from "react";
import { requestQuickHelp } from "@/services/help";
import { getInstitutions } from "@/services/institution";
import { getStudentsByInstitution } from "@/services/students";
import { Institution, Student, TipoSolicitante, MotivoSolicitud, QuickHelpRequest } from "@/lib/type";

// Interface para el error de la API
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function SolicitaAyuda() {
  const [formData, setFormData] = useState({
    tipoSolicitante: "" as "" | TipoSolicitante,
    nombre: "",
    email: "",
    telefono: "",
    institucionId: "",
    estudianteId: "",
    motivoSolicitud: "" as "" | MotivoSolicitud,
    descripcion: ""
  });

  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoadingInstitutions, setIsLoadingInstitutions] = useState(true);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar instituciones al montar el componente
  useEffect(() => {
    const loadInstitutions = async () => {
      try {
        const institutionsData = await getInstitutions();
        setInstitutions(institutionsData);
      } catch (err) {
        console.error('Error al cargar instituciones:', err);
        setError('Error al cargar la lista de instituciones');
      } finally {
        setIsLoadingInstitutions(false);
      }
    };

    loadInstitutions();
  }, []);

  // Cargar estudiantes cuando se seleccione una institución
  useEffect(() => {
    const loadStudents = async () => {
      if (!formData.institucionId) {
        setStudents([]);
        return;
      }

      try {
        setIsLoadingStudents(true);
        const studentsData = await getStudentsByInstitution(formData.institucionId);
        setStudents(studentsData);
      } catch (err) {
        console.error('Error al cargar estudiantes:', err);
        setError('Error al cargar la lista de estudiantes');
      } finally {
        setIsLoadingStudents(false);
      }
    };

    loadStudents();
  }, [formData.institucionId]);

  // Filtrar estudiantes basado en el término de búsqueda
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students;
    
    const term = searchTerm.toLowerCase();
    return students.filter(student => 
      student.nombre.toLowerCase().includes(term) ||
      student.apellido.toLowerCase().includes(term) ||
      (student.grado && student.grado.toLowerCase().includes(term)) ||
      (student.identificacion && student.identificacion.toLowerCase().includes(term))
    );
  }, [students, searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      // Si cambia la institución, limpiar el estudiante seleccionado y la búsqueda
      if (name === 'institucionId') {
        return {
          ...prev,
          [name]: value,
          estudianteId: ""
        };
      }
      return {
        ...prev,
        [name]: value
      };
    });
    
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError(null);
  };

  const handleStudentSelect = (studentId: string) => {
    setFormData(prev => ({
      ...prev,
      estudianteId: studentId
    }));
    setSearchTerm(""); // Limpiar la búsqueda después de seleccionar
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones adicionales
    if (!formData.institucionId || !formData.estudianteId) {
      setError('Por favor selecciona una institución y un estudiante');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await requestQuickHelp(formData as unknown as QuickHelpRequest);
      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error('Error al enviar solicitud:', err);
      const errorObj = err as ApiError;
      setError(
        errorObj.response?.data?.message || 
        'Error al enviar la solicitud. Por favor, intenta nuevamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#002930] via-[#00343d] to-[#001c22] text-white overflow-hidden">
        {/* Elementos de fondo animados */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Burbujas flotantes */}
          <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-[#F8F0AF]/20 rounded-full animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-[#AC4A00]/20 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-[#F8F0AF]/10 rounded-full animate-float-slow"></div>
          <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-[#AC4A00]/15 rounded-full animate-float-fast"></div>
          <div className="absolute bottom-1/3 left-1/4 w-7 h-7 bg-[#F8F0AF]/15 rounded-full animate-float-medium"></div>
          
          {/* Ondas sutiles */}
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-r from-[#F8F0AF]/5 to-[#AC4A00]/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-l from-[#F8F0AF]/5 to-[#AC4A00]/5 rounded-full blur-3xl animate-pulse-medium"></div>
        </div>
  
        <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
          <div className="max-w-lg w-full mx-auto text-center">
            {/* Tarjeta principal con efecto glassmorphism */}
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl shadow-black/20 transform transition-all duration-700 hover:scale-[1.02]">
              
              {/* Efectos de brillo */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#F8F0AF] to-transparent"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#F8F0AF] rounded-full blur-md opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-[#AC4A00] rounded-full blur-md opacity-40"></div>
  
              {/* Icono de éxito animado */}
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto relative">
                  {/* Círculo de fondo animado */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F8F0AF] to-[#AC4A00] rounded-full opacity-20 animate-ping-slow"></div>
                  
                  {/* Círculo principal */}
                  <div className="absolute inset-4 bg-gradient-to-br from-[#F8F0AF] to-[#D45A10] rounded-full flex items-center justify-center shadow-lg shadow-[#F8F0AF]/20">
                    
                    {/* Checkmark animado */}
                    <svg 
                      className="w-16 h-16 text-white drop-shadow-lg" 
                      viewBox="0 0 24 24"
                      style={{
                        filter: "drop-shadow(0 4px 8px rgba(248, 240, 175, 0.3))"
                      }}
                    >
                      <path
                        fill="currentColor"
                        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                        className="animate-draw-check"
                        style={{
                          strokeDasharray: 24,
                          strokeDashoffset: 24,
                          animation: "drawCheck 0.8s ease-in-out 0.3s forwards"
                        }}
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Partículas de celebración */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-2 h-2 bg-[#F8F0AF] rounded-full animate-celebrate`}
                      style={{
                        top: `${30 + Math.random() * 40}%`,
                        left: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.2}s`,
                        opacity: 0
                      }}
                    ></div>
                  ))}
                </div>
              </div>
  
              {/* Contenido de texto */}
              <div className="space-y-6 mb-8">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#F8F0AF] via-[#D45A10] to-[#F8F0AF] bg-clip-text text-transparent animate-gradient-x">
                  ¡Solicitud Enviada!
                </h2>
                
                <div className="space-y-4">
                  <p className="text-xl text-white/90 leading-relaxed">
                    Hola <strong className="text-[#D45A10]">{formData.nombre}</strong>, Hemos recibido tu solicitud de ayuda y estamos comprometidos contigo
                  </p>
                  
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80 text-sm">Equipo de apoyo activo</span>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/70 text-lg">
                      Nos pondremos en contacto contigo en las próximas <span className="text-[#F8F0AF] font-semibold">24-48 horas</span>
                    </p>
                  </div>
                </div>
              </div>
  
              {/* Botón de acción */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="relative w-full inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#D45A10] px-8 py-4 font-semibold text-white shadow-2xl shadow-[#AC4A00]/30 hover:shadow-[#AC4A00]/50 transition-all duration-300 group-hover:scale-105 group-hover:from-[#D45A10] group-hover:to-[#AC4A00]"
                >
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Volver al Inicio
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
  
              {/* Información adicional */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Respuesta rápida garantizada
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Apoyo confidencial
                  </div>
                </div>
              </div>
            </div>
  
            {/* Mensaje inspirador */}
            <div className="mt-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
              <p className="text-white/50 italic text-sm">
                &ldquo;Cada estudiante merece la oportunidad de brillar. Estamos aquí para asegurarnos de que nada se interponga en tu camino&rdquo;
              </p>
            </div>
          </div>
        </div>
  
        {/* Estilos de animación personalizados */}
        <style jsx>{`
          @keyframes drawCheck {
            to {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes float-medium {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-15px) scale(1.1); }
          }
          
          @keyframes float-fast {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(90deg); }
          }
          
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
          }
          
          @keyframes pulse-medium {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.05); }
          }
          
          @keyframes celebrate {
            0% { transform: translateY(0) scale(0); opacity: 1; }
            50% { transform: translateY(-20px) scale(1); opacity: 1; }
            100% { transform: translateY(-40px) scale(0); opacity: 0; }
          }
          
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes tilt {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(0.5deg); }
            75% { transform: rotate(-0.5deg); }
          }
  
          .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
          .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
          .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
          .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
          .animate-pulse-medium { animation: pulse-medium 3s ease-in-out infinite; }
          .animate-celebrate { animation: celebrate 2s ease-out forwards; }
          .animate-gradient-x { 
            background-size: 200% 200%;
            animation: gradient-x 3s ease infinite; 
          }
          .animate-tilt { animation: tilt 10s linear infinite; }
          .animate-draw-check { 
            stroke: currentColor;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#002930] text-white">
      {/* Hero de la página de solicitud */}
      <section className="relative py-32 bg-gradient-to-b from-[#002930] to-[#001c22]">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#002930] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#002930] to-transparent"></div>
        </div>
        
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Solicita <span className="text-[#F8F0AF]">ayuda especializada</span>
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Completa este formulario para recibir apoyo personalizado en la prevención de deserción escolar. 
            Nuestro equipo se pondrá en contacto contigo a la brevedad.
          </p>
        </div>
      </section>

      {/* Formulario de solicitud */}
      <section className="relative py-10 pb-20 bg-[#002930]">
        <div className="mx-auto max-w-4xl px-4">
          <div className="bg-gradient-to-b from-[#00343d] to-[#002029] rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl shadow-black/30">
            
            {/* Mensaje de error */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-200">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tipo de solicitante */}
              <div>
                <label htmlFor="tipoSolicitante" className="block text-sm font-medium text-white/90 mb-2">
                  ¿Quién solicita ayuda? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {["DOCENTE", "ESTUDIANTE", "FAMILIAR", "INSTITUCION"].map((tipo) => (
                    <div key={tipo} className="relative">
                      <input
                        className="sr-only"
                        id={`tipo-${tipo}`}
                        name="tipoSolicitante"
                        type="radio"
                        value={tipo}
                        onChange={handleChange}
                        required
                      />
                      <label
                        htmlFor={`tipo-${tipo}`}
                        className={`flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${
                          formData.tipoSolicitante === tipo
                            ? "border-[#F8F0AF] bg-[#F8F0AF]/10"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-2 ${
                          formData.tipoSolicitante === tipo 
                            ? "border-[#F8F0AF] bg-[#F8F0AF]" 
                            : "border-white/30"
                        }`}>
                          {formData.tipoSolicitante === tipo && (
                            <div className="w-2 h-2 rounded-full bg-[#002930]"></div>
                          )}
                        </div>
                        <span className="text-sm">{tipo}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Información personal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-white/90 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#001c22] border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#F8F0AF] focus:ring-1 focus:ring-[#F8F0AF] transition-colors"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#001c22] border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#F8F0AF] focus:ring-1 focus:ring-[#F8F0AF] transition-colors"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-white/90 mb-2">
                    Teléfono de contacto
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#001c22] border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#F8F0AF] focus:ring-1 focus:ring-[#F8F0AF] transition-colors"
                    placeholder="+57 XXX XXX XXXX"
                  />
                </div>
                
                {/* Institución Educativa */}
                <div>
                  <label htmlFor="institucionId" className="block text-sm font-medium text-white/90 mb-2">
                    Institución Educativa *
                  </label>
                  <select
                    id="institucionId"
                    name="institucionId"
                    value={formData.institucionId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#001c22] border border-white/10 rounded-xl text-white focus:border-[#F8F0AF] focus:ring-1 focus:ring-[#F8F0AF] transition-colors"
                    required
                    disabled={isLoadingInstitutions}
                  >
                    <option value="">Selecciona una institución</option>
                    {institutions.map((institution) => (
                      <option key={institution.id} value={institution.id}>
                        {institution.nombre}
                      </option>
                    ))}
                  </select>
                  {isLoadingInstitutions && (
                    <p className="text-xs text-white/60 mt-1">Cargando instituciones...</p>
                  )}
                </div>
              </div>

              {/* Estudiante concernido con buscador */}
              <div>
                <label htmlFor="estudianteSearch" className="block text-sm font-medium text-white/90 mb-2">
                  Estudiante concernido *
                </label>
                
                {/* Input de búsqueda */}
                <div className="relative mb-3">
                  <input
                    type="text"
                    id="estudianteSearch"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-[#001c22] border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#F8F0AF] focus:ring-1 focus:ring-[#F8F0AF] transition-colors"
                    placeholder="Buscar estudiante por nombre, apellido, grado o identificación..."
                    disabled={!formData.institucionId || isLoadingStudents}
                  />
                  <div className="absolute right-3 top-3 text-white/40">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Lista de estudiantes filtrados */}
                <div className="max-h-60 overflow-y-auto border border-white/10 rounded-xl bg-[#001c22]">
                  {!formData.institucionId ? (
                    <div className="p-4 text-center text-white/60">
                      Primero selecciona una institución
                    </div>
                  ) : isLoadingStudents ? (
                    <div className="p-4 text-center text-white/60">
                      Cargando estudiantes...
                    </div>
                  ) : filteredStudents.length === 0 ? (
                    <div className="p-4 text-center text-white/60">
                      {searchTerm ? 'No se encontraron estudiantes que coincidan con la búsqueda' : 'No se encontraron estudiantes para esta institución'}
                    </div>
                  ) : (
                    filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        className={`p-4 border-b border-white/5 cursor-pointer transition-all hover:bg-white/5 ${
                          formData.estudianteId === student.id ? 'bg-[#F8F0AF]/10 border-[#F8F0AF]/20' : ''
                        }`}
                        onClick={() => handleStudentSelect(student.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">
                              {student.nombre} {student.apellido}
                            </div>
                            <div className="text-sm text-white/60 mt-1">
                              {student.grado && `Grado: ${student.grado}`}
                              {student.identificacion && ` • ID: ${student.identificacion}`}
                            </div>
                          </div>
                          {formData.estudianteId === student.id && (
                            <div className="text-[#F8F0AF]">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Mostrar estudiante seleccionado */}
                {formData.estudianteId && (
                  <div className="mt-3 p-3 bg-[#F8F0AF]/10 border border-[#F8F0AF]/20 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#F8F0AF]">
                        Estudiante seleccionado: {
                          students.find(s => s.id === formData.estudianteId)?.nombre
                        } {
                          students.find(s => s.id === formData.estudianteId)?.apellido
                        }
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, estudianteId: "" }))}
                        className="text-white/60 hover:text-white/90"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Motivo de la solicitud */}
              <div>
                <label htmlFor="motivoSolicitud" className="block text-sm font-medium text-white/90 mb-2">
                  Motivo principal de la solicitud *
                </label>
                <select
                  id="motivoSolicitud"
                  name="motivoSolicitud"
                  value={formData.motivoSolicitud}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#001c22] border border-white/10 rounded-xl text-white focus:border-[#F8F0AF] focus:ring-1 focus:ring-[#F8F0AF] transition-colors"
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="BAJO_RENDIMIENTO">Bajo rendimiento académico</option>
                  <option value="INASISTENCIA">Inasistencia frecuente</option>
                  <option value="PROBLEMAS_FAMILIARES">Problemas familiares</option>
                  <option value="PROBLEMAS_ECONOMICOS">Problemas económicos</option>
                  <option value="ACOSO_ESCOLAR">Acoso escolar</option>
                  <option value="OTROS">Otros motivos</option>
                </select>
              </div>

              {/* Descripción detallada */}
              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium text-white/90 mb-2">
                  Describe la situación en detalle *
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-[#001c22] border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#F8F0AF] focus:ring-1 focus:ring-[#F8F0AF] transition-colors"
                  placeholder="Proporciona todos los detalles relevantes sobre la situación..."
                  required
                ></textarea>
              </div>

              {/* Botón de envío */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#D45A10] px-6 py-4 font-medium text-white shadow-lg shadow-[#AC4A00]/30 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando solicitud...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Enviar solicitud
                    </>
                  )}
                </button>
                
                <p className="text-center text-white/60 text-sm mt-4">
                  Al enviar este formulario, aceptas nuestra política de privacidad y el tratamiento de tus datos con fines de asistencia educativa.
                </p>
              </div>
            </form>
          </div>

          {/* Información de contacto alternativa */}
          <div className="mt-12 text-center">
            <p className="text-white/80 mb-4">¿Prefieres contactarnos directamente?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:siedes.uib@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-white/90 hover:text-[#F8F0AF] hover:border-[#F8F0AF]/40 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                siedes.uib@gmail.com
              </a>
              <a
                href="tel:+573232842193"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-white/90 hover:text-[#F8F0AF] hover:border-[#F8F0AF]/40 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +57 323 284 2193
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

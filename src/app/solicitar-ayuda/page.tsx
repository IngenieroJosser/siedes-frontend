"use client";

import { useState, useEffect, useMemo } from "react";
import { requestQuickHelp } from "@/services/help";
import { getInstitutions } from "@/services/institution";
import { getStudentsByInstitution } from "@/services/students";
import { Institution, Student, TipoSolicitante, MotivoSolicitud } from "@/lib/type";

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
      await requestQuickHelp(formData);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Error al enviar solicitud:', err);
      setError(
        err.response?.data?.message || 
        'Error al enviar la solicitud. Por favor, intenta nuevamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#002930] text-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-gradient-to-b from-[#00343d] to-[#002029] rounded-2xl border border-white/10 p-8 shadow-2xl shadow-black/30">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">¡Solicitud Enviada!</h2>
            <p className="text-white/80 mb-6">
              Hemos recibido tu solicitud de ayuda. Nos pondremos en contacto contigo a la brevedad.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#D45A10] px-6 py-3 font-medium text-white shadow-lg shadow-[#AC4A00]/30 hover:shadow-xl transition-all"
            >
              Volver al inicio
            </button>
          </div>
        </div>
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

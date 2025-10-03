"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Institution, CreateCompleteStudent } from "@/lib/type";
import { getInstitutions } from "@/services/institution";
import { createStudent } from "@/services/students";

// Type guard para verificar si es un error de Axios
function isAxiosError(error: unknown): error is { response?: { data?: { message?: string }, status?: number } } {
  return typeof error === 'object' && error !== null && 'response' in error;
}

export default function AddStudent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingInstitutions, setIsLoadingInstitutions] = useState(true);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  
  // Estados para notificaciones
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    details?: string;
  }>({ type: null, message: '' });

  const [formData, setFormData] = useState({
    // Información de usuario
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    
    // Información de estudiante
    edad: "",
    genero: "",
    etnia: "NINGUNA",
    grado: "",
    institucionId: "",
    
    // Contexto del estudiante
    distanciaEscuela: "",
    tiempoDesplazamiento: "",
    trabaja: false,
    horasTrabajo: "",
    ingresosFamiliares: "",
    personasHogar: "",
    apoyoFamiliar: true,
    accesoInternet: false,
    dispositivoElectronico: false,
    participacionComunitaria: false,
    conocimientosAncestrales: false,
    situacionesEspeciales: "",
    necesidadesEspeciales: ""
  });

  // Cargar instituciones al montar el componente
  useEffect(() => {
    const loadInstitutions = async () => {
      try {
        setIsLoadingInstitutions(true);
        const institutionsData = await getInstitutions();
        setInstitutions(institutionsData);
      } catch (error) {
        console.error("Error cargando instituciones:", error);
        showNotification('error', 'Error al cargar las instituciones', 'No se pudieron cargar las instituciones educativas. Por favor, recarga la página.');
        setInstitutions([]);
      } finally {
        setIsLoadingInstitutions(false);
      }
    };

    loadInstitutions();
  }, []);

  // Función para mostrar notificaciones
  const showNotification = (type: 'success' | 'error', message: string, details?: string) => {
    setNotification({ type, message, details });
    
    // Auto-ocultar después de 5 segundos para éxito, 8 segundos para error
    const timeout = type === 'success' ? 5000 : 8000;
    setTimeout(() => {
      setNotification({ type: null, message: '' });
    }, timeout);
  };

  // Función para cerrar notificación manualmente
  const closeNotification = () => {
    setNotification({ type: null, message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Preparar datos en la estructura que espera el backend
      const studentData: CreateCompleteStudent = {
        usuario: {
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          telefono: formData.telefono || undefined,
          password: formData.password,
        },
        estudiante: {
          edad: parseInt(formData.edad) || 0,
          genero: formData.genero,
          etnia: formData.etnia,
          grado: formData.grado,
          institucionId: formData.institucionId,
          riesgoDesercion: 0, // El backend lo calculará
        },
        contexto: {
          distanciaEscuela: parseFloat(formData.distanciaEscuela) || 0,
          tiempoDesplazamiento: parseInt(formData.tiempoDesplazamiento) || 0,
          trabaja: formData.trabaja,
          horasTrabajo: formData.trabaja && formData.horasTrabajo ? parseInt(formData.horasTrabajo) : undefined,
          ingresosFamiliares: formData.ingresosFamiliares ? parseInt(formData.ingresosFamiliares) : undefined,
          personasHogar: parseInt(formData.personasHogar) || 1,
          apoyoFamiliar: formData.apoyoFamiliar,
          accesoInternet: formData.accesoInternet,
          dispositivoElectronico: formData.dispositivoElectronico,
          participacionComunitaria: formData.participacionComunitaria,
          conocimientosAncestrales: formData.conocimientosAncestrales,
          situacionesEspeciales: formData.situacionesEspeciales || undefined,
          necesidadesEspeciales: formData.necesidadesEspeciales || undefined,
        }
      };

      // Enviar datos a la API
      const response = await createStudent(studentData);
      
      // Verificar si la creación fue exitosa
      if (response) {
        showNotification(
          'success', 
          '¡Estudiante creado exitosamente!', 
          'El estudiante ha sido registrado en el sistema y se ha calculado su riesgo de deserción inicial.'
        );
        
        // Limpiar formulario después de éxito
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          password: "",
          edad: "",
          genero: "",
          etnia: "NINGUNA",
          grado: "",
          institucionId: "",
          distanciaEscuela: "",
          tiempoDesplazamiento: "",
          trabaja: false,
          horasTrabajo: "",
          ingresosFamiliares: "",
          personasHogar: "",
          apoyoFamiliar: true,
          accesoInternet: false,
          dispositivoElectronico: false,
          participacionComunitaria: false,
          conocimientosAncestrales: false,
          situacionesEspeciales: "",
          necesidadesEspeciales: ""
        });

        // Redirigir después de 3 segundos
        setTimeout(() => {
          router.push("/core/students");
        }, 3000);
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }
    } catch (error) {
      console.error("Error al agregar estudiante:", error);
      
      let errorMessage = "Error al agregar estudiante. Por favor, intenta nuevamente.";
      let errorDetails = "Ha ocurrido un error inesperado durante el registro.";
      
      if (isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
        
        // Detalles específicos basados en el tipo de error
        if (error.response?.status === 409) {
          errorDetails = "El correo electrónico ya está registrado en el sistema. Por favor, utiliza otro correo.";
        } else if (error.response?.status === 404) {
          errorDetails = "La institución educativa seleccionada no existe o no está disponible.";
        } else if (error.response?.status === 400) {
          errorDetails = "Faltan campos requeridos o hay datos inválidos en el formulario.";
        } else if (error.response?.status === 500) {
          errorDetails = "Error interno del servidor. Por favor, contacta al administrador del sistema.";
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      showNotification('error', errorMessage, errorDetails);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Notificaciones */}
        {notification.type && (
          <div className={`fixed top-4 right-4 z-50 max-w-md w-full ${
            notification.type === 'success' 
              ? 'bg-green-500/20 border-green-500' 
              : 'bg-red-500/20 border-red-500'
          } border rounded-2xl backdrop-blur-sm p-6 shadow-2xl transform transition-all duration-300 animate-in slide-in-from-right-full`}>
            <div className="flex items-start">
              <div className={`flex-shrink-0 ${
                notification.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {notification.type === 'success' ? (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-4 flex-1">
                <h3 className={`text-lg font-semibold ${
                  notification.type === 'success' ? 'text-green-100' : 'text-red-100'
                }`}>
                  {notification.message}
                </h3>
                {notification.details && (
                  <p className={`mt-2 text-sm ${
                    notification.type === 'success' ? 'text-green-200' : 'text-red-200'
                  }`}>
                    {notification.details}
                  </p>
                )}
                {notification.type === 'success' && (
                  <div className="mt-4 flex items-center text-sm text-green-200">
                    <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Redirigiendo a la lista de estudiantes...
                  </div>
                )}
              </div>
              <button
                onClick={closeNotification}
                className={`flex-shrink-0 ml-4 ${
                  notification.type === 'success' 
                    ? 'text-green-300 hover:text-green-100' 
                    : 'text-red-300 hover:text-red-100'
                } transition-colors`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Progress bar para notificaciones */}
            <div className={`mt-4 h-1 rounded-full ${
              notification.type === 'success' ? 'bg-green-400' : 'bg-red-400'
            }`}>
              <div 
                className={`h-full rounded-full ${
                  notification.type === 'success' ? 'bg-green-200' : 'bg-red-200'
                } transition-all duration-5000 ease-linear`}
                style={{ 
                  width: '100%',
                  animation: `shrink ${notification.type === 'success' ? '5s' : '8s'} linear forwards` 
                }}
              />
            </div>
            
            <style jsx>{`
              @keyframes shrink {
                from { width: 100%; }
                to { width: 0%; }
              }
            `}</style>
          </div>
        )}

        {/* Header */}
        <div className="pt-16 flex items-center justify-between mb-8">
          <div>
            <Link 
              href="/core/students" 
              className="inline-flex items-center text-[#F8F0AF] hover:underline mb-2"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a estudiantes
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] bg-clip-text text-transparent">
              Agregar Nuevo Estudiante
            </h1>
            <p className="text-white/70 mt-2">
              Complete la información del estudiante para el sistema de alertas tempranas
            </p>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-white/10">
            <div className="text-sm text-white/60">Total estudiantes</div>
            <div className="text-2xl font-bold">8,247</div>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
          {/* Información Personal */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10 flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#F8F0AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Información Personal
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                  placeholder="Ingrese el nombre"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Apellido *</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                  placeholder="Ingrese el apellido"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                  placeholder="ejemplo@correo.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                  placeholder="+57 XXX XXX XXXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Contraseña *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Información Académica */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10 flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#F8F0AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9-5m9 5v6" />
              </svg>
              Información Académica
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Edad *</label>
                <input
                  type="number"
                  name="edad"
                  value={formData.edad}
                  onChange={handleChange}
                  required
                  min="5"
                  max="25"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                  placeholder="Edad del estudiante"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Género *</label>
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                >
                  <option value="">Seleccione el género</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMENINO">Femenino</option>
                  <option value="NO_BINARIO">No binario</option>
                  <option value="OTRO">Otro</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Etnia *</label>
                <select
                  name="etnia"
                  value={formData.etnia}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                >
                  <option value="NINGUNA">No se autorreconoce en grupo étnico</option>
                  <option value="AFRODESCENDIENTE">Afrocolombiano(a)</option>
                  <option value="INDIGENA">Pueblos indígenas</option>
                  <option value="ROM">Pueblo gitano (ROM)</option>
                  <option value="RAIZAL">Raizal del Archipiélago de San Andrés</option>
                  <option value="PALENQUERO">San Basilio de Palenque</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Grado *</label>
                <input
                  type="text"
                  name="grado"
                  value={formData.grado}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                  placeholder="Ej: 6° Primaria, 10° Bachillerato"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Institución Educativa *</label>
                <select
                  name="institucionId"
                  value={formData.institucionId}
                  onChange={handleChange}
                  required
                  disabled={isLoadingInstitutions}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all disabled:opacity-50"
                >
                  <option value="">
                    {isLoadingInstitutions ? "Cargando instituciones..." : "Seleccione una institución"}
                  </option>
                  {institutions.map(institution => (
                    <option key={institution.id} value={institution.id}>
                      {institution.nombre}
                    </option>
                  ))}
                </select>
                {!isLoadingInstitutions && institutions.length === 0 && (
                  <p className="text-sm text-red-400 mt-2">No se pudieron cargar las instituciones</p>
                )}
              </div>
            </div>
          </div>

          {/* Contexto del Estudiante */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10 flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#F8F0AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Contexto del Estudiante
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Distancia a la escuela (km) *</label>
                <input
                  type="number"
                  name="distanciaEscuela"
                  value={formData.distanciaEscuela}
                  onChange={handleChange}
                  required
                  step="0.1"
                  min="0"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                  placeholder="Ej: 2.5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tiempo de desplazamiento (minutos) *</label>
                <input
                  type="number"
                  name="tiempoDesplazamiento"
                  value={formData.tiempoDesplazamiento}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                  placeholder="Ej: 45"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Personas en el hogar *</label>
                <input
                  type="number"
                  name="personasHogar"
                  value={formData.personasHogar}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                  placeholder="Ej: 4"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Ingresos familiares mensuales (COP)</label>
                <input
                  type="number"
                  name="ingresosFamiliares"
                  value={formData.ingresosFamiliares}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                  placeholder="Ej: 850000"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="trabaja"
                  name="trabaja"
                  checked={formData.trabaja}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#AC4A00] bg-white/5 border-white/10 rounded focus:ring-[#F8F0AF] focus:ring-2"
                />
                <label htmlFor="trabaja" className="ml-2 text-sm">
                  ¿El estudiante trabaja?
                </label>
              </div>
              
              {formData.trabaja && (
                <div>
                  <label className="block text-sm font-medium mb-2">Horas de trabajo semanales</label>
                  <input
                    type="number"
                    name="horasTrabajo"
                    value={formData.horasTrabajo}
                    onChange={handleChange}
                    min="0"
                    max="40"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                    placeholder="Ej: 20"
                  />
                </div>
              )}
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="apoyoFamiliar"
                  name="apoyoFamiliar"
                  checked={formData.apoyoFamiliar}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#AC4A00] bg-white/5 border-white/10 rounded focus:ring-[#F8F0AF] focus:ring-2"
                />
                <label htmlFor="apoyoFamiliar" className="ml-2 text-sm">
                  ¿Recibe apoyo familiar para estudios?
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="accesoInternet"
                  name="accesoInternet"
                  checked={formData.accesoInternet}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#AC4A00] bg-white/5 border-white/10 rounded focus:ring-[#F8F0AF] focus:ring-2"
                />
                <label htmlFor="accesoInternet" className="ml-2 text-sm">
                  ¿Tiene acceso a internet en casa?
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="dispositivoElectronico"
                  name="dispositivoElectronico"
                  checked={formData.dispositivoElectronico}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#AC4A00] bg-white/5 border-white/10 rounded focus:ring-[#F8F0AF] focus:ring-2"
                />
                <label htmlFor="dispositivoElectronico" className="ml-2 text-sm">
                  ¿Tiene dispositivo electrónico para estudiar?
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="participacionComunitaria"
                  name="participacionComunitaria"
                  checked={formData.participacionComunitaria}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#AC4A00] bg-white/5 border-white/10 rounded focus:ring-[#F8F0AF] focus:ring-2"
                />
                <label htmlFor="participacionComunitaria" className="ml-2 text-sm">
                  ¿Participa en actividades comunitarias?
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="conocimientosAncestrales"
                  name="conocimientosAncestrales"
                  checked={formData.conocimientosAncestrales}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#AC4A00] bg-white/5 border-white/10 rounded focus:ring-[#F8F0AF] focus:ring-2"
                />
                <label htmlFor="conocimientosAncestrales" className="ml-2 text-sm">
                  ¿Maneja conocimientos ancestrales/culturales?
                </label>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Situaciones especiales de vulnerabilidad</label>
                <textarea
                  name="situacionesEspeciales"
                  value={formData.situacionesEspeciales}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                  placeholder="Describa situaciones especiales que afecten al estudiante..."
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Necesidades educativas especiales</label>
                <textarea
                  name="necesidadesEspeciales"
                  value={formData.necesidadesEspeciales}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                  placeholder="Describa necesidades educativas especiales..."
                />
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
            <Link
              href="/core/students"
              className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m8-10h-4M6 12H2m15.364-7.364l-2.828 2.828M7.464 17.536l-2.828 2.828m12.728 0l-2.828-2.828M7.464 6.464L4.636 3.636" />
                  </svg>
                  Procesando...
                </>
              ) : (
                "Agregar Estudiante"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

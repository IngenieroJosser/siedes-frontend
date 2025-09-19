"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Definir interfaz para las instituciones
interface Institution {
  id: string;
  nombre: string;
}

export default function AddStudent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
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

  useEffect(() => {
    // Simular carga de instituciones
    const loadInstitutions = async () => {
      // En una aplicación real, esto vendría de tu API
      const mockInstitutions: Institution[] = [
        { id: "1", nombre: "Institución Educativa San Francisco de Asís" },
        { id: "2", nombre: "Colegio Femenino La Presentación" },
        { id: "3", nombre: "Institución Educativa Carrasquilla Industrial" },
        { id: "4", nombre: "Institución Educativa Normal Superior San Pedro" },
        { id: "5", nombre: "Institución Educativa José Hilario López" }
      ];
      setInstitutions(mockInstitutions);
    };

    loadInstitutions();
  }, []);

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
      // En una aplicación real, enviarías los datos a tu API
      console.log("Datos del estudiante:", formData);
      
      // Simular envío exitoso
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Estudiante agregado exitosamente");
        router.push("/core/students");
      }, 1500);
    } catch (error) {
      console.error("Error al agregar estudiante:", error);
      setIsSubmitting(false);
      alert("Error al agregar estudiante. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white p-6">
      <div className="max-w-6xl mx-auto">
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                >
                  <option value="">Seleccione una institución</option>
                  {institutions.map(institution => (
                    <option key={institution.id} value={institution.id}>
                      {institution.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Contexto del Estudiante */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10 flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#F8F0AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 极" />
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
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Guardando..." : "Agregar Estudiante"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
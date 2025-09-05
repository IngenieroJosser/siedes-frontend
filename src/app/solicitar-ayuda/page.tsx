"use client";

import { useState } from "react";
import Link from "next/link";

export default function SolicitaAyuda() {
  const [formData, setFormData] = useState({
    tipoSolicitante: "",
    nombre: "",
    email: "",
    telefono: "",
    institucion: "",
    estudiante: "",
    motivo: "",
    descripcion: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío de formulario
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#002930] text-white">
        {/* Confirmación de envío */}
        <section className="relative py-20 bg-[#002930]">
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#F8F0AF] blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#AC4A00] blur-3xl"></div>
          </div>
          
          <div className="relative mx-auto max-w-2xl px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#F8F0AF] to-[#FFD700] text-[#002930] mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              ¡Solicitud <span className="text-[#F8F0AF]">recibida</span> con éxito!
            </h1>
            
            <p className="text-lg text-white/80 mb-8">
              Hemos recibido tu solicitud de ayuda. Nuestro equipo se pondrá en contacto contigo en un plazo máximo de 48 horas para evaluar la situación y proponer las mejores estrategias de intervención.
            </p>
            
            <div className="bg-gradient-to-r from-[#00343d] to-[#002029] rounded-2xl border border-white/10 p-6 mb-8">
              <h3 className="font-semibold text-[#F8F0AF] mb-2">¿Qué sigue ahora?</h3>
              <ul className="text-left text-white/80 space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-[#F8F0AF] mt-2 mr-3 flex-shrink-0"></div>
                  <span>Revisión de tu caso por nuestro equipo especializado</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-[#F8F0AF] mt-2 mr-3 flex-shrink-0"></div>
                  <span>Contacto personalizado para recopilar información adicional</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-[#F8F0AF] mt-2 mr-3 flex-shrink-0"></div>
                  <span>Diseño de un plan de intervención personalizado</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-[#F8F0AF] mt-2 mr-3 flex-shrink-0"></div>
                  <span>Seguimiento continuo del caso</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#D45A10] px-6 py-3 font-medium text-white shadow-lg shadow-[#AC4A00]/30 hover:shadow-xl transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Volver al inicio
              </Link>
              <button
                onClick={() => setIsSubmitted(false)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-medium text-white/90 hover:text-[#F8F0AF] hover:border-[#F8F0AF]/40 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Enviar otra solicitud
              </button>
            </div>
          </div>
        </section>
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tipo de solicitante */}
              <div>
                <label htmlFor="tipoSolicitante" className="block text-sm font-medium text-white/90 mb-2">
                  ¿Quién solicita ayuda? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {["Docente", "Familiar", "Institución"].map((tipo) => (
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
                
                <div>
                  <label htmlFor="institucion" className="block text-sm font-medium text-white/90 mb-2">
                    Institución educativa *
                  </label>
                  <input
                    type="text"
                    id="institucion"
                    name="institucion"
                    value={formData.institucion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#001c22] border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#F8F0AF] focus:ring-1 focus:ring-[#F8F0AF] transition-colors"
                    placeholder="Nombre de la institución"
                    required
                  />
                </div>
              </div>

              {/* Información del estudiante */}
              <div>
                <label htmlFor="estudiante" className="block text-sm font-medium text-white/90 mb-2">
                  Estudiante(s) concernido(s) *
                </label>
                <input
                  type="text"
                  id="estudiante"
                  name="estudiante"
                  value={formData.estudiante}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#001c22] border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#F8F0AF] focus:ring-1 focus:ring-[#F8F0AF] transition-colors"
                  placeholder="Nombre(s) del/los estudiante(s)"
                  required
                />
              </div>

              {/* Motivo de la solicitud */}
              <div>
                <label htmlFor="motivo" className="block text-sm font-medium text-white/90 mb-2">
                  Motivo principal de la solicitud *
                </label>
                <select
                  id="motivo"
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#001c22] border border-white/10 rounded-xl text-white focus:border-[#F8F0AF] focus:ring-1 focus:ring-[#F8F0AF] transition-colors"
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="bajo-rendimiento">Bajo rendimiento académico</option>
                  <option value="inasistencia">Inasistencia frecuente</option>
                  <option value="problemas-familiares">Problemas familiares</option>
                  <option value="problemas-economicos">Problemas económicos</option>
                  <option value="acoso-escolar">Acoso escolar</option>
                  <option value="otros">Otros motivos</option>
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
                href="mailto:ayuda@siedes.org"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-white/90 hover:text-[#F8F0AF] hover:border-[#F8F0AF]/40 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                ayuda@siedes.org
              </a>
              <a
                href="tel:+573001234567"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-white/90 hover:text-[#F8F0AF] hover:border-[#F8F0AF]/40 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +57 300 123 4567
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

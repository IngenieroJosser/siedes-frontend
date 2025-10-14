"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getAlertById, updateAlert } from "@/services/alerts";
import { Alert as AlertType } from "@/lib/type";

type Alert = AlertType;

export default function EditAlertPage() {
  const router = useRouter();
  const params = useParams();
  const alertId = params.id as string;

  const [alert, setAlert] = useState<Alert | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Estados del formulario
  const [formData, setFormData] = useState({
    nivelRiesgo: 'BAJO' as 'BAJO' | 'MEDIO' | 'ALTO' | 'CRITICO',
    descripcion: '',
    factores: [''],
    revisada: false,
    observaciones: '',
  });

  // Cargar alerta al montar el componente
  useEffect(() => {
    const loadAlert = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const alertData = await getAlertById(alertId);
        setAlert(alertData);
        
        // Inicializar formulario con datos de la alerta
        setFormData({
          nivelRiesgo: alertData.nivelRiesgo,
          descripcion: alertData.descripcion,
          factores: alertData.factores.length > 0 ? alertData.factores : [''],
          revisada: alertData.revisada,
          observaciones: alertData.observaciones || '',
        });
        
      } catch (error) {
        console.error("Error cargando alerta:", error);
        setError("Error al cargar la alerta. Por favor, intenta nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    if (alertId) {
      loadAlert();
    }
  }, [alertId]);

  // Manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Manejar cambios en los factores
  const handleFactorChange = (index: number, value: string) => {
    const newFactores = [...formData.factores];
    newFactores[index] = value;
    setFormData(prev => ({
      ...prev,
      factores: newFactores
    }));
  };

  // Agregar nuevo factor
  const addFactor = () => {
    setFormData(prev => ({
      ...prev,
      factores: [...prev.factores, '']
    }));
  };

  // Eliminar factor
  const removeFactor = (index: number) => {
    if (formData.factores.length > 1) {
      const newFactores = formData.factores.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        factores: newFactores
      }));
    }
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);

      // Filtrar factores vacíos
      const factoresFiltrados = formData.factores.filter(factor => factor.trim() !== '');

      if (factoresFiltrados.length === 0) {
        setError("Debe agregar al menos un factor de riesgo");
        return;
      }

      if (!formData.descripcion.trim()) {
        setError("La descripción es obligatoria");
        return;
      }

      // Preparar datos para actualización
      const updateData = {
        nivelRiesgo: formData.nivelRiesgo,
        descripcion: formData.descripcion,
        factores: factoresFiltrados,
        revisada: formData.revisada,
        observaciones: formData.observaciones || undefined,
        // El estudianteId no se puede cambiar en la edición
        estudianteId: alert?.estudianteId
      };

      await updateAlert(alertId, updateData);
      
      setSuccess("Alerta actualizada correctamente");
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push("/core/alerts");
      }, 2000);
      
    } catch (error: any) {
      console.error("Error actualizando alerta:", error);
      
      // Manejar diferentes tipos de errores
      if (error.response?.data?.message) {
        setError(`Error: ${error.response.data.message}`);
      } else if (error.message) {
        setError(`Error: ${error.message}`);
      } else {
        setError("Error al actualizar la alerta. Por favor, intenta nuevamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para obtener el color del nivel de riesgo
  const getRiskColor = (nivelRiesgo: string) => {
    switch (nivelRiesgo) {
      case "CRITICO": return "text-red-400";
      case "ALTO": return "text-orange-400";
      case "MEDIO": return "text-yellow-400";
      case "BAJO": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  // Función para obtener el color de fondo del nivel de riesgo
  const getRiskBgColor = (nivelRiesgo: string) => {
    switch (nivelRiesgo) {
      case "CRITICO": return "bg-red-500/20 border-red-500/50";
      case "ALTO": return "bg-orange-500/20 border-orange-500/50";
      case "MEDIO": return "bg-yellow-500/20 border-yellow-500/50";
      case "BAJO": return "bg-green-500/20 border-green-500/50";
      default: return "bg-gray-500/20 border-gray-500/50";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F8F0AF] mx-auto mb-4"></div>
          <p>Cargando alerta...</p>
        </div>
      </div>
    );
  }

  if (error && !alert) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/20 border border-red-500 rounded-2xl p-6 max-w-md">
            <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Error al cargar alerta</h3>
            <p className="text-white/70 mb-4">{error}</p>
            <div className="flex space-x-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#AC4A00] text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                Reintentar
              </button>
              <Link
                href="/core/alerts"
                className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
              >
                Volver a Alertas
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!alert) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-yellow-500/20 border border-yellow-500 rounded-2xl p-6 max-w-md">
            <svg className="w-12 h-12 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Alerta no encontrada</h3>
            <p className="text-white/70 mb-4">La alerta que intentas editar no existe o no tienes permisos para acceder a ella.</p>
            <Link
              href="/core/alerts"
              className="inline-flex items-center px-4 py-2 bg-[#AC4A00] text-white rounded-xl hover:opacity-90 transition-opacity"
            >
              Volver a Alertas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="pt-18 flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] bg-clip-text text-transparent">
              Editar Alerta
            </h1>
            <p className="text-white/70 mt-2">
              Actualiza la información de la alerta de deserción
            </p>
          </div>
          <Link
            href="/core/alerts"
            className="inline-flex items-center px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 mt-4 md:mt-0"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a Alertas
          </Link>
        </div>

        {/* Información del estudiante */}
        {alert.estudiante && (
          <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[#F8F0AF]">Información del Estudiante</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] flex items-center justify-center mr-3">
                  <span className="font-bold text-[#002930] text-sm">
                    {alert.estudiante.usuario.nombre?.charAt(0)}{alert.estudiante.usuario.apellido?.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium">
                    {alert.estudiante.usuario.nombre} {alert.estudiante.usuario.apellido}
                  </div>
                  <div className="text-sm text-white/60">
                    {alert.estudiante.usuario.email}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1">Edad</label>
                  <p className="text-white">{alert.edad} años</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1">Grado</label>
                  <p className="text-white">{alert.estudiante.usuario.grado}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-white/60 mb-1">Institución</label>
                  <p className="text-white">{alert.estudiante.institucion.nombre}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Información de la alerta */}
        <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#F8F0AF]">Información de la Alerta</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1">Creada el</label>
              <p className="text-white">
                {new Date(alert.creadaEn).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1">Estado actual</label>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                alert.revisada 
                  ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                  : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
              }`}>
                {alert.revisada ? "Revisada" : "Pendiente"}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1">Nivel de riesgo actual</label>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRiskBgColor(alert.nivelRiesgo)} ${getRiskColor(alert.nivelRiesgo)}`}>
                {alert.nivelRiesgo}
              </span>
            </div>
          </div>
        </div>

        {/* Formulario de edición */}
        <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
          <form onSubmit={handleSubmit}>
            {/* Alertas de éxito/error */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-300">{error}</span>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 border border-green-500 rounded-xl p-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-green-300">{success}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nivel de Riesgo */}
              <div>
                <label htmlFor="nivelRiesgo" className="block text-sm font-medium mb-2">
                  Nivel de Riesgo *
                </label>
                <select
                  id="nivelRiesgo"
                  name="nivelRiesgo"
                  value={formData.nivelRiesgo}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                  required
                >
                  <option value="BAJO">Bajo</option>
                  <option value="MEDIO">Medio</option>
                  <option value="ALTO">Alto</option>
                  <option value="CRITICO">Crítico</option>
                </select>
              </div>

              {/* Estado de Revisión */}
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="revisada"
                      checked={formData.revisada}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`block w-14 h-8 rounded-full ${formData.revisada ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${formData.revisada ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                  <div className="ml-3 text-sm font-medium">
                    Marcar como revisada
                  </div>
                </label>
              </div>
            </div>

            {/* Descripción */}
            <div className="mt-6">
              <label htmlFor="descripcion" className="block text-sm font-medium mb-2">
                Descripción *
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all resize-none"
                placeholder="Describe la situación de riesgo del estudiante..."
                required
              />
            </div>

            {/* Factores de Riesgo */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">
                Factores de Riesgo *
              </label>
              <div className="space-y-3">
                {formData.factores.map((factor, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={factor}
                      onChange={(e) => handleFactorChange(index, e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                      placeholder={`Factor de riesgo ${index + 1}`}
                    />
                    {formData.factores.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFactor(index)}
                        className="px-4 py-3 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-colors border border-red-500/30"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFactor}
                  className="inline-flex items-center px-4 py-2 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors border border-white/10"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Agregar Factor
                </button>
              </div>
            </div>

            {/* Observaciones */}
            <div className="mt-6">
              <label htmlFor="observaciones" className="block text-sm font-medium mb-2">
                Observaciones
              </label>
              <textarea
                id="observaciones"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleInputChange}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all resize-none"
                placeholder="Observaciones adicionales sobre la alerta..."
              />
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8 pt-6 border-t border-white/10">
              <Link
                href="/core/alerts"
                className="px-6 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all border border-white/10 text-center"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#002930] mr-2"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

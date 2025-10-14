"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStudents } from "@/services/students";
import { Student as StudentType } from "@/lib/type";
import { createAlert } from "@/services/alerts";

type Student = StudentType;

// Funciones auxiliares
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

// Factores de riesgo predefinidos basados en tu base de datos
const FACTORES_RIESGO = [
  "Bajo rendimiento académico",
  "Inasistencias frecuentes",
  "Problemas económicos familiares",
  "Falta de apoyo familiar",
  "Trabaja mientras estudia",
  "Larga distancia a la escuela",
  "Sin acceso a internet",
  "Sin dispositivo electrónico",
  "Problemas de salud mental",
  "Situación de acoso escolar",
  "Problemas familiares",
  "Falta de motivación",
  "Dificultades de aprendizaje",
  "Situación de desplazamiento",
  "Problemas de vivienda",
  "Falta de alimentación adecuada",
  "Problemas de transporte",
  "Situación de vulnerabilidad por etnia",
  "Falta de participación en clase",
  "Bajo promedio académico"
];

export default function CreateAlertPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Estado del formulario de alerta
  const [alertData, setAlertData] = useState({
    nivelRiesgo: "ALTO" as "CRITICO" | "ALTO" | "MEDIO" | "BAJO",
    descripcion: "",
    factores: [] as string[],
    factorInput: "",
    observaciones: ""
  });

  // Cargar estudiantes - CORREGIDO
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error("Error cargando estudiantes:", error);
        setError("Error al cargar los estudiantes. Por favor, intenta nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    loadStudents();
  }, []);

  // Filtrar estudiantes basado en la búsqueda
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students;
    return students.filter(student => 
      `${student.usuario?.nombre || ''} ${student.usuario?.apellido || ''}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.usuario?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.institucion?.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  // Manejar selección de estudiante
  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setSearchTerm("");
    
    // Auto-generar descripción basada en el estudiante seleccionado
    const nivelRiesgoActual = getNivelRiesgo(student.riesgoDesercion);
    const descripcion = `Alerta de deserción ${alertData.nivelRiesgo.toLowerCase()} para ${student.usuario.nombre} ${student.usuario.apellido} - ${student.grado} en ${student.institucion.nombre}`;
    
    setAlertData(prev => ({
      ...prev,
      descripcion
    }));
  };

  // Manejar cambios en el formulario
  const handleInputChange = (field: string, value: any) => {
    setAlertData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Manejar factores de riesgo
  const handleAddFactor = (factor: string) => {
    if (factor && !alertData.factores.includes(factor)) {
      setAlertData(prev => ({
        ...prev,
        factores: [...prev.factores, factor],
        factorInput: ""
      }));
    }
  };

  const handleRemoveFactor = (factorToRemove: string) => {
    setAlertData(prev => ({
      ...prev,
      factores: prev.factores.filter(factor => factor !== factorToRemove)
    }));
  };

  const handleAddCustomFactor = () => {
    if (alertData.factorInput.trim() && !alertData.factores.includes(alertData.factorInput.trim())) {
      setAlertData(prev => ({
        ...prev,
        factores: [...prev.factores, alertData.factorInput.trim()],
        factorInput: ""
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent) {
      setError("Debes seleccionar un estudiante");
      return;
    }
  
    setIsSubmitting(true);
    setError(null);
  
    try {
      await createAlert({
        estudianteId: selectedStudent.id,
        nivelRiesgo: alertData.nivelRiesgo,
        descripcion: alertData.descripcion,
        factores: alertData.factores,
        revisada: false // Por defecto no revisada
      });
  
      router.push("/core/alerts");
      
    } catch (error) {
      console.error("Error creando alerta:", error);
      setError("Error al crear la alerta. Por favor, intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F8F0AF] mx-auto mb-4"></div>
          <p>Cargando estudiantes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="pt-18 flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] bg-clip-text text-transparent">
              Crear Nueva Alerta
            </h1>
            <p className="text-white/70 mt-2">
              Genera una alerta manual de deserción escolar para intervención temprana
            </p>
          </div>
          <Link
            href="/core/alerts"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a Alertas
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel izquierdo - Selección de estudiante */}
          <div className="lg:col-span-1">
            <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="font-medium mb-4 text-[#F8F0AF] flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Seleccionar Estudiante
              </h3>

              {/* Búsqueda */}
              <div className="relative mb-4">
                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar estudiante..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                />
              </div>

              {/* Lista de estudiantes */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => handleSelectStudent(student)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedStudent?.id === student.id
                        ? "bg-[#F8F0AF]/10 border-[#F8F0AF]/50"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] flex items-center justify-center mr-3">
                        <span className="font-bold text-[#002930] text-sm">
                          {student.usuario.nombre.charAt(0)}{student.usuario.apellido.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">
                          {student.usuario.nombre} {student.usuario.apellido}
                        </div>
                        <div className="text-sm text-white/60">
                          {student.grado} • {student.institucion.nombre}
                        </div>
                        <div className="flex items-center mt-1">
                          <div className={`w-2 h-2 rounded-full mr-2 ${getRiskColor(student.riesgoDesercion)}`}></div>
                          <div className="text-xs text-white/60">
                            {(student.riesgoDesercion * 100).toFixed(0)}% riesgo
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Información del estudiante seleccionado */}
            {selectedStudent && (
              <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mt-6">
                <h3 className="font-medium mb-4 text-[#F8F0AF]">Estudiante Seleccionado</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] flex items-center justify-center mr-3">
                      <span className="font-bold text-[#002930]">
                        {selectedStudent.usuario.nombre.charAt(0)}{selectedStudent.usuario.apellido.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">
                        {selectedStudent.usuario.nombre} {selectedStudent.usuario.apellido}
                      </div>
                      <div className="text-sm text-white/60">{selectedStudent.usuario.email}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-white/60">Edad</div>
                      <div>{selectedStudent.edad} años</div>
                    </div>
                    <div>
                      <div className="text-white/60">Grado</div>
                      <div>{selectedStudent.grado}</div>
                    </div>
                    <div>
                      <div className="text-white/60">Género</div>
                      <div className="capitalize">{selectedStudent.genero.toLowerCase()}</div>
                    </div>
                    <div>
                      <div className="text-white/60">Etnia</div>
                      <div>{getEthnicityLabel(selectedStudent.etnia)}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-white/60">Riesgo actual</div>
                      <div className="font-medium">{getRiskText(selectedStudent.riesgoDesercion)}</div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full ${getRiskColor(selectedStudent.riesgoDesercion)}`} 
                        style={{ width: `${selectedStudent.riesgoDesercion * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Panel derecho - Formulario de alerta */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-6">
                <h3 className="font-medium mb-6 text-[#F8F0AF] flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Detalles de la Alerta
                </h3>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-200">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Nivel de Riesgo */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Nivel de Riesgo *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { value: "CRITICO", label: "Crítico", color: "bg-red-500", description: "Riesgo inminente de deserción" },
                        { value: "ALTO", label: "Alto", color: "bg-orange-500", description: "Alta probabilidad de deserción" },
                        { value: "MEDIO", label: "Medio", color: "bg-yellow-500", description: "Riesgo moderado identificado" },
                        { value: "BAJO", label: "Bajo", color: "bg-green-500", description: "Riesgo bajo pero presente" }
                      ].map((nivel) => (
                        <div
                          key={nivel.value}
                          onClick={() => handleInputChange("nivelRiesgo", nivel.value)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            alertData.nivelRiesgo === nivel.value
                              ? `${nivel.color} text-white border-transparent`
                              : "bg-white/5 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <div className="font-medium">{nivel.label}</div>
                          <div className="text-xs opacity-80 mt-1">{nivel.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Descripción */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Descripción de la Alerta *</label>
                    <textarea
                      value={alertData.descripcion}
                      onChange={(e) => handleInputChange("descripcion", e.target.value)}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                      placeholder="Describe la situación de riesgo identificada..."
                      required
                    />
                  </div>

                  {/* Factores de Riesgo */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Factores de Riesgo Identificados</label>
                    
                    {/* Factores seleccionados */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {alertData.factores.map((factor, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm"
                        >
                          {factor}
                          <button
                            type="button"
                            onClick={() => handleRemoveFactor(factor)}
                            className="ml-2 text-white/60 hover:text-white"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Factores predefinidos */}
                    <div className="mb-4">
                      <div className="text-sm text-white/60 mb-2">Factores comunes:</div>
                      <div className="flex flex-wrap gap-2">
                        {FACTORES_RIESGO.slice(0, 8).map((factor, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleAddFactor(factor)}
                            disabled={alertData.factores.includes(factor)}
                            className={`px-3 py-1 rounded-lg text-sm transition-all ${
                              alertData.factores.includes(factor)
                                ? "bg-[#F8F0AF] text-[#002930]"
                                : "bg-white/5 hover:bg-white/10 border border-white/10"
                            }`}
                          >
                            {factor}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Factor personalizado */}
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={alertData.factorInput}
                        onChange={(e) => handleInputChange("factorInput", e.target.value)}
                        placeholder="Agregar factor personalizado..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomFactor())}
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomFactor}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors border border-white/10"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Observaciones adicionales */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Observaciones Adicionales</label>
                    <textarea
                      value={alertData.observaciones}
                      onChange={(e) => handleInputChange("observaciones", e.target.value)}
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                      placeholder="Información adicional, contexto específico, recomendaciones..."
                    />
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-between items-center">
                <Link
                  href="/core/alerts"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10"
                >
                  Cancelar
                </Link>
                
                <button
                  type="submit"
                  disabled={!selectedStudent || isSubmitting}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#F8F0AF]/30 disabled:opacity-50 disabled:transform-none flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#002930] mr-2"></div>
                      Creando Alerta...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Crear Alerta
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

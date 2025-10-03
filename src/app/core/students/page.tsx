"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getStudents } from "@/services/students";
import { Student as StudentType } from "@/lib/type";

// Usar las interfaces desde tu archivo de tipos en lugar de definirlas localmente
type Usuario = StudentType['usuario'];
type Institucion = StudentType['institucion'];
type ContextoEstudiante = StudentType['contexto'];

// Si necesitas una interfaz Student local, usa el tipo importado
type Student = StudentType;

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

// Formatear fecha
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

export default function StudentsList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [institutionFilter, setInstitutionFilter] = useState("all");
  const [ethnicityFilter, setEthnicityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Obtener instituciones únicas de los estudiantes
  const institutions = useMemo(() => {
    const uniqueInstitutions = students.reduce((acc: Institucion[], student) => {
      if (student.institucion && !acc.find(inst => inst.id === student.institucion.id)) {
        acc.push(student.institucion);
      }
      return acc;
    }, []);
    
    return [
      { id: "all", nombre: "Todas las instituciones" },
      ...uniqueInstitutions
    ];
  }, [students]);

  // Obtener etnias únicas de los estudiantes
  const ethnicities = useMemo(() => {
    const uniqueEthnicities = Array.from(new Set(students.map(student => student.etnia)));
    return [
      { value: "all", label: "Todas las etnias" },
      ...uniqueEthnicities.map(etnia => ({ value: etnia, label: getEthnicityLabel(etnia) }))
    ];
  }, [students]);

  // Cargar estudiantes del backend
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const studentsData = await getStudents();
        setStudents(studentsData);
        setFilteredStudents(studentsData);
      } catch (error) {
        console.error("Error cargando estudiantes:", error);
        setError("Error al cargar los estudiantes. Por favor, intenta nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    loadStudents();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let result = students;

    // Filtro de búsqueda
    if (searchTerm) {
      result = result.filter(student => 
        `${student.usuario?.nombre || ''} ${student.usuario?.apellido || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.usuario?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.grado?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por riesgo
    if (riskFilter !== "all") {
      result = result.filter(student => {
        const nivelRiesgo = getNivelRiesgo(student.riesgoDesercion);
        return nivelRiesgo === riskFilter;
      });
    }

    // Filtro por institución
    if (institutionFilter !== "all") {
      result = result.filter(student => student.institucion?.id === institutionFilter);
    }

    // Filtro por etnia
    if (ethnicityFilter !== "all") {
      result = result.filter(student => student.etnia === ethnicityFilter);
    }

    setFilteredStudents(result);
    setCurrentPage(1);
  }, [searchTerm, riskFilter, institutionFilter, ethnicityFilter, students]);

  // Calcular páginas
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Calcular estadísticas en tiempo real
  const stats = useMemo(() => {
    const total = students.length;
    const critico = students.filter(s => getNivelRiesgo(s.riesgoDesercion) === "CRITICO").length;
    const alto = students.filter(s => getNivelRiesgo(s.riesgoDesercion) === "ALTO").length;
    const conContexto = students.filter(s => s.contexto).length;
    
    return { total, critico, alto, conContexto };
  }, [students]);

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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/20 border border-red-500 rounded-2xl p-6 max-w-md">
            <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Error al cargar estudiantes</h3>
            <p className="text-white/70 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#AC4A00] text-white rounded-xl hover:opacity-90 transition-opacity"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="pt-18 flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] bg-clip-text text-transparent">
              Gestión de Estudiantes
            </h1>
            <p className="text-white/70 mt-2">
              Administra y monitorea a los estudiantes en el sistema de alertas tempranas
            </p>
          </div>
          <Link
            href="/core/students/add"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Agregar Estudiante
          </Link>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#00232a] rounded-xl p-4 border border-white/10">
            <div className="text-sm text-white/60">Total estudiantes</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-white/10">
            <div className="text-sm text-white/60">En riesgo crítico</div>
            <div className="text-2xl font-bold text-red-400">
              {stats.critico}
            </div>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-white/10">
            <div className="text-sm text-white/60">En riesgo alto</div>
            <div className="text-2xl font-bold text-orange-400">
              {stats.alto}
            </div>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-white/10">
            <div className="text-sm text-white/60">Con contexto</div>
            <div className="text-2xl font-bold text-[#F8F0AF]">
              {stats.conContexto}
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Buscar estudiante</label>
              <div className="relative">
                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Nombre, email o grado..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nivel de riesgo</label>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
              >
                <option value="all">Todos los niveles</option>
                <option value="CRITICO">Crítico</option>
                <option value="ALTO">Alto</option>
                <option value="MEDIO">Medio</option>
                <option value="BAJO">Bajo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Institución</label>
              <select
                value={institutionFilter}
                onChange={(e) => setInstitutionFilter(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
              >
                {institutions.map((institution) => (
                  <option key={institution.id} value={institution.id}>
                    {institution.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Etnia</label>
              <select
                value={ethnicityFilter}
                onChange={(e) => setEthnicityFilter(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
              >
                {ethnicities.map((ethnicity) => (
                  <option key={ethnicity.value} value={ethnicity.value}>
                    {ethnicity.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabla de estudiantes */}
        <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-6 text-left text-sm font-medium">Estudiante</th>
                  <th className="py-4 px-6 text-left text-sm font-medium">Información</th>
                  <th className="py-4 px-6 text-left text-sm font-medium">Institución</th>
                  <th className="py-4 px-6 text-left text-sm font-medium">Riesgo</th>
                  <th className="py-4 px-6 text-left text-sm font-medium">Registro</th>
                  <th className="py-4 px-6 text-left text-sm font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((student) => (
                    <tr key={student.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] flex items-center justify-center mr-3">
                            <span className="font-bold text-[#002930]">
                              {student.usuario?.nombre?.charAt(0) || ''}{student.usuario?.apellido?.charAt(0) || ''}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">
                              {student.usuario?.nombre || ''} {student.usuario?.apellido || ''}
                            </div>
                            <div className="text-sm text-white/60">{student.usuario?.email || ''}</div>
                            {student.usuario?.telefono && (
                              <div className="text-sm text-white/60">{student.usuario.telefono}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <div>Edad: {student.edad} años</div>
                          <div>Grado: {student.grado}</div>
                          <div>{getEthnicityLabel(student.etnia)}</div>
                          <div className="capitalize">{student.genero?.toLowerCase() || ''}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <div className="font-medium">{student.institucion?.nombre || 'Sin institución'}</div>
                          <div className="text-white/60 text-xs mt-1">
                            {student.contexto ? 'Contexto completo' : 'Sin contexto'}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${getRiskColor(student.riesgoDesercion)}`}></div>
                          <div>
                            <div className="font-medium">{getRiskText(student.riesgoDesercion)}</div>
                            <div className="text-sm text-white/60">
                              {(student.riesgoDesercion * 100).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <div>{formatDate(student.creadoEn)}</div>
                          <div className="text-white/60 text-xs">
                            {student.activo ? 'Activo' : 'Inactivo'}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <Link
                            href={`/core/students/${student.id}`}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                            title="Ver detalles"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          <Link
                            href={`/core/students/edit/${student.id}`}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                            title="Editar"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button
                            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition-colors"
                            title="Eliminar"
                          >
                            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 px-6 text-center">
                      <div className="text-white/60">
                        {students.length === 0 
                          ? "No hay estudiantes registrados en el sistema" 
                          : "No se encontraron estudiantes con los filtros aplicados"
                        }
                      </div>
                      {students.length === 0 && (
                        <Link
                          href="/core/students/add"
                          className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium rounded-xl hover:opacity-90 transition-opacity"
                        >
                          Agregar Primer Estudiante
                        </Link>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {filteredStudents.length > 0 && (
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-sm text-white/60">
                Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredStudents.length)} de {filteredStudents.length} estudiantes
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-lg ${currentPage === page ? 'bg-[#AC4A00] text-white' : 'bg-white/5'}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

// Definir interfaces para los tipos de datos
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
  riesgoDesercion: number;
  nivelRiesgo: string;
  ultimaAlerta: string;
  intervencionesActivas: number;
}

export default function StudentsList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [institutionFilter, setInstitutionFilter] = useState("all");
  const [ethnicityFilter, setEthnicityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Datos de ejemplo (en una aplicación real, estos vendrían de una API)
  const mockStudents = useMemo(() => [
    {
      id: "1",
      nombre: "Ana",
      apellido: "Moreno",
      email: "ana.moreno@ejemplo.com",
      edad: 15,
      genero: "FEMENINO",
      etnia: "AFRODESCENDIENTE",
      grado: "9°",
      institucion: "Institución Educativa San Francisco de Asís",
      riesgoDesercion: 0.85,
      nivelRiesgo: "ALTO",
      ultimaAlerta: "Hace 2 días",
      intervencionesActivas: 2
    },
    {
      id: "2",
      nombre: "Carlos",
      apellido: "Mosquera",
      email: "carlos.mosquera@ejemplo.com",
      edad: 14,
      genero: "MASCULINO",
      etnia: "INDIGENA",
      grado: "8°",
      institucion: "Colegio Femenino La Presentación",
      riesgoDesercion: 0.65,
      nivelRiesgo: "MEDIO",
      ultimaAlerta: "Hace 1 semana",
      intervencionesActivas: 1
    },
    {
      id: "3",
      nombre: "María",
      apellido: "González",
      email: "maria.gonzalez@ejemplo.com",
      edad: 16,
      genero: "FEMENINO",
      etnia: "MESTIZO",
      grado: "10°",
      institucion: "Institución Educativa Carrasquilla Industrial",
      riesgoDesercion: 0.45,
      nivelRiesgo: "BAJO",
      ultimaAlerta: "Hace 3 semanas",
      intervencionesActivas: 0
    },
    {
      id: "4",
      nombre: "Javier",
      apellido: "Rodríguez",
      email: "javier.rodriguez@ejemplo.com",
      edad: 17,
      genero: "MASCULINO",
      etnia: "AFRODESCENDIENTE",
      grado: "11°",
      institucion: "Institución Educativa Normal Superior San Pedro",
      riesgoDesercion: 0.92,
      nivelRiesgo: "CRITICO",
      ultimaAlerta: "Hoy",
      intervencionesActivas: 3
    },
    {
      id: "5",
      nombre: "Lucía",
      apellido: "Pérez",
      email: "lucia.perez@ejemplo.com",
      edad: 13,
      genero: "FEMENINO",
      etnia: "RAIZAL",
      grado: "7°",
      institucion: "Institución Educativa José Hilario López",
      riesgoDesercion: 0.75,
      nivelRiesgo: "ALTO",
      ultimaAlerta: "Hace 5 días",
      intervencionesActivas: 1
    }
  ], []);

  const mockInstitutions = [
    "Todas las instituciones",
    "Institución Educativa San Francisco de Asís",
    "Colegio Femenino La Presentación",
    "Institución Educativa Carrasquilla Industrial",
    "Institución Educativa Normal Superior San Pedro",
    "Institución Educativa José Hilario López"
  ];

  useEffect(() => {
    // Simular carga de datos
    const loadData = async () => {
      setIsLoading(true);
      // Simular delay de red
      setTimeout(() => {
        setStudents(mockStudents);
        setFilteredStudents(mockStudents);
        setIsLoading(false);
      }, 1000);
    };

    loadData();
  }, [mockStudents]);

  useEffect(() => {
    // Aplicar filtros
    let result = students;

    // Filtro de búsqueda
    if (searchTerm) {
      result = result.filter(student => 
        `${student.nombre} ${student.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por riesgo
    if (riskFilter !== "all") {
      result = result.filter(student => student.nivelRiesgo === riskFilter);
    }

    // Filtro por institución
    if (institutionFilter !== "all") {
      result = result.filter(student => student.institucion === institutionFilter);
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

  const getEthnicityLabel = (etnia: string) => {
    switch (etnia) {
      case "AFRODESCENDIENTE": return "Afrodescendiente";
      case "INDIGENA": return "Indígena";
      case "ROM": return "Gitano/Rom";
      case "RAIZAL": return "Raizal";
      case "PALENQUERO": return "Palenquero";
      case "MESTIZO": return "Mestizo";
      default: return "No especificado";
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
            <div className="text-2xl font-bold">{students.length}</div>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-white/10">
            <div className="text-sm text-white/60">En riesgo crítico</div>
            <div className="text-2xl font-bold text-red-400">
              {students.filter(s => s.nivelRiesgo === "CRITICO").length}
            </div>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-white/10">
            <div className="text-sm text-white/60">Con intervenciones</div>
            <div className="text-2xl font-bold text-[#F8F0AF]">
              {students.filter(s => s.intervencionesActivas > 0).length}
            </div>
          </div>
          <div className="bg-[#00232a] rounded-xl p-4 border border-white/10">
            <div className="text-sm text-white/60">Alertas esta semana</div>
            <div className="text-2xl font-bold text-orange-400">
              {students.filter(s => s.ultimaAlerta === "Hoy" || s.ultimaAlerta.includes("días") && parseInt(s.ultimaAlerta.split(" ")[1]) < 7).length}
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
                  placeholder="Nombre or email..."
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
                {mockInstitutions.map((institution, index) => (
                  <option key={index} value={index === 0 ? "all" : institution}>
                    {institution}
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
                <option value="all">Todas las etnias</option>
                <option value="AFRODESCENDIENTE">Afrodescendiente</option>
                <option value="INDIGENA">Indígena</option>
                <option value="ROM">Gitano/Rom</option>
                <option value="RAIZAL">Raizal</option>
                <option value="PALENQUERO">Palenquero</option>
                <option value="MESTIZO">Mestizo</option>
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
                  <th className="py-4 px-6 text-left text-sm font-medium">Riesgo</th>
                  <th className="py-4 px-6 text-left text-sm font-medium">Intervenciones</th>
                  <th className="py-4 px-6 text-left text-sm font-medium">Última alerta</th>
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
                              {student.nombre.charAt(0)}{student.apellido.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">
                              {student.nombre} {student.apellido}
                            </div>
                            <div className="text-sm text-white/60">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <div>Edad: {student.edad} años</div>
                          <div>Grado: {student.grado}</div>
                          <div>{getEthnicityLabel(student.etnia)}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${getRiskColor(student.nivelRiesgo)}`}></div>
                          <div>
                            <div className="font-medium">{getRiskText(student.nivelRiesgo)}</div>
                            <div className="text-sm text-white/60">
                              {(student.riesgoDesercion * 100).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          {student.intervencionesActivas > 0 ? (
                            <span className="px-2 py-1 rounded-full text-xs bg-[#F8F0AF]/20 text-[#F8F0AF]">
                              {student.intervencionesActivas} activa(s)
                            </span>
                          ) : (
                            <span className="text-sm text-white/60">Ninguna</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          {student.ultimaAlerta}
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
                      <div className="text-white/60">No se encontraron estudiantes con los filtros aplicados</div>
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
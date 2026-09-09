"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Pencil,
  Plus,
  Search,
  UserRound,
} from "lucide-react";
import { getStudents } from "@/services/students";
import { Student as StudentType } from "@/lib/type";
import {
  CorePage,
  CorePageHeader,
  EmptyState,
  ErrorState,
  FieldLabel,
  inputClass,
  LoadingState,
  Pagination,
  Panel,
  StatCard,
  StatGrid,
} from "@/components/core/CoreUI";

type Institucion = StudentType["institucion"];
type Student = StudentType;

const getEthnicityLabel = (etnia: string) => {
  const labels: Record<string, string> = {
    AFRODESCENDIENTE: "Afrodescendiente",
    INDIGENA: "Indígena",
    ROM: "Gitano / Rrom",
    RAIZAL: "Raizal",
    PALENQUERO: "Palenquero",
    NINGUNA: "No especificado",
  };
  return labels[etnia] || etnia;
};

const getNivelRiesgo = (riesgo: number) => {
  if (riesgo >= 0.8) return "CRITICO";
  if (riesgo >= 0.6) return "ALTO";
  if (riesgo >= 0.4) return "MEDIO";
  return "BAJO";
};

const riskMeta: Record<
  string,
  { label: string; border: string; text: string; bar: string }
> = {
  CRITICO: {
    label: "Crítico",
    border: "border-[#8f2f20]/35",
    text: "text-[#8f2f20]",
    bar: "bg-[#8f2f20]",
  },
  ALTO: {
    label: "Alto",
    border: "border-[#AC4A00]/35",
    text: "text-[#AC4A00]",
    bar: "bg-[#AC4A00]",
  },
  MEDIO: {
    label: "Medio",
    border: "border-[#8b6d14]/30",
    text: "text-[#6f5710]",
    bar: "bg-[#8b6d14]",
  },
  BAJO: {
    label: "Bajo",
    border: "border-[#2f6a5f]/28",
    text: "text-[#2f6a5f]",
    bar: "bg-[#2f6a5f]",
  },
};

const formatDate = (value: string) => {
  try {
    return new Intl.DateTimeFormat("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
};

export default function StudentsList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [institutionFilter, setInstitutionFilter] = useState("all");
  const [ethnicityFilter, setEthnicityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getStudents();
      setStudents(data || []);
    } catch (err) {
      console.error("Error cargando estudiantes:", err);
      setError("No fue posible cargar el listado de estudiantes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const institutions = useMemo(() => {
    const unique = students.reduce((acc: Institucion[], student) => {
      if (
        student.institucion &&
        !acc.some((item) => item.id === student.institucion?.id)
      ) {
        acc.push(student.institucion);
      }
      return acc;
    }, []);

    return [{ id: "all", nombre: "Todas las instituciones" }, ...unique];
  }, [students]);

  const ethnicities = useMemo(() => {
    const values = Array.from(new Set(students.map((student) => student.etnia)));
    return [
      { value: "all", label: "Todas las etnias" },
      ...values.map((value) => ({
        value,
        label: getEthnicityLabel(value),
      })),
    ];
  }, [students]);

  const filteredStudents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return students.filter((student) => {
      const fullName = `${student.usuario?.nombre || ""} ${student.usuario?.apellido || ""}`.toLowerCase();
      const matchesSearch =
        !term ||
        fullName.includes(term) ||
        student.usuario?.email?.toLowerCase().includes(term) ||
        student.grado?.toLowerCase().includes(term);

      const matchesRisk =
        riskFilter === "all" ||
        getNivelRiesgo(student.riesgoDesercion) === riskFilter;

      const matchesInstitution =
        institutionFilter === "all" ||
        student.institucion?.id === institutionFilter;

      const matchesEthnicity =
        ethnicityFilter === "all" || student.etnia === ethnicityFilter;

      return (
        matchesSearch &&
        matchesRisk &&
        matchesInstitution &&
        matchesEthnicity
      );
    });
  }, [
    students,
    searchTerm,
    riskFilter,
    institutionFilter,
    ethnicityFilter,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, riskFilter, institutionFilter, ethnicityFilter]);

  const stats = useMemo(() => {
    const total = students.length;
    const critical = students.filter(
      (student) => getNivelRiesgo(student.riesgoDesercion) === "CRITICO"
    ).length;
    const high = students.filter(
      (student) => getNivelRiesgo(student.riesgoDesercion) === "ALTO"
    ).length;
    const withContext = students.filter((student) => student.contexto).length;

    return { total, critical, high, withContext };
  }, [students]);

  const first = (currentPage - 1) * itemsPerPage;
  const last = first + itemsPerPage;
  const currentItems = filteredStudents.slice(first, last);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <CorePage>
        <LoadingState label="Cargando trayectorias estudiantiles..." />
      </CorePage>
    );
  }

  if (error) {
    return (
      <CorePage>
        <ErrorState
          title="No fue posible cargar estudiantes"
          message={error}
          onRetry={loadStudents}
        />
      </CorePage>
    );
  }

  return (
    <CorePage>
      <CorePageHeader
        eyebrow="Gestión de trayectorias"
        title="Estudiantes"
        description="Consulta la información académica y contextual disponible, filtra por nivel de riesgo y abre el detalle de cada trayectoria para orientar el seguimiento."
        actions={
          <Link
            href="/core/students/add"
            className="group inline-flex min-h-11 items-center justify-between gap-6 bg-[#AC4A00] px-4 text-sm font-medium text-white transition hover:bg-[#D45A10]"
          >
            Agregar estudiante
            <Plus className="h-4 w-4" />
          </Link>
        }
      />

      <StatGrid>
        <StatCard
          label="Estudiantes registrados"
          value={stats.total}
          note="Total disponible en la consulta actual"
        />
        <StatCard
          label="Riesgo crítico"
          value={stats.critical}
          note="Requieren revisión prioritaria"
          accent="danger"
        />
        <StatCard
          label="Riesgo alto"
          value={stats.high}
          note="Casos para seguimiento cercano"
          accent="orange"
        />
        <StatCard
          label="Con contexto registrado"
          value={stats.withContext}
          note={
            stats.total
              ? `${((stats.withContext / stats.total) * 100).toFixed(0)}% del total`
              : "Sin registros"
          }
        />
      </StatGrid>

      <Panel className="mt-8" eyebrow="Segmentación" title="Filtros de consulta">
        <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <FieldLabel htmlFor="student-search">Buscar estudiante</FieldLabel>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#002930]/35" />
              <input
                id="student-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Nombre, correo o grado"
                className={inputClass + " pl-10"}
              />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="risk-filter">Nivel de riesgo</FieldLabel>
            <select
              id="risk-filter"
              value={riskFilter}
              onChange={(event) => setRiskFilter(event.target.value)}
              className={inputClass}
            >
              <option value="all">Todos los niveles</option>
              <option value="CRITICO">Crítico</option>
              <option value="ALTO">Alto</option>
              <option value="MEDIO">Medio</option>
              <option value="BAJO">Bajo</option>
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="institution-filter">Institución</FieldLabel>
            <select
              id="institution-filter"
              value={institutionFilter}
              onChange={(event) => setInstitutionFilter(event.target.value)}
              className={inputClass}
            >
              {institutions.map((institution) => (
                <option key={institution.id} value={institution.id}>
                  {institution.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="ethnicity-filter">Etnia</FieldLabel>
            <select
              id="ethnicity-filter"
              value={ethnicityFilter}
              onChange={(event) => setEthnicityFilter(event.target.value)}
              className={inputClass}
            >
              {ethnicities.map((ethnicity) => (
                <option key={ethnicity.value} value={ethnicity.value}>
                  {ethnicity.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Panel>

      <Panel
        className="mt-6 overflow-hidden"
        eyebrow="Registro operativo"
        title={`${filteredStudents.length} estudiantes encontrados`}
      >
        {currentItems.length === 0 ? (
          <EmptyState
            title={
              students.length === 0
                ? "No hay estudiantes registrados"
                : "No hay coincidencias"
            }
            description={
              students.length === 0
                ? "Registra el primer estudiante para comenzar a construir trayectorias y seguimiento."
                : "Ajusta los filtros o el término de búsqueda para ampliar los resultados."
            }
            action={
              students.length === 0 ? (
                <Link
                  href="/core/students/add"
                  className="inline-flex min-h-11 items-center gap-3 bg-[#AC4A00] px-4 text-sm font-medium text-white"
                >
                  <Plus className="h-4 w-4" />
                  Agregar estudiante
                </Link>
              ) : undefined
            }
          />
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1080px]">
                <thead className="border-b border-[#002930]/14 bg-[#002930] text-white">
                  <tr className="text-left text-[9px] uppercase tracking-[0.16em] text-white/55">
                    <th className="px-5 py-4 font-normal">Estudiante</th>
                    <th className="px-5 py-4 font-normal">Trayectoria</th>
                    <th className="px-5 py-4 font-normal">Institución</th>
                    <th className="px-5 py-4 font-normal">Riesgo</th>
                    <th className="px-5 py-4 font-normal">Registro</th>
                    <th className="px-5 py-4 font-normal">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((student) => {
                    const level = getNivelRiesgo(student.riesgoDesercion);
                    const risk = riskMeta[level];

                    return (
                      <tr
                        key={student.id}
                        className="border-b border-[#002930]/10 last:border-b-0 hover:bg-white/25"
                      >
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#002930]/15 text-sm font-medium text-[#AC4A00]">
                              {student.usuario?.nombre?.charAt(0) || ""}
                              {student.usuario?.apellido?.charAt(0) || ""}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                {student.usuario?.nombre || ""}{" "}
                                {student.usuario?.apellido || ""}
                              </p>
                              <p className="mt-1 truncate text-xs text-[#002930]/42">
                                {student.usuario?.email || "Sin correo"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5 text-sm">
                          <p>
                            {student.grado || "Sin grado"} · {student.edad} años
                          </p>
                          <p className="mt-1 text-xs text-[#002930]/45">
                            {getEthnicityLabel(student.etnia)} ·{" "}
                            {student.genero?.toLowerCase() || "sin género"}
                          </p>
                        </td>

                        <td className="px-5 py-5">
                          <p className="max-w-[230px] text-sm font-medium">
                            {student.institucion?.nombre || "Sin institución"}
                          </p>
                          <p className="mt-1 text-xs text-[#002930]/42">
                            {student.contexto
                              ? "Contexto disponible"
                              : "Contexto pendiente"}
                          </p>
                        </td>

                        <td className="px-5 py-5">
                          <div
                            className={
                              "w-[150px] border-l-2 pl-3 " + risk.border
                            }
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className={"text-sm font-medium " + risk.text}>
                                {risk.label}
                              </span>
                              <span className="text-xs text-[#002930]/48">
                                {(student.riesgoDesercion * 100).toFixed(0)}%
                              </span>
                            </div>
                            <div className="mt-2 h-px bg-[#002930]/10">
                              <div
                                className={"h-px " + risk.bar}
                                style={{
                                  width: `${Math.min(
                                    100,
                                    Math.max(0, student.riesgoDesercion * 100)
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5 text-sm">
                          <p>{formatDate(student.creadoEn)}</p>
                          <p className="mt-1 text-xs text-[#002930]/42">
                            {student.activo ? "Activo" : "Inactivo"}
                          </p>
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex gap-2">
                            <Link
                              href={`/core/students/${student.id}`}
                              className="flex h-9 w-9 items-center justify-center border border-[#002930]/14 transition hover:border-[#002930]/45"
                              title="Ver detalle"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Link
                              href={`/core/students/edit/${student.id}`}
                              className="flex h-9 w-9 items-center justify-center border border-[#002930]/14 transition hover:border-[#002930]/45"
                              title="Editar estudiante"
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-[#002930]/12 lg:hidden">
              {currentItems.map((student) => {
                const level = getNivelRiesgo(student.riesgoDesercion);
                const risk = riskMeta[level];

                return (
                  <article key={student.id} className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#002930]/15 text-[#AC4A00]">
                          <UserRound className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {student.usuario?.nombre || ""}{" "}
                            {student.usuario?.apellido || ""}
                          </p>
                          <p className="mt-1 truncate text-xs text-[#002930]/42">
                            {student.institucion?.nombre || "Sin institución"}
                          </p>
                        </div>
                      </div>

                      <span className={"text-sm font-medium " + risk.text}>
                        {risk.label}
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4 border-y border-[#002930]/10 py-4 text-xs">
                      <div>
                        <p className="text-[#002930]/38">Trayectoria</p>
                        <p className="mt-1 text-sm">
                          {student.grado || "Sin grado"} · {student.edad} años
                        </p>
                      </div>
                      <div>
                        <p className="text-[#002930]/38">Riesgo</p>
                        <p className="mt-1 text-sm">
                          {(student.riesgoDesercion * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Link
                        href={`/core/students/${student.id}`}
                        className="group inline-flex min-h-10 flex-1 items-center justify-between border border-[#002930]/14 px-3 text-xs font-medium"
                      >
                        Ver detalle
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href={`/core/students/edit/${student.id}`}
                        className="flex h-10 w-10 items-center justify-center border border-[#002930]/14"
                        aria-label="Editar estudiante"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={changePage}
              summary={`Mostrando ${first + 1}-${Math.min(
                last,
                filteredStudents.length
              )} de ${filteredStudents.length}`}
            />
          </>
        )}
      </Panel>
    </CorePage>
  );
}

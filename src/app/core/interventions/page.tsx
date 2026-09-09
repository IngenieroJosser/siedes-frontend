"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import {
  deleteIntervention,
  getInterventions,
  getInterventionsStats,
} from "@/services/interventions";
import {
  EstadoIntervencion,
  FilterInterventionsParams,
  Intervention as InterventionType,
  TipoIntervencion,
} from "@/lib/type";
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

const statusMeta: Record<
  string,
  { label: string; text: string; border: string }
> = {
  ACTIVA: {
    label: "Activa",
    text: "text-[#2f6a5f]",
    border: "border-[#2f6a5f]/30",
  },
  COMPLETADA: {
    label: "Completada",
    text: "text-[#315c75]",
    border: "border-[#315c75]/30",
  },
  SUSPENDIDA: {
    label: "Suspendida",
    text: "text-[#6f5710]",
    border: "border-[#8b6d14]/30",
  },
  CANCELADA: {
    label: "Cancelada",
    text: "text-[#8f2f20]",
    border: "border-[#8f2f20]/30",
  },
};

const typeLabels: Record<string, string> = {
  ACADEMICA: "Académica",
  PSICOLOGICA: "Psicológica",
  ECONOMICA: "Económica",
  FAMILIAR: "Familiar",
  COMUNITARIA: "Comunitaria",
  CULTURAL: "Cultural",
  TUTORIA: "Tutoría",
  OTRA: "Otra",
};

const formatDate = (value: string | null) => {
  if (!value) return "En curso";
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

export default function InterventionsPage() {
  const [interventions, setInterventions] = useState<InterventionType[]>([]);
  const [institutionSource, setInstitutionSource] = useState<InterventionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [institutionFilter, setInstitutionFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingInterventionId, setDeletingInterventionId] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    activas: 0,
    completadas: 0,
    suspendidas: 0,
    canceladas: 0,
    efectividadPromedio: 0,
  });
  const itemsPerPage = 6;

  const applyStats = (
    response: Awaited<ReturnType<typeof getInterventionsStats>>
  ) => {
    if (!response) return;
    setStats({
      total: response.total,
      activas: response.porEstado.ACTIVA?.count || 0,
      completadas: response.porEstado.COMPLETADA?.count || 0,
      suspendidas: response.porEstado.SUSPENDIDA?.count || 0,
      canceladas: response.porEstado.CANCELADA?.count || 0,
      efectividadPromedio: response.efectividadPromedio || 0,
    });
  };

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [items, statsResponse] = await Promise.all([
        getInterventions(),
        getInterventionsStats(),
      ]);

      const safeItems = items || [];
      setInterventions(safeItems);
      setInstitutionSource(safeItems);
      applyStats(statsResponse);
    } catch (err) {
      console.error("Error cargando intervenciones:", err);
      setError("No fue posible cargar las intervenciones.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const timer = window.setTimeout(async () => {
      const filters: FilterInterventionsParams = {};

      if (typeFilter !== "all") filters.tipo = typeFilter as TipoIntervencion;
      if (statusFilter !== "all") {
        filters.estado = statusFilter as EstadoIntervencion;
      }
      if (institutionFilter !== "all") {
        filters.institucionId = institutionFilter;
      }
      if (searchTerm.trim()) filters.search = searchTerm.trim();

      try {
        setIsFiltering(true);
        setError(null);
        const response = await getInterventions(filters);
        setInterventions(response || []);
      } catch (err) {
        console.error("Error filtrando intervenciones:", err);
        setError("No fue posible aplicar los filtros.");
      } finally {
        setIsFiltering(false);
      }
    }, 250);

    return () => window.clearTimeout(timer);
  }, [
    typeFilter,
    statusFilter,
    institutionFilter,
    searchTerm,
    isLoading,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, statusFilter, institutionFilter, searchTerm]);

  const institutions = useMemo(() => {
    const unique = institutionSource.reduce(
      (acc: Array<{ id: string; nombre: string }>, intervention) => {
        const institution = intervention.estudiante?.institucion;
        if (
          institution &&
          !acc.some((item) => item.id === institution.id)
        ) {
          acc.push(institution);
        }
        return acc;
      },
      []
    );

    return [{ id: "all", nombre: "Todas las instituciones" }, ...unique];
  }, [institutionSource]);

  const first = (currentPage - 1) * itemsPerPage;
  const last = first + itemsPerPage;
  const currentItems = interventions.slice(first, last);
  const totalPages = Math.ceil(interventions.length / itemsPerPage);

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteIntervention = async (interventionId: string) => {
    const confirmed = window.confirm(
      "¿Deseas eliminar esta intervención? Esta acción no se puede deshacer."
    );
    if (!confirmed) return;

    setDeletingInterventionId(interventionId);
    setError(null);

    try {
      await deleteIntervention(interventionId);
      setInterventions((current) =>
        current.filter((item) => item.id !== interventionId)
      );
      setInstitutionSource((current) =>
        current.filter((item) => item.id !== interventionId)
      );
      const statsResponse = await getInterventionsStats();
      applyStats(statsResponse);
    } catch (err) {
      console.error("Error eliminando intervención:", err);
      setError("No fue posible eliminar la intervención.");
    } finally {
      setDeletingInterventionId(null);
    }
  };

  if (isLoading) {
    return (
      <CorePage>
        <LoadingState label="Cargando intervenciones..." />
      </CorePage>
    );
  }

  if (error && institutionSource.length === 0) {
    return (
      <CorePage>
        <ErrorState
          title="No fue posible cargar las intervenciones"
          message={error}
          onRetry={loadInitialData}
        />
      </CorePage>
    );
  }

  return (
    <CorePage>
      <CorePageHeader
        eyebrow="Gestión de acompañamiento"
        title="Intervenciones"
        description="Organiza acciones de acompañamiento, consulta su estado y revisa la evidencia registrada sobre cada proceso."
        actions={
          <>
            <Link
              href="/core/students"
              className="inline-flex min-h-11 items-center border border-[#002930]/16 px-4 text-sm font-medium transition hover:border-[#002930]/45"
            >
              Ver estudiantes
            </Link>
            <Link
              href="/core/interventions/add"
              className="inline-flex min-h-11 items-center gap-3 bg-[#AC4A00] px-4 text-sm font-medium text-white transition hover:bg-[#D45A10]"
            >
              <Plus className="h-4 w-4" />
              Nueva intervención
            </Link>
          </>
        }
      />

      <StatGrid>
        <StatCard label="Intervenciones" value={stats.total} note="Total registrado" />
        <StatCard
          label="Activas"
          value={stats.activas}
          note="Procesos en seguimiento"
        />
        <StatCard
          label="Completadas"
          value={stats.completadas}
          note="Procesos cerrados"
        />
        <StatCard
          label="Efectividad registrada"
          value={`${(stats.efectividadPromedio * 100).toFixed(0)}%`}
          note="Promedio reportado por el backend"
          accent="orange"
        />
      </StatGrid>

      {error && (
        <div
          role="alert"
          className="mt-6 border-l-2 border-[#8f2f20] bg-[#F8F0AF] px-4 py-3 text-sm text-[#8f2f20]"
        >
          {error}
        </div>
      )}

      <Panel
        className="mt-8"
        eyebrow="Consulta"
        title="Filtrar intervenciones"
        actions={
          isFiltering ? (
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#AC4A00]">
              Actualizando…
            </span>
          ) : undefined
        }
      >
        <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <FieldLabel htmlFor="intervention-search">Buscar</FieldLabel>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#002930]/35" />
              <input
                id="intervention-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Estudiante o descripción"
                className={inputClass + " pl-10"}
              />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="intervention-type">Tipo</FieldLabel>
            <select
              id="intervention-type"
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className={inputClass}
            >
              <option value="all">Todos los tipos</option>
              <option value="ACADEMICA">Académica</option>
              <option value="PSICOLOGICA">Psicológica</option>
              <option value="ECONOMICA">Económica</option>
              <option value="FAMILIAR">Familiar</option>
              <option value="COMUNITARIA">Comunitaria</option>
              <option value="CULTURAL">Cultural</option>
              <option value="TUTORIA">Tutoría</option>
              <option value="OTRA">Otra</option>
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="intervention-status">Estado</FieldLabel>
            <select
              id="intervention-status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className={inputClass}
            >
              <option value="all">Todos los estados</option>
              <option value="ACTIVA">Activa</option>
              <option value="COMPLETADA">Completada</option>
              <option value="SUSPENDIDA">Suspendida</option>
              <option value="CANCELADA">Cancelada</option>
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="intervention-institution">Institución</FieldLabel>
            <select
              id="intervention-institution"
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
        </div>
      </Panel>

      <Panel
        className="mt-6 overflow-hidden"
        eyebrow="Seguimiento"
        title={`${interventions.length} intervenciones encontradas`}
      >
        {currentItems.length === 0 ? (
          <EmptyState
            title={
              institutionSource.length === 0
                ? "No hay intervenciones registradas"
                : "No hay coincidencias"
            }
            description={
              institutionSource.length === 0
                ? "Registra una intervención cuando exista una acción de acompañamiento que requiera seguimiento."
                : "Ajusta los filtros para ampliar la consulta."
            }
            action={
              institutionSource.length === 0 ? (
                <Link
                  href="/core/interventions/add"
                  className="inline-flex min-h-11 items-center gap-3 bg-[#AC4A00] px-4 text-sm font-medium text-white"
                >
                  <Plus className="h-4 w-4" />
                  Crear intervención
                </Link>
              ) : undefined
            }
          />
        ) : (
          <>
            <div className="grid gap-px bg-[#002930]/12 lg:grid-cols-2">
              {currentItems.map((intervention) => {
                const status =
                  statusMeta[intervention.estado] || statusMeta.ACTIVA;
                const effectiveness =
                  typeof intervention.efectividad === "number"
                    ? Math.max(0, Math.min(1, intervention.efectividad))
                    : null;

                return (
                  <article
                    key={intervention.id}
                    className="bg-[#F8F0AF] p-5 md:p-6"
                  >
                    <div className="flex items-start justify-between gap-4 border-b border-[#002930]/12 pb-5">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.17em] text-[#AC4A00]">
                          {typeLabels[intervention.tipo] || intervention.tipo}
                        </p>
                        <p className="mt-2 text-sm text-[#002930]/45">
                          Registrada {formatDate(intervention.creadoEn)}
                        </p>
                      </div>

                      <span
                        className={
                          "border-l-2 pl-3 text-xs font-medium " +
                          status.border +
                          " " +
                          status.text
                        }
                      >
                        {status.label}
                      </span>
                    </div>

                    <div className="mt-5">
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#002930]/14 text-[#AC4A00]">
                          <BookOpenCheck className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {intervention.estudiante?.usuario?.nombre ||
                              "Estudiante"}{" "}
                            {intervention.estudiante?.usuario?.apellido || ""}
                          </p>
                          <p className="mt-1 truncate text-xs text-[#002930]/42">
                            {intervention.estudiante?.grado || "Sin grado"} ·{" "}
                            {intervention.estudiante?.institucion?.nombre ||
                              "Sin institución"}
                          </p>
                        </div>
                      </div>

                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-[#002930]/62">
                        {intervention.descripcion}
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-px border border-[#002930]/12 bg-[#002930]/12">
                      <div className="bg-[#F8F0AF] p-3">
                        <p className="text-[9px] uppercase tracking-[0.15em] text-[#002930]/35">
                          Inicio
                        </p>
                        <p className="mt-1 text-xs">{formatDate(intervention.fechaInicio)}</p>
                      </div>
                      <div className="bg-[#F8F0AF] p-3">
                        <p className="text-[9px] uppercase tracking-[0.15em] text-[#002930]/35">
                          Fin
                        </p>
                        <p className="mt-1 text-xs">{formatDate(intervention.fechaFin || null)}</p>
                      </div>
                    </div>

                    {effectiveness !== null && (
                      <div className="mt-5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#002930]/45">
                            Efectividad registrada
                          </span>
                          <span className="font-medium">
                            {(effectiveness * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="mt-2 h-px bg-[#002930]/12">
                          <div
                            className="h-px bg-[#AC4A00]"
                            style={{ width: `${effectiveness * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {intervention.recursosUtilizados.length > 0 && (
                      <div className="mt-5">
                        <p className="text-[9px] uppercase tracking-[0.15em] text-[#002930]/35">
                          Recursos
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {intervention.recursosUtilizados
                            .slice(0, 3)
                            .map((resource) => (
                              <span
                                key={resource}
                                className="border border-[#002930]/12 px-2 py-1 text-[10px] text-[#002930]/55"
                              >
                                {resource}
                              </span>
                            ))}
                          {intervention.recursosUtilizados.length > 3 && (
                            <span className="border border-[#002930]/12 px-2 py-1 text-[10px] text-[#002930]/40">
                              +{intervention.recursosUtilizados.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#002930]/12 pt-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/core/students/${intervention.estudianteId}`}
                          className="flex h-9 w-9 items-center justify-center border border-[#002930]/14"
                          title="Ver estudiante"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/core/interventions/edit/${intervention.id}`}
                          className="flex h-9 w-9 items-center justify-center border border-[#002930]/14"
                          title="Editar intervención"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteIntervention(intervention.id)
                          }
                          disabled={
                            deletingInterventionId === intervention.id
                          }
                          className="flex h-9 w-9 items-center justify-center border border-[#8f2f20]/20 text-[#8f2f20] disabled:opacity-40"
                          title="Eliminar intervención"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <Link
                        href={`/core/interventions/${intervention.id}`}
                        className="group inline-flex min-h-9 items-center gap-4 border border-[#002930]/14 px-3 text-xs font-medium"
                      >
                        Ver detalles
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
                interventions.length
              )} de ${interventions.length}`}
            />
          </>
        )}
      </Panel>
    </CorePage>
  );
}

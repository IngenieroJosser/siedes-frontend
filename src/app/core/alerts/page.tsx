"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Check,
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import {
  deleteAlert,
  getAlerts,
  markAlertAsReviewed,
} from "@/services/alerts";
import { Alert as AlertType } from "@/lib/type";
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

type Alert = AlertType;

interface Institution {
  id: string;
  nombre: string;
}

const severityMeta: Record<
  string,
  { label: string; text: string; border: string; bar: string }
> = {
  CRITICO: {
    label: "Crítico",
    text: "text-[#8f2f20]",
    border: "border-[#8f2f20]/35",
    bar: "bg-[#8f2f20]",
  },
  ALTO: {
    label: "Alto",
    text: "text-[#AC4A00]",
    border: "border-[#AC4A00]/35",
    bar: "bg-[#AC4A00]",
  },
  MEDIO: {
    label: "Medio",
    text: "text-[#6f5710]",
    border: "border-[#8b6d14]/30",
    bar: "bg-[#8b6d14]",
  },
  BAJO: {
    label: "Bajo",
    text: "text-[#2f6a5f]",
    border: "border-[#2f6a5f]/28",
    bar: "bg-[#2f6a5f]",
  },
};

const severityWeight: Record<string, number> = {
  CRITICO: 100,
  ALTO: 75,
  MEDIO: 50,
  BAJO: 25,
};

const formatDate = (value: string) => {
  try {
    return new Intl.DateTimeFormat("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [institutionFilter, setInstitutionFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingAlertId, setDeletingAlertId] = useState<string | null>(null);
  const [reviewingAlertId, setReviewingAlertId] = useState<string | null>(null);
  const itemsPerPage = 8;

  const loadAlerts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAlerts();
      setAlerts(data || []);
    } catch (err) {
      console.error("Error cargando alertas:", err);
      setError("No fue posible cargar las alertas.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const institutions = useMemo(() => {
    const unique = alerts.reduce((acc: Institution[], alert) => {
      const institution = alert.estudiante?.institucion;
      if (
        institution &&
        !acc.some((item) => item.id === institution.id)
      ) {
        acc.push(institution);
      }
      return acc;
    }, []);

    return [{ id: "all", nombre: "Todas las instituciones" }, ...unique];
  }, [alerts]);

  const filteredAlerts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return alerts.filter((alert) => {
      const studentName = `${alert.estudiante?.usuario?.nombre || ""} ${alert.estudiante?.usuario?.apellido || ""}`.toLowerCase();

      const matchesSearch =
        !term ||
        studentName.includes(term) ||
        alert.descripcion.toLowerCase().includes(term);

      const matchesRisk =
        riskFilter === "all" || alert.nivelRiesgo === riskFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "revisada" ? alert.revisada : !alert.revisada);

      const matchesInstitution =
        institutionFilter === "all" ||
        alert.estudiante?.institucion?.id === institutionFilter;

      return (
        matchesSearch &&
        matchesRisk &&
        matchesStatus &&
        matchesInstitution
      );
    });
  }, [alerts, searchTerm, riskFilter, statusFilter, institutionFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, riskFilter, statusFilter, institutionFilter]);

  const stats = useMemo(() => {
    const total = alerts.length;
    const critical = alerts.filter(
      (alert) => alert.nivelRiesgo === "CRITICO"
    ).length;
    const high = alerts.filter(
      (alert) => alert.nivelRiesgo === "ALTO"
    ).length;
    const reviewed = alerts.filter((alert) => alert.revisada).length;

    return {
      total,
      critical,
      high,
      reviewed,
      pending: total - reviewed,
    };
  }, [alerts]);

  const first = (currentPage - 1) * itemsPerPage;
  const last = first + itemsPerPage;
  const currentItems = filteredAlerts.slice(first, last);
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMarkAsReviewed = async (alertId: string) => {
    setReviewingAlertId(alertId);
    setError(null);

    try {
      await markAlertAsReviewed(alertId);
      setAlerts((current) =>
        current.map((alert) =>
          alert.id === alertId
            ? {
                ...alert,
                revisada: true,
                fechaRevision: new Date().toISOString(),
              }
            : alert
        )
      );
    } catch (err) {
      console.error("Error marcando alerta como revisada:", err);
      setError("No fue posible marcar la alerta como revisada.");
    } finally {
      setReviewingAlertId(null);
    }
  };

  const handleDeleteAlert = async (alertId: string) => {
    const confirmed = window.confirm(
      "¿Deseas eliminar esta alerta? Esta acción no se puede deshacer."
    );
    if (!confirmed) return;

    setDeletingAlertId(alertId);
    setError(null);

    try {
      await deleteAlert(alertId);
      setAlerts((current) =>
        current.filter((alert) => alert.id !== alertId)
      );
    } catch (err) {
      console.error("Error eliminando alerta:", err);
      setError("No fue posible eliminar la alerta.");
    } finally {
      setDeletingAlertId(null);
    }
  };

  if (isLoading) {
    return (
      <CorePage>
        <LoadingState label="Cargando alertas tempranas..." />
      </CorePage>
    );
  }

  if (error && alerts.length === 0) {
    return (
      <CorePage>
        <ErrorState
          title="No fue posible cargar las alertas"
          message={error}
          onRetry={loadAlerts}
        />
      </CorePage>
    );
  }

  return (
    <CorePage>
      <CorePageHeader
        eyebrow="Sistema de alerta temprana"
        title="Alertas"
        description="Prioriza señales, revisa factores asociados y registra la gestión de cada caso. Una alerta orienta la revisión; no reemplaza el criterio humano."
        actions={
          <>
            <Link
              href="/core/students"
              className="inline-flex min-h-11 items-center gap-3 border border-[#002930]/16 px-4 text-sm font-medium transition hover:border-[#002930]/45"
            >
              Ver estudiantes
            </Link>
            <Link
              href="/core/alerts/add"
              className="inline-flex min-h-11 items-center gap-3 bg-[#AC4A00] px-4 text-sm font-medium text-white transition hover:bg-[#D45A10]"
            >
              <Plus className="h-4 w-4" />
              Crear alerta
            </Link>
          </>
        }
      />

      <StatGrid>
        <StatCard
          label="Alertas registradas"
          value={stats.total}
          note="Total disponible en el sistema"
        />
        <StatCard
          label="Críticas"
          value={stats.critical}
          note="Máxima prioridad de revisión"
          accent="danger"
        />
        <StatCard
          label="Altas"
          value={stats.high}
          note="Seguimiento cercano"
          accent="orange"
        />
        <StatCard
          label="Pendientes de revisión"
          value={stats.pending}
          note={
            stats.total
              ? `${((stats.pending / stats.total) * 100).toFixed(0)}% del total`
              : "Sin alertas"
          }
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

      <Panel className="mt-8" eyebrow="Priorización" title="Filtros de alertas">
        <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <FieldLabel htmlFor="alert-search">Buscar alerta</FieldLabel>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#002930]/35" />
              <input
                id="alert-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Estudiante o descripción"
                className={inputClass + " pl-10"}
              />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="alert-risk">Nivel de riesgo</FieldLabel>
            <select
              id="alert-risk"
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
            <FieldLabel htmlFor="alert-status">Estado</FieldLabel>
            <select
              id="alert-status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className={inputClass}
            >
              <option value="all">Todos los estados</option>
              <option value="pendiente">Pendientes</option>
              <option value="revisada">Revisadas</option>
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="alert-institution">Institución</FieldLabel>
            <select
              id="alert-institution"
              value={institutionFilter}
              onChange={(event) =>
                setInstitutionFilter(event.target.value)
              }
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
        eyebrow="Bandeja operativa"
        title={`${filteredAlerts.length} alertas encontradas`}
      >
        {currentItems.length === 0 ? (
          <EmptyState
            title={
              alerts.length === 0
                ? "No hay alertas registradas"
                : "No hay coincidencias"
            }
            description={
              alerts.length === 0
                ? "Cuando existan señales que requieran seguimiento aparecerán en esta bandeja."
                : "Ajusta los filtros para ampliar la consulta."
            }
            action={
              alerts.length === 0 ? (
                <Link
                  href="/core/alerts/add"
                  className="inline-flex min-h-11 items-center gap-3 bg-[#AC4A00] px-4 text-sm font-medium text-white"
                >
                  <Plus className="h-4 w-4" />
                  Crear alerta
                </Link>
              ) : undefined
            }
          />
        ) : (
          <>
            <div className="divide-y divide-[#002930]/12">
              {currentItems.map((alert) => {
                const severity =
                  severityMeta[alert.nivelRiesgo] || severityMeta.BAJO;
                const weight = severityWeight[alert.nivelRiesgo] || 25;
                const initials = `${alert.estudiante?.usuario?.nombre?.charAt(0) || ""}${alert.estudiante?.usuario?.apellido?.charAt(0) || ""}`;

                return (
                  <article
                    key={alert.id}
                    className="grid gap-5 p-5 transition hover:bg-white/25 xl:grid-cols-[12rem_1.25fr_.85fr_auto] xl:items-center"
                  >
                    <div className={"border-l-2 pl-4 " + severity.border}>
                      <p
                        className={
                          "text-[10px] uppercase tracking-[0.17em] " +
                          severity.text
                        }
                      >
                        {severity.label}
                      </p>
                      <p className="mt-2 text-xs text-[#002930]/45">
                        {formatDate(alert.creadaEn)}
                      </p>
                      <div className="mt-3 h-px bg-[#002930]/10">
                        <div
                          className={"h-px " + severity.bar}
                          style={{ width: `${weight}%` }}
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#002930]/14 text-xs font-medium text-[#AC4A00]">
                          {initials || "—"}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {alert.estudiante?.usuario?.nombre || "Estudiante"}{" "}
                            {alert.estudiante?.usuario?.apellido || ""}
                          </p>
                          <p className="mt-1 truncate text-xs text-[#002930]/42">
                            {alert.estudiante?.institucion?.nombre ||
                              "Sin institución"}
                          </p>
                          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#002930]/62">
                            {alert.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-[9px] uppercase tracking-[0.16em] text-[#002930]/38">
                        Factores asociados
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {alert.factores.slice(0, 3).map((factor) => (
                          <span
                            key={factor}
                            className="border border-[#002930]/12 px-2 py-1 text-[10px] text-[#002930]/58"
                          >
                            {factor}
                          </span>
                        ))}
                        {alert.factores.length > 3 && (
                          <span className="border border-[#002930]/12 px-2 py-1 text-[10px] text-[#002930]/45">
                            +{alert.factores.length - 3}
                          </span>
                        )}
                      </div>

                      <p className="mt-4 text-xs text-[#002930]/45">
                        Estado:{" "}
                        <span className="font-medium text-[#002930]">
                          {alert.revisada ? "Revisada" : "Pendiente"}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                      <Link
                        href={`/core/students/${alert.estudianteId}`}
                        className="flex h-9 w-9 items-center justify-center border border-[#002930]/14 transition hover:border-[#002930]/45"
                        title="Ver estudiante"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>

                      <Link
                        href={`/core/alerts/edit/${alert.id}`}
                        className="flex h-9 w-9 items-center justify-center border border-[#002930]/14 transition hover:border-[#002930]/45"
                        title="Editar alerta"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDeleteAlert(alert.id)}
                        disabled={deletingAlertId === alert.id}
                        className="flex h-9 w-9 items-center justify-center border border-[#8f2f20]/20 text-[#8f2f20] transition hover:border-[#8f2f20]/50 disabled:opacity-40"
                        title="Eliminar alerta"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      {!alert.revisada && (
                        <button
                          type="button"
                          onClick={() => handleMarkAsReviewed(alert.id)}
                          disabled={reviewingAlertId === alert.id}
                          className="inline-flex min-h-9 items-center gap-2 bg-[#002930] px-3 text-xs font-medium text-white transition hover:bg-[#00343d] disabled:opacity-50"
                        >
                          <Check className="h-3.5 w-3.5" />
                          {reviewingAlertId === alert.id
                            ? "Procesando..."
                            : "Marcar revisada"}
                        </button>
                      )}
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
                filteredAlerts.length
              )} de ${filteredAlerts.length}`}
            />
          </>
        )}
      </Panel>

      <div className="mt-6 flex items-start gap-3 border-l-2 border-[#AC4A00] bg-[#F8F0AF] px-4 py-4">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#AC4A00]" />
        <p className="text-xs leading-5 text-[#002930]/52">
          La prioridad mostrada sirve para organizar la revisión. Cualquier
          intervención debe considerar información adicional, contexto y criterio
          profesional.
        </p>
      </div>
    </CorePage>
  );
}

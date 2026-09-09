"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Download,
  ShieldCheck,
  Users,
} from "lucide-react";
import { getAlerts } from "@/services/alerts";
import { getStudents } from "@/services/students";
import { Alert, Student } from "@/lib/type";
import {
  CorePage,
  CorePageHeader,
  ErrorState,
  FieldLabel,
  inputClass,
  LoadingState,
  Panel,
  StatCard,
  StatGrid,
} from "@/components/core/CoreUI";

interface Institution {
  id: string;
  nombre: string;
}

const ethnicityLabels: Record<string, string> = {
  AFRODESCENDIENTE: "Afrodescendiente",
  INDIGENA: "Indígena",
  ROM: "Gitano / Rrom",
  RAIZAL: "Raizal",
  PALENQUERO: "Palenquero",
  NINGUNA: "No especificado",
};

const riskOrder = ["CRITICO", "ALTO", "MEDIO", "BAJO"] as const;
const riskLabels: Record<(typeof riskOrder)[number], string> = {
  CRITICO: "Crítico",
  ALTO: "Alto",
  MEDIO: "Medio",
  BAJO: "Bajo",
};

const formatShortDate = (value: string) => {
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

export default function ReportsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    )
      .toISOString()
      .split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });
  const [institutionFilter, setInstitutionFilter] = useState("all");

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [alertsData, studentsData] = await Promise.all([
        getAlerts(),
        getStudents(),
      ]);
      setAlerts(alertsData || []);
      setStudents(studentsData || []);
    } catch (err) {
      console.error("Error cargando reportes:", err);
      setError("No fue posible cargar la información de reportes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const institutions = useMemo(() => {
    const unique = students.reduce((acc: Institution[], student) => {
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

  const filteredData = useMemo(() => {
    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);
    end.setHours(23, 59, 59, 999);

    let filteredAlerts = alerts.filter((alert) => {
      const date = new Date(alert.creadaEn);
      return date >= start && date <= end;
    });

    let filteredStudents = students;

    if (institutionFilter !== "all") {
      filteredAlerts = filteredAlerts.filter(
        (alert) =>
          alert.estudiante?.institucion?.id === institutionFilter
      );
      filteredStudents = filteredStudents.filter(
        (student) => student.institucion?.id === institutionFilter
      );
    }

    return { alerts: filteredAlerts, students: filteredStudents };
  }, [alerts, students, dateRange, institutionFilter]);

  const stats = useMemo(() => {
    const totalAlerts = filteredData.alerts.length;
    const reviewed = filteredData.alerts.filter(
      (alert) => alert.revisada
    ).length;
    const critical = filteredData.alerts.filter(
      (alert) => alert.nivelRiesgo === "CRITICO"
    ).length;
    const high = filteredData.alerts.filter(
      (alert) => alert.nivelRiesgo === "ALTO"
    ).length;

    const studentIds = new Set(
      filteredData.alerts.map((alert) => alert.estudianteId)
    );

    const ethnicities = filteredData.students.reduce(
      (acc, student) => {
        acc[student.etnia] = (acc[student.etnia] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const factors = filteredData.alerts.reduce(
      (acc, alert) => {
        alert.factores.forEach((factor) => {
          acc[factor] = (acc[factor] || 0) + 1;
        });
        return acc;
      },
      {} as Record<string, number>
    );

    const topFactors = Object.entries(factors)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6);

    const riskDistribution = riskOrder.map((risk) => ({
      risk,
      label: riskLabels[risk],
      value: filteredData.alerts.filter(
        (alert) => alert.nivelRiesgo === risk
      ).length,
    }));

    const ethnicityDistribution = Object.entries(ethnicities)
      .map(([key, value]) => ({
        key,
        label: ethnicityLabels[key] || key,
        value,
      }))
      .sort((a, b) => b.value - a.value);

    return {
      totalAlerts,
      reviewed,
      pending: totalAlerts - reviewed,
      critical,
      high,
      totalStudents: filteredData.students.length,
      studentsWithAlert: studentIds.size,
      topFactors,
      riskDistribution,
      ethnicityDistribution,
    };
  }, [filteredData]);

  const reviewRate =
    stats.totalAlerts > 0
      ? (stats.reviewed / stats.totalAlerts) * 100
      : 0;

  const alertCoverage =
    stats.totalStudents > 0
      ? (stats.studentsWithAlert / stats.totalStudents) * 100
      : 0;

  const exportCsv = () => {
    const rows = [
      [
        "alerta_id",
        "fecha",
        "nivel_riesgo",
        "revisada",
        "estudiante_id",
        "estudiante",
        "institucion",
        "descripcion",
        "factores",
      ],
      ...filteredData.alerts.map((alert) => [
        alert.id,
        alert.creadaEn,
        alert.nivelRiesgo,
        alert.revisada ? "SI" : "NO",
        alert.estudianteId,
        `${alert.estudiante?.usuario?.nombre || ""} ${alert.estudiante?.usuario?.apellido || ""}`.trim(),
        alert.estudiante?.institucion?.nombre || "",
        alert.descripcion,
        alert.factores.join(" | "),
      ]),
    ];

    const escape = (value: unknown) =>
      '"' + String(value ?? "").replace(/"/g, '""') + '"';

    const csv = rows
      .map((row) => row.map(escape).join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `siedes-alertas-${dateRange.start}-${dateRange.end}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <CorePage>
        <LoadingState label="Construyendo reporte operativo..." />
      </CorePage>
    );
  }

  if (error) {
    return (
      <CorePage>
        <ErrorState
          title="No fue posible cargar los reportes"
          message={error}
          onRetry={loadData}
        />
      </CorePage>
    );
  }

  return (
    <CorePage>
      <CorePageHeader
        eyebrow="Lectura operativa"
        title="Reportes"
        description="Analiza la actividad registrada en SIEDES por período e institución. Las cifras describen los datos disponibles y no deben interpretarse como causalidad."
        actions={
          <>
            <Link
              href="/core/alerts"
              className="group inline-flex min-h-11 items-center gap-5 border border-[#002930]/16 px-4 text-sm font-medium transition hover:border-[#002930]/45"
            >
              Ver alertas
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              type="button"
              onClick={exportCsv}
              disabled={filteredData.alerts.length === 0}
              className="inline-flex min-h-11 items-center gap-3 bg-[#AC4A00] px-4 text-sm font-medium text-white transition hover:bg-[#D45A10] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Download className="h-4 w-4" />
              Exportar CSV
            </button>
          </>
        }
      />

      <Panel className="mt-8" eyebrow="Período" title="Parámetros del reporte">
        <div className="grid gap-4 p-5 md:grid-cols-3">
          <div>
            <FieldLabel htmlFor="report-start">Fecha inicial</FieldLabel>
            <input
              id="report-start"
              type="date"
              value={dateRange.start}
              onChange={(event) =>
                setDateRange((current) => ({
                  ...current,
                  start: event.target.value,
                }))
              }
              className={inputClass}
            />
          </div>

          <div>
            <FieldLabel htmlFor="report-end">Fecha final</FieldLabel>
            <input
              id="report-end"
              type="date"
              value={dateRange.end}
              onChange={(event) =>
                setDateRange((current) => ({
                  ...current,
                  end: event.target.value,
                }))
              }
              className={inputClass}
            />
          </div>

          <div>
            <FieldLabel htmlFor="report-institution">Institución</FieldLabel>
            <select
              id="report-institution"
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

      <StatGrid>
        <StatCard
          label="Alertas en el período"
          value={stats.totalAlerts}
          note="Registros que cumplen los filtros"
        />
        <StatCard
          label="Críticas"
          value={stats.critical}
          note="Prioridad crítica"
          accent="danger"
        />
        <StatCard
          label="Estudiantes consultados"
          value={stats.totalStudents}
          note={`${stats.studentsWithAlert} con al menos una alerta`}
        />
        <StatCard
          label="Alertas revisadas"
          value={`${reviewRate.toFixed(1)}%`}
          note={`${stats.reviewed} revisadas · ${stats.pending} pendientes`}
          accent="orange"
        />
      </StatGrid>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <Panel eyebrow="Severidad" title="Distribución de niveles de riesgo">
          <div className="space-y-5 p-5">
            {stats.riskDistribution.map((item) => {
              const percent =
                stats.totalAlerts > 0
                  ? (item.value / stats.totalAlerts) * 100
                  : 0;

              return (
                <MetricBar
                  key={item.risk}
                  label={item.label}
                  value={item.value}
                  percent={percent}
                />
              );
            })}
          </div>
        </Panel>

        <Panel eyebrow="Gestión" title="Estado de revisión">
          <div className="p-5">
            <div className="grid gap-px border border-[#002930]/12 bg-[#002930]/12 sm:grid-cols-2">
              <div className="bg-[#F8F0AF] p-5">
                <p className="text-[9px] uppercase tracking-[0.16em] text-[#002930]/40">
                  Revisadas
                </p>
                <p className="mt-3 text-3xl font-medium tracking-[-0.04em]">
                  {stats.reviewed}
                </p>
              </div>
              <div className="bg-[#F8F0AF] p-5">
                <p className="text-[9px] uppercase tracking-[0.16em] text-[#002930]/40">
                  Pendientes
                </p>
                <p className="mt-3 text-3xl font-medium tracking-[-0.04em] text-[#AC4A00]">
                  {stats.pending}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#002930]/45">Porcentaje revisado</span>
                <span className="font-medium">{reviewRate.toFixed(1)}%</span>
              </div>
              <div className="mt-2 h-px bg-[#002930]/12">
                <div
                  className="h-px bg-[#002930]"
                  style={{ width: `${Math.min(100, reviewRate)}%` }}
                />
              </div>
            </div>

            <div className="mt-8 border-l-2 border-[#AC4A00] pl-4">
              <p className="text-xs leading-5 text-[#002930]/50">
                El porcentaje de revisión describe actividad operativa. No mide
                por sí solo la efectividad de las intervenciones.
              </p>
            </div>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <Panel eyebrow="Factores" title="Factores reportados con mayor frecuencia">
          <div className="p-5">
            {stats.topFactors.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#002930]/45">
                No hay factores registrados para el período seleccionado.
              </p>
            ) : (
              <div className="space-y-5">
                {stats.topFactors.map(([factor, count]) => (
                  <MetricBar
                    key={factor}
                    label={factor}
                    value={count}
                    percent={
                      stats.totalAlerts > 0
                        ? (count / stats.totalAlerts) * 100
                        : 0
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </Panel>

        <Panel eyebrow="Contexto" title="Distribución étnica de estudiantes">
          <div className="p-5">
            {stats.ethnicityDistribution.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#002930]/45">
                No hay estudiantes para los filtros seleccionados.
              </p>
            ) : (
              <div className="space-y-5">
                {stats.ethnicityDistribution.map((item) => (
                  <MetricBar
                    key={item.key}
                    label={item.label}
                    value={item.value}
                    percent={
                      stats.totalStudents > 0
                        ? (item.value / stats.totalStudents) * 100
                        : 0
                    }
                  />
                ))}
              </div>
            )}

            <div className="mt-7 flex items-start gap-3 border-t border-[#002930]/12 pt-5">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#AC4A00]" />
              <p className="text-xs leading-5 text-[#002930]/48">
                Esta distribución sirve para comprender cobertura y auditar
                equidad. No debe interpretarse como factor causal de deserción.
              </p>
            </div>
          </div>
        </Panel>
      </div>

      <Panel className="mt-6" eyebrow="Resumen" title="Lectura del período">
        <div className="grid gap-px bg-[#002930]/12 md:grid-cols-2 xl:grid-cols-4">
          <SummaryItem
            icon={<BarChart3 className="h-4 w-4" />}
            label="Período"
            value={`${formatShortDate(dateRange.start)} — ${formatShortDate(
              dateRange.end
            )}`}
          />
          <SummaryItem
            icon={<Users className="h-4 w-4" />}
            label="Institución"
            value={
              institutionFilter === "all"
                ? "Todas"
                : institutions.find(
                    (item) => item.id === institutionFilter
                  )?.nombre || "Seleccionada"
            }
          />
          <SummaryItem
            icon={<AlertTriangle className="h-4 w-4" />}
            label="Cobertura con alerta"
            value={`${alertCoverage.toFixed(1)}%`}
          />
          <SummaryItem
            icon={<ShieldCheck className="h-4 w-4" />}
            label="Revisión"
            value={`${reviewRate.toFixed(1)}%`}
          />
        </div>
      </Panel>
    </CorePage>
  );
}

function MetricBar({
  label,
  value,
  percent,
}: {
  label: string;
  value: number;
  percent: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="truncate text-[#002930]/65">{label}</span>
        <span className="shrink-0 font-medium text-[#002930]">{value}</span>
      </div>
      <div className="mt-2 h-px bg-[#002930]/12">
        <div
          className="h-px bg-[#AC4A00]"
          style={{
            width: `${Math.max(0, Math.min(100, percent))}%`,
          }}
        />
      </div>
      <p className="mt-1 text-[10px] text-[#002930]/35">
        {percent.toFixed(1)}%
      </p>
    </div>
  );
}

function SummaryItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#F8F0AF] p-5">
      <div className="text-[#AC4A00]">{icon}</div>
      <p className="mt-6 text-[9px] uppercase tracking-[0.16em] text-[#002930]/38">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium leading-6 text-[#002930]">
        {value}
      </p>
    </div>
  );
}

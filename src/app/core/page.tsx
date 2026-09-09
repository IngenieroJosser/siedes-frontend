"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  GraduationCap,
  Users,
} from "lucide-react";
import { getStudents } from "@/services/students";
import { getAlerts } from "@/services/alerts";
import { getInterventions } from "@/services/interventions";
import {
  Alert,
  Intervention,
  Student,
} from "@/lib/type";
import {
  CorePage,
  CorePageHeader,
  ErrorState,
  InlineNotice,
  LoadingState,
  Panel,
  StatCard,
  StatGrid,
} from "@/components/core/CoreUI";

const riskOrder = ["CRITICO", "ALTO", "MEDIO", "BAJO"] as const;

const riskLabels: Record<(typeof riskOrder)[number], string> = {
  CRITICO: "Crítico",
  ALTO: "Alto",
  MEDIO: "Medio",
  BAJO: "Bajo",
};

const riskWeights: Record<(typeof riskOrder)[number], number> = {
  CRITICO: 4,
  ALTO: 3,
  MEDIO: 2,
  BAJO: 1,
};

const getRiskLevel = (
  risk: number
): (typeof riskOrder)[number] => {
  if (risk >= 0.8) return "CRITICO";
  if (risk >= 0.6) return "ALTO";
  if (risk >= 0.4) return "MEDIO";
  return "BAJO";
};

const formatDate = (value?: string) => {
  if (!value) return "Sin fecha";
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

export default function DashboardCore() {
  const [students, setStudents] = useState<Student[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fatalError, setFatalError] = useState<string | null>(null);
  const [partialError, setPartialError] = useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setIsLoading(true);
      setFatalError(null);
      setPartialError(null);

      const [studentsResult, alertsResult, interventionsResult] =
        await Promise.allSettled([
          getStudents(),
          getAlerts(),
          getInterventions(),
        ]);

      const failed: string[] = [];

      if (studentsResult.status === "fulfilled") {
        setStudents(studentsResult.value || []);
      } else {
        failed.push("estudiantes");
        setStudents([]);
      }

      if (alertsResult.status === "fulfilled") {
        setAlerts(alertsResult.value || []);
      } else {
        failed.push("alertas");
        setAlerts([]);
      }

      if (interventionsResult.status === "fulfilled") {
        setInterventions(interventionsResult.value || []);
      } else {
        failed.push("intervenciones");
        setInterventions([]);
      }

      if (failed.length === 3) {
        setFatalError(
          "No fue posible cargar la información operativa del sistema."
        );
      } else if (failed.length > 0) {
        setPartialError(
          `La vista se cargó parcialmente. No fue posible consultar: ${failed.join(
            ", "
          )}.`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const metrics = useMemo(() => {
    const highRisk = students.filter(
      (student) => student.riesgoDesercion >= 0.6
    ).length;

    const criticalRisk = students.filter(
      (student) => student.riesgoDesercion >= 0.8
    ).length;

    const pendingAlerts = alerts.filter((alert) => !alert.revisada).length;
    const reviewedAlerts = alerts.filter((alert) => alert.revisada).length;

    const activeInterventions = interventions.filter(
      (intervention) => intervention.estado === "ACTIVA"
    ).length;

    const completedInterventions = interventions.filter(
      (intervention) => intervention.estado === "COMPLETADA"
    ).length;

    const reviewRate =
      alerts.length > 0 ? (reviewedAlerts / alerts.length) * 100 : 0;

    return {
      totalStudents: students.length,
      highRisk,
      criticalRisk,
      pendingAlerts,
      reviewedAlerts,
      activeInterventions,
      completedInterventions,
      reviewRate,
    };
  }, [students, alerts, interventions]);

  const riskDistribution = useMemo(
    () =>
      riskOrder.map((level) => {
        const value = students.filter(
          (student) => getRiskLevel(student.riesgoDesercion) === level
        ).length;

        return {
          level,
          label: riskLabels[level],
          value,
          percent:
            students.length > 0 ? (value / students.length) * 100 : 0,
        };
      }),
    [students]
  );

  const institutionDistribution = useMemo(() => {
    const counts = students.reduce((acc, student) => {
      const id = student.institucion?.id || "sin-institucion";
      const name =
        student.institucion?.nombre || "Sin institución asignada";

      if (!acc[id]) {
        acc[id] = { name, count: 0 };
      }
      acc[id].count += 1;
      return acc;
    }, {} as Record<string, { name: string; count: number }>);

    return Object.entries(counts)
      .map(([id, item]) => ({ id, ...item }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [students]);

  const priorityAlerts = useMemo(
    () =>
      [...alerts]
        .sort((a, b) => {
          const riskDelta =
            riskWeights[b.nivelRiesgo] - riskWeights[a.nivelRiesgo];

          if (riskDelta !== 0) return riskDelta;

          return (
            new Date(b.creadaEn).getTime() -
            new Date(a.creadaEn).getTime()
          );
        })
        .slice(0, 5),
    [alerts]
  );

  const recentInterventions = useMemo(
    () =>
      [...interventions]
        .sort(
          (a, b) =>
            new Date(b.creadoEn).getTime() -
            new Date(a.creadoEn).getTime()
        )
        .slice(0, 4),
    [interventions]
  );

  if (isLoading) {
    return (
      <CorePage>
        <LoadingState label="Cargando centro operativo..." />
      </CorePage>
    );
  }

  if (fatalError) {
    return (
      <CorePage>
        <ErrorState
          title="No fue posible cargar el centro operativo"
          message={fatalError}
          onRetry={loadDashboard}
        />
      </CorePage>
    );
  }

  return (
    <CorePage>
      <CorePageHeader
        eyebrow="Centro operativo"
        title="Resumen"
        description="Una lectura consolidada de estudiantes, señales e intervenciones registradas en SIEDES. Los indicadores describen el estado actual del sistema; no representan tendencias históricas cuando no existe una serie temporal disponible."
        actions={
          <>
            <Link
              href="/core/students/add"
              className="inline-flex min-h-11 items-center gap-3 border border-[#002930]/16 px-4 text-sm font-medium transition hover:border-[#002930]/45"
            >
              <Users className="h-4 w-4" />
              Agregar estudiante
            </Link>
            <Link
              href="/core/alerts/add"
              className="inline-flex min-h-11 items-center gap-3 bg-[#AC4A00] px-4 text-sm font-medium text-white transition hover:bg-[#D45A10]"
            >
              <AlertTriangle className="h-4 w-4" />
              Crear alerta
            </Link>
          </>
        }
      />

      {partialError && (
        <div className="mt-6">
          <InlineNotice tone="warning" title="Información parcial">
            {partialError}
          </InlineNotice>
        </div>
      )}

      <StatGrid>
        <StatCard
          label="Estudiantes"
          value={metrics.totalStudents}
          note="Trayectorias disponibles"
        />
        <StatCard
          label="Riesgo alto o crítico"
          value={metrics.highRisk}
          note={`${metrics.criticalRisk} en nivel crítico`}
          accent="orange"
        />
        <StatCard
          label="Alertas pendientes"
          value={metrics.pendingAlerts}
          note={`${metrics.reviewedAlerts} revisadas`}
          accent={metrics.pendingAlerts > 0 ? "orange" : "neutral"}
        />
        <StatCard
          label="Intervenciones activas"
          value={metrics.activeInterventions}
          note={`${metrics.completedInterventions} completadas`}
        />
      </StatGrid>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
        <Panel
          eyebrow="Prioridad"
          title="Alertas que requieren atención"
          actions={
            <Link
              href="/core/alerts"
              className="group inline-flex items-center gap-4 text-xs font-medium text-[#AC4A00]"
            >
              Ver todas
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        >
          {priorityAlerts.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <CheckCircle2 className="mx-auto h-6 w-6 text-[#2f6a5f]" />
              <p className="mt-4 text-sm font-medium">Sin alertas registradas</p>
              <p className="mt-2 text-xs leading-5 text-[#002930]/45">
                Cuando exista una señal registrada aparecerá en esta bandeja.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#002930]/12">
              {priorityAlerts.map((alert) => (
                <Link
                  key={alert.id}
                  href={`/core/alerts/edit/${alert.id}`}
                  className="group grid gap-4 px-5 py-5 transition hover:bg-white/25 sm:grid-cols-[7rem_1fr_auto] sm:items-center"
                >
                  <div>
                    <p
                      className={
                        "text-[10px] uppercase tracking-[0.16em] " +
                        (alert.nivelRiesgo === "CRITICO"
                          ? "text-[#8f2f20]"
                          : alert.nivelRiesgo === "ALTO"
                            ? "text-[#AC4A00]"
                            : "text-[#002930]/48")
                      }
                    >
                      {riskLabels[alert.nivelRiesgo]}
                    </p>
                    <p className="mt-1 text-[10px] text-[#002930]/35">
                      {formatDate(alert.creadaEn)}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {alert.estudiante?.usuario?.nombre || "Estudiante"}{" "}
                      {alert.estudiante?.usuario?.apellido || ""}
                    </p>
                    <p className="mt-1 line-clamp-1 text-xs text-[#002930]/45">
                      {alert.descripcion}
                    </p>
                  </div>

                  <span
                    className={
                      "text-[10px] uppercase tracking-[0.13em] " +
                      (alert.revisada
                        ? "text-[#2f6a5f]"
                        : "text-[#AC4A00]")
                    }
                  >
                    {alert.revisada ? "Revisada" : "Pendiente"}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Panel>

        <Panel eyebrow="Riesgo" title="Distribución actual de estudiantes">
          <div className="space-y-5 p-5">
            {riskDistribution.map((item) => (
              <MetricBar
                key={item.level}
                label={item.label}
                value={item.value}
                percent={item.percent}
              />
            ))}

            <div className="border-t border-[#002930]/12 pt-5">
              <p className="text-xs leading-5 text-[#002930]/45">
                La distribución utiliza el valor de riesgo actualmente almacenado
                en cada trayectoria. No representa incidencia real de deserción.
              </p>
            </div>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
        <Panel
          eyebrow="Cobertura"
          title="Estudiantes por institución"
          actions={
            <Link
              href="/core/students"
              className="group inline-flex items-center gap-4 text-xs font-medium text-[#AC4A00]"
            >
              Explorar estudiantes
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        >
          <div className="p-5">
            {institutionDistribution.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#002930]/45">
                No hay instituciones representadas en los estudiantes actuales.
              </p>
            ) : (
              <div className="space-y-5">
                {institutionDistribution.map((item) => (
                  <MetricBar
                    key={item.id}
                    label={item.name}
                    value={item.count}
                    percent={
                      students.length > 0
                        ? (item.count / students.length) * 100
                        : 0
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </Panel>

        <Panel
          eyebrow="Acompañamiento"
          title="Intervenciones recientes"
          actions={
            <Link
              href="/core/interventions"
              className="group inline-flex items-center gap-4 text-xs font-medium text-[#AC4A00]"
            >
              Ver intervenciones
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        >
          {recentInterventions.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <BookOpenCheck className="mx-auto h-6 w-6 text-[#002930]/28" />
              <p className="mt-4 text-sm font-medium">
                Sin intervenciones registradas
              </p>
              <p className="mt-2 text-xs leading-5 text-[#002930]/45">
                Los procesos de acompañamiento aparecerán aquí cuando existan
                registros disponibles.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#002930]/12">
              {recentInterventions.map((intervention) => (
                <article
                  key={intervention.id}
                  className="grid gap-4 px-5 py-5 sm:grid-cols-[8rem_1fr_auto] sm:items-center"
                >
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-[#AC4A00]">
                      {intervention.tipo}
                    </p>
                    <p className="mt-1 text-[10px] text-[#002930]/35">
                      {formatDate(intervention.creadoEn)}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {intervention.estudiante?.usuario?.nombre ||
                        "Estudiante"}{" "}
                      {intervention.estudiante?.usuario?.apellido || ""}
                    </p>
                    <p className="mt-1 line-clamp-1 text-xs text-[#002930]/45">
                      {intervention.descripcion}
                    </p>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.13em] text-[#002930]/45">
                    {intervention.estado}
                  </span>
                </article>
              ))}
            </div>
          )}
        </Panel>
      </div>

      <Panel className="mt-6" eyebrow="Operación" title="Accesos principales">
        <div className="grid gap-px bg-[#002930]/12 md:grid-cols-2 xl:grid-cols-5">
          <ActionCard
            icon={<Users className="h-5 w-5" />}
            index="01"
            title="Estudiantes"
            description="Consultar trayectorias y contexto."
            href="/core/students"
          />
          <ActionCard
            icon={<AlertTriangle className="h-5 w-5" />}
            index="02"
            title="Alertas"
            description="Priorizar y documentar señales."
            href="/core/alerts"
          />
          <ActionCard
            icon={<BookOpenCheck className="h-5 w-5" />}
            index="03"
            title="Intervenciones"
            description="Dar seguimiento al acompañamiento."
            href="/core/interventions"
          />
          <ActionCard
            icon={<BrainCircuit className="h-5 w-5" />}
            index="04"
            title="IA predictiva"
            description="Consultar modelo, estado y trazabilidad."
            href="/core/ai"
          />
          <ActionCard
            icon={<GraduationCap className="h-5 w-5" />}
            index="05"
            title="Reportes"
            description="Analizar los registros disponibles."
            href="/core/reports"
          />
        </div>
      </Panel>

      <div className="mt-6">
        <InlineNotice tone="info" title="Lectura responsable">
          El dashboard organiza información operativa registrada en SIEDES. Una
          señal de riesgo debe ser contrastada con contexto, evidencia y criterio
          humano antes de definir cualquier acción de acompañamiento.
        </InlineNotice>
      </div>
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
      <div className="flex items-center justify-between gap-5">
        <span className="truncate text-sm text-[#002930]/62">{label}</span>
        <span className="shrink-0 text-sm font-medium">{value}</span>
      </div>
      <div className="mt-2 h-px bg-[#002930]/12">
        <div
          className="h-px bg-[#AC4A00]"
          style={{
            width: `${Math.max(0, Math.min(100, percent))}%`,
          }}
        />
      </div>
      <p className="mt-1 text-[10px] text-[#002930]/32">
        {percent.toFixed(1)}%
      </p>
    </div>
  );
}

function ActionCard({
  icon,
  index,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  index: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-[#F8F0AF] p-5 transition hover:bg-white/30"
    >
      <div className="flex items-center justify-between">
        <span className="text-[#AC4A00]">{icon}</span>
        <span className="text-[9px] tracking-[0.16em] text-[#002930]/28">
          {index}
        </span>
      </div>
      <h3 className="mt-7 text-lg font-medium tracking-[-0.025em]">
        {title}
      </h3>
      <p className="mt-2 text-xs leading-5 text-[#002930]/45">
        {description}
      </p>
      <div className="mt-5 flex items-center gap-3 text-xs font-medium text-[#002930]">
        Abrir
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

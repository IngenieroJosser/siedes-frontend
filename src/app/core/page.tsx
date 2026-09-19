"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  ChevronDown,
  ChevronRight,
  MapPin,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
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
import {
  getAiDashboard,
  getAiHealth,
  getAiModel,
  getInstitutionRisks,
} from "@/services/predictions";
import {
  AiDashboardSummary,
  AiHealthResponse,
  AiInstitutionRisk,
  AiModelMetadata,
} from "@/lib/prediction-types";

const riskMeta = {
  ALTO: {
    label: "Alto",
    text: "text-[#8f2f20]",
    bar: "bg-[#8f2f20]",
  },
  MEDIO: {
    label: "Medio",
    text: "text-[#8b6d14]",
    bar: "bg-[#8b6d14]",
  },
  BAJO: {
    label: "Bajo",
    text: "text-[#2f6a5f]",
    bar: "bg-[#2f6a5f]",
  },
} as const;

function pct(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `${(value * 100).toFixed(1)}%`;
}

function modelName(model: AiModelMetadata | null) {
  if (!model) return "No informado";
  return String(
    model.algorithm || model.model_name || model.model_type || "No informado"
  );
}

function formatZoneLabel(zone: string) {
  const normalized = zone.trim().toUpperCase();
  if (normalized === "URBANA") return "Urbana";
  if (normalized === "RURAL") return "Rural";
  if (normalized === "MIXTA") return "Mixta";
  return zone;
}

export default function DashboardCore() {
  const [health, setHealth] = useState<AiHealthResponse | null>(null);
  const [summary, setSummary] = useState<AiDashboardSummary | null>(null);
  const [model, setModel] = useState<AiModelMetadata | null>(null);
  const [institutions, setInstitutions] = useState<AiInstitutionRisk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const healthData = await getAiHealth();
      setHealth(healthData);

      if (!healthData.ready) {
        setSummary(null);
        setModel(null);
        setInstitutions([]);
        setError(
          "SIEDES AI está disponible, pero el modelo institucional todavía no está listo. Verifica el modelo productivo y las predicciones antes de consultar el resumen."
        );
        return;
      }

      const [summaryResult, modelResult, institutionsResult] =
        await Promise.allSettled([
          getAiDashboard(),
          getAiModel(),
          getInstitutionRisks(),
        ]);

      if (summaryResult.status === "fulfilled") {
        setSummary(summaryResult.value);
      }

      if (modelResult.status === "fulfilled") {
        setModel(modelResult.value);
      }

      if (institutionsResult.status === "fulfilled") {
        setInstitutions(institutionsResult.value || []);
      }

      const failed = [summaryResult, modelResult, institutionsResult].filter(
        (item) => item.status === "rejected"
      ).length;

      if (failed === 3) {
        setError(
          "La IA está disponible, pero el backend no pudo consultar la información protegida del modelo. Revisa la API key entre NestJS y SIEDES AI."
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible consultar el panorama institucional."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const priorityInstitutions = useMemo(
    () =>
      [...institutions]
        .sort((a, b) => (b.prob_alto ?? 0) - (a.prob_alto ?? 0))
        .slice(0, 6),
    [institutions]
  );

  const riskDistribution = useMemo(() => {
    const counts = summary?.riesgo ?? {
      ALTO: institutions.filter((item) => item.riesgo_predicho === "ALTO").length,
      MEDIO: institutions.filter((item) => item.riesgo_predicho === "MEDIO").length,
      BAJO: institutions.filter((item) => item.riesgo_predicho === "BAJO").length,
    };

    const total = Math.max(
      1,
      counts.ALTO + counts.MEDIO + counts.BAJO
    );

    return (["ALTO", "MEDIO", "BAJO"] as const).map((level) => ({
      level,
      value: counts[level],
      percent: (counts[level] / total) * 100,
    }));
  }, [summary, institutions]);

  const zones = useMemo(() => {
    const grouped = institutions.reduce(
      (acc, item) => {
        const zone = item.zona_institucion || "Sin zona informada";
        if (!acc[zone]) {
          acc[zone] = { total: 0, high: 0, institutions: [] };
        }
        acc[zone].total += 1;
        if (item.riesgo_predicho === "ALTO") acc[zone].high += 1;
        acc[zone].institutions.push(item);
        return acc;
      },
      {} as Record<
        string,
        { total: number; high: number; institutions: AiInstitutionRisk[] }
      >
    );

    return Object.entries(grouped)
      .map(([zone, values]) => ({
        zone,
        ...values,
        institutions: [...values.institutions].sort(
          (a, b) => (b.prob_alto ?? 0) - (a.prob_alto ?? 0)
        ),
      }))
      .sort((a, b) => b.total - a.total);
  }, [institutions]);

  if (loading) {
    return (
      <CorePage>
        <LoadingState label="Construyendo panorama institucional..." />
      </CorePage>
    );
  }

  if (error && institutions.length === 0 && !summary) {
    return (
      <CorePage>
        <ErrorState
          title="No fue posible construir el resumen institucional"
          message={error}
          onRetry={load}
        />
      </CorePage>
    );
  }

  const totalInstitutions = summary?.instituciones ?? institutions.length;
  const highCount = summary?.riesgo.ALTO ?? 0;
  const mediumCount = summary?.riesgo.MEDIO ?? 0;
  const lowCount = summary?.riesgo.BAJO ?? 0;
  const modelVersion = String(model?.model_version || model?.version || "—");

  return (
    <CorePage>
      <CorePageHeader
        eyebrow="Panorama institucional"
        title="Resumen"
        description="Lectura ejecutiva del riesgo de deserción por institución educativa. El resumen concentra el estado del modelo, la distribución de riesgo y las instituciones que requieren mayor revisión en el último corte disponible."
        actions={
          <button
            type="button"
            onClick={load}
            className="inline-flex min-h-11 items-center gap-3 border border-[#002930]/16 px-4 text-sm font-medium transition hover:border-[#002930]/45"
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </button>
        }
      />

      <div className="mt-6">
        <InlineNotice tone="warning" title="Alcance del piloto">
          La lectura actual se apoya en datos sintéticos para validar arquitectura,
          metodología y experiencia de uso. No constituye evidencia real sobre una
          institución educativa ni reemplaza la revisión humana.
        </InlineNotice>
      </div>

      <StatGrid>
        <StatCard
          label="Instituciones evaluadas"
          value={totalInstitutions}
          note={`Último corte ${summary?.anio ?? "—"}`}
        />
        <StatCard
          label="Riesgo alto"
          value={highCount}
          note="Instituciones que requieren revisión prioritaria"
          accent="danger"
        />
        <StatCard
          label="Riesgo medio"
          value={mediumCount}
          note="Instituciones bajo seguimiento"
          accent="orange"
        />
        <StatCard
          label="Probabilidad ALTO media"
          value={pct(summary?.prob_alto_media)}
          note="Promedio institucional del último corte"
        />
      </StatGrid>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.08fr_.92fr]">
        <Panel eyebrow="Prioridad" title="Instituciones con mayor P(ALTO)">
          {priorityInstitutions.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <Building2 className="mx-auto h-6 w-6 text-[#002930]/28" />
              <p className="mt-4 text-sm font-medium">
                No hay predicciones institucionales disponibles
              </p>
              <p className="mt-2 text-xs leading-5 text-[#002930]/45">
                Cuando el modelo publique un corte, las instituciones priorizadas
                aparecerán en este bloque.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#002930]/10">
              {priorityInstitutions.map((item, index) => {
                const meta = riskMeta[item.riesgo_predicho];
                return (
                  <Link
                    key={item.codigo_dane_establecimiento}
                    href={`/core/ai/${encodeURIComponent(
                      item.codigo_dane_establecimiento
                    )}`}
                    className="group grid gap-4 px-5 py-5 transition hover:bg-white/25 sm:grid-cols-[2.2rem_1fr_6rem_5rem_auto] sm:items-center"
                  >
                    <span className="text-xs text-[#002930]/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {item.institucion_educativa}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.13em] text-[#002930]/36">
                        {item.zona_institucion || "Zona no informada"} · Corte {item.anio}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.13em] text-[#002930]/35">
                        Nivel
                      </p>
                      <p className={`mt-1 text-sm font-medium ${meta.text}`}>
                        {meta.label}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.13em] text-[#002930]/35">
                        P(ALTO)
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {pct(item.prob_alto)}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#AC4A00] transition-transform group-hover:translate-x-1" />
                  </Link>
                );
              })}
            </div>
          )}
        </Panel>

        <Panel eyebrow="Distribución" title="Nivel de riesgo institucional">
          <div className="space-y-6 p-5">
            {riskDistribution.map((item) => {
              const meta = riskMeta[item.level];
              return (
                <div key={item.level}>
                  <div className="flex items-center justify-between gap-5">
                    <div>
                      <p className={`text-sm font-medium ${meta.text}`}>
                        {meta.label}
                      </p>
                      <p className="mt-1 text-[10px] text-[#002930]/36">
                        {item.percent.toFixed(1)}% del corte
                      </p>
                    </div>
                    <span className="text-2xl font-medium tracking-[-0.04em]">
                      {item.value}
                    </span>
                  </div>
                  <div className="mt-3 h-1 bg-[#002930]/10">
                    <div
                      className={`h-1 ${meta.bar}`}
                      style={{ width: `${Math.min(100, item.percent)}%` }}
                    />
                  </div>
                </div>
              );
            })}

            <div className="border-t border-[#002930]/10 pt-5">
              <p className="text-xs leading-5 text-[#002930]/48">
                La clasificación prioriza instituciones para revisión. No equivale
                a una sentencia sobre el colegio ni a una predicción individual de
                sus estudiantes.
              </p>
            </div>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel eyebrow="Modelo" title="Estado del modelo institucional">
          <div className="grid gap-px bg-[#002930]/10 sm:grid-cols-2">
            <SummaryMeta
              icon={<BrainCircuit className="h-4 w-4" />}
              label="Servicio de IA"
              value={health?.ready ? "Listo" : "No listo"}
            />
            <SummaryMeta
              icon={<ShieldCheck className="h-4 w-4" />}
              label="Versión"
              value={modelVersion}
            />
            <SummaryMeta
              icon={<TrendingUp className="h-4 w-4" />}
              label="Algoritmo"
              value={modelName(model)}
            />
            <SummaryMeta
              icon={<Building2 className="h-4 w-4" />}
              label="Riesgo bajo"
              value={String(lowCount)}
            />
          </div>
          <div className="border-t border-[#002930]/10 p-5">
            <Link
              href="/core/ai"
              className="group inline-flex items-center gap-4 text-sm font-medium text-[#AC4A00]"
            >
              Abrir riesgos institucionales
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Panel>

        <Panel eyebrow="Cobertura" title="Lectura territorial del corte">
          {zones.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-[#002930]/45">
              No hay información territorial disponible para este corte.
            </div>
          ) : (
            <div className="divide-y divide-[#002930]/10">
              {zones.map((zone) => {
                const isOpen = selectedZone === zone.zone;

                return (
                  <div key={zone.zone}>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedZone((current) =>
                          current === zone.zone ? null : zone.zone
                        )
                      }
                      aria-expanded={isOpen}
                      className="grid w-full grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-5 py-5 text-left transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#AC4A00]/45"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 shrink-0 text-[#AC4A00]" />
                          <p className="text-sm font-medium">
                            {formatZoneLabel(zone.zone)}
                          </p>
                        </div>
                        <p className="mt-1 pl-6 text-[10px] uppercase tracking-[0.13em] text-[#002930]/35">
                          {isOpen ? "Ocultar instituciones" : "Ver instituciones del último corte"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] uppercase tracking-[0.13em] text-[#002930]/35">
                          Total
                        </p>
                        <p className="mt-1 text-sm font-medium">{zone.total}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] uppercase tracking-[0.13em] text-[#002930]/35">
                          Alto
                        </p>
                        <p className="mt-1 text-sm font-medium text-[#8f2f20]">
                          {zone.high}
                        </p>
                      </div>
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4 text-[#002930]/45" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-[#002930]/45" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="border-t border-[#002930]/8 bg-white/18">
                        <div className="border-b border-[#002930]/8 px-5 py-3">
                          <p className="text-[10px] uppercase tracking-[0.14em] text-[#002930]/38">
                            {zone.total} {zone.total === 1 ? "institución" : "instituciones"} en zona {formatZoneLabel(zone.zone).toLowerCase()}
                          </p>
                        </div>
                        <div className="divide-y divide-[#002930]/8">
                          {zone.institutions.map((institution) => {
                            const meta = riskMeta[institution.riesgo_predicho];

                            return (
                              <Link
                                key={institution.codigo_dane_establecimiento}
                                href={`/core/ai/${encodeURIComponent(
                                  institution.codigo_dane_establecimiento
                                )}`}
                                className="group grid gap-3 px-5 py-4 transition hover:bg-white/35 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center"
                              >
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium">
                                    {institution.institucion_educativa}
                                  </p>
                                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#002930]/34">
                                    DANE {institution.codigo_dane_establecimiento} · Corte {institution.anio}
                                  </p>
                                </div>
                                <div className="sm:text-right">
                                  <p className="text-[9px] uppercase tracking-[0.12em] text-[#002930]/34">
                                    Riesgo
                                  </p>
                                  <p className={`mt-1 text-xs font-medium ${meta.text}`}>
                                    {meta.label}
                                  </p>
                                </div>
                                <div className="sm:text-right">
                                  <p className="text-[9px] uppercase tracking-[0.12em] text-[#002930]/34">
                                    P(ALTO)
                                  </p>
                                  <p className="mt-1 text-xs font-medium">
                                    {pct(institution.prob_alto)}
                                  </p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-[#AC4A00] transition-transform group-hover:translate-x-1" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Panel>
      </div>

      <div className="mt-6">
        <InlineNotice tone="info" title="Cómo leer este resumen">
          Empieza por las instituciones con mayor P(ALTO), revisa su nivel de
          riesgo y luego entra a “Riesgos institucionales” para consultar el
          historial, los factores asociados y la trazabilidad del modelo.
        </InlineNotice>
      </div>
    </CorePage>
  );
}

function SummaryMeta({
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
      <div className="flex items-center gap-2 text-[#AC4A00]">{icon}</div>
      <p className="mt-5 text-[9px] uppercase tracking-[0.14em] text-[#002930]/38">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-medium">{value}</p>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Building2,
  RefreshCw,
  ShieldCheck,
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
  getRetrainingStatus,
} from "@/services/predictions";
import {
  AiDashboardSummary,
  AiHealthResponse,
  AiInstitutionRisk,
  AiModelMetadata,
  RetrainingStatus,
} from "@/lib/prediction-types";

const riskMeta = {
  ALTO: { label: "Alto", text: "text-[#8f2f20]", border: "border-[#8f2f20]/25" },
  MEDIO: { label: "Medio", text: "text-[#8b6d14]", border: "border-[#8b6d14]/25" },
  BAJO: { label: "Bajo", text: "text-[#2f6a5f]", border: "border-[#2f6a5f]/25" },
} as const;

function pct(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `${(value * 100).toFixed(1)}%`;
}

function modelName(model: AiModelMetadata | null) {
  if (!model) return "No informado";
  return String(model.algorithm || model.model_name || model.model_type || "No informado");
}

export default function InstitutionalAiPage() {
  const [health, setHealth] = useState<AiHealthResponse | null>(null);
  const [model, setModel] = useState<AiModelMetadata | null>(null);
  const [summary, setSummary] = useState<AiDashboardSummary | null>(null);
  const [institutions, setInstitutions] = useState<AiInstitutionRisk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<"TODOS" | "BAJO" | "MEDIO" | "ALTO">("TODOS");
  const [retraining, setRetraining] = useState<RetrainingStatus | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      // Primero verificamos disponibilidad/readiness. Si la IA está levantada pero
      // aún no tiene modelo/predicciones, evitamos disparar múltiples 503 en paralelo.
      const healthData = await getAiHealth();
      setHealth(healthData);

      if (!healthData.ready) {
        setModel(null);
        setSummary(null);
        setInstitutions([]);
        setError(
          healthData.model_ready === false || healthData.predictions_ready === false
            ? "SIEDES AI está disponible, pero aún no está listo: faltan el modelo productivo o las predicciones institucionales. Ejecuta el pipeline de IA y vuelve a intentar."
            : "SIEDES AI todavía no está listo. Verifica /ready en el microservicio de IA."
        );
        return;
      }

      const [modelData, summaryData, institutionData, retrainingData] = await Promise.all([
        getAiModel(),
        getAiDashboard(),
        getInstitutionRisks(),
        getRetrainingStatus().catch(() => null),
      ]);
      setModel(modelData);
      setSummary(summaryData);
      setInstitutions(institutionData);
      setRetraining(retrainingData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No fue posible consultar SIEDES AI.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (riskFilter === "TODOS") return institutions;
    return institutions.filter((item) => item.riesgo_predicho === riskFilter);
  }, [institutions, riskFilter]);

  if (loading) {
    return (
      <CorePage>
        <LoadingState label="Consultando riesgo institucional..." />
      </CorePage>
    );
  }

  if (error) {
    return (
      <CorePage>
        <ErrorState
          title="No fue posible consultar el modelo institucional"
          message={error}
          onRetry={load}
        />
      </CorePage>
    );
  }

  const highCount = summary?.riesgo.ALTO ?? 0;
  const modelVersion = String(model?.model_version || model?.version || "No informado");
  const gates = model?.enterprise_gates || {};

  return (
    <CorePage>
      <CorePageHeader
        eyebrow="Modelo predictivo institucional"
        title="Riesgo de deserción por colegio"
        description="SIEDES prioriza instituciones educativas de Quibdó mediante un modelo de machine learning entrenado sobre variables históricas, académicas, socioeconómicas, territoriales, culturales e institucionales. El piloto no emite predicciones individuales de estudiantes."
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
          Los datos actuales son sintéticos y sirven para validar el flujo técnico y metodológico. No deben interpretarse como evidencia real sobre una institución ni utilizarse para decisiones automáticas. La revisión humana es obligatoria.
        </InlineNotice>
      </div>

      <StatGrid>
        <StatCard
          label="Servicio de IA"
          value={health?.ready ? "Listo" : "No listo"}
          note={`FastAPI ${String(health?.version || "")}`.trim()}
          accent={health?.ready ? "neutral" : "danger"}
        />
        <StatCard
          label="Instituciones evaluadas"
          value={summary?.instituciones ?? institutions.length}
          note={`Corte ${summary?.anio ?? "—"}`}
        />
        <StatCard
          label="Riesgo alto"
          value={highCount}
          note="Instituciones priorizadas por el modelo"
          accent="orange"
        />
        <StatCard
          label="Probabilidad ALTO media"
          value={pct(summary?.prob_alto_media)}
          note="Promedio del último corte"
        />
      </StatGrid>

      <Panel className="mt-6" eyebrow="MLOps" title="Aprendizaje continuo gobernado">
        <div className="grid gap-px bg-[#002930]/10 sm:grid-cols-2 xl:grid-cols-4">
          <div className="bg-[#F8F0AF] p-5">
            <p className="text-[9px] uppercase tracking-[0.13em] text-[#002930]/40">Estado</p>
            <p className="mt-2 text-lg font-medium">{retraining?.continual_learning_enabled ? "Activo" : "No disponible"}</p>
          </div>
          <div className="bg-[#F8F0AF] p-5">
            <p className="text-[9px] uppercase tracking-[0.13em] text-[#002930]/40">Eventos pendientes</p>
            <p className="mt-2 text-lg font-medium">{retraining?.events_pending ?? "—"}</p>
          </div>
          <div className="bg-[#F8F0AF] p-5">
            <p className="text-[9px] uppercase tracking-[0.13em] text-[#002930]/40">Reportes nuevos / umbral</p>
            <p className="mt-2 text-lg font-medium">{retraining ? `${retraining.new_finalized_reports}/${retraining.min_new_finalized_reports}` : "—"}</p>
          </div>
          <div className="bg-[#F8F0AF] p-5">
            <p className="text-[9px] uppercase tracking-[0.13em] text-[#002930]/40">Último candidato</p>
            <p className="mt-2 truncate text-sm font-medium">{retraining?.latest_candidate?.version || retraining?.last_run?.status || "Sin candidato real"}</p>
          </div>
        </div>
        <div className="border-t border-[#002930]/10 px-5 py-4 text-xs leading-5 text-[#002930]/60">
          {retraining?.policy || "Los eventos operativos se acumulan y el modelo solo se reentrena cuando existen resultados institucionales confirmados y suficientes. Ningún candidato se promueve automáticamente a producción."}
        </div>
      </Panel>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.08fr_.92fr]">
        <Panel eyebrow="Priorización" title="Instituciones por nivel de riesgo">
          <div className="border-b border-[#002930]/12 p-4">
            <div className="flex flex-wrap gap-2">
              {(["TODOS", "ALTO", "MEDIO", "BAJO"] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setRiskFilter(level)}
                  className={
                    "min-h-9 border px-3 text-xs font-medium transition " +
                    (riskFilter === level
                      ? "border-[#002930] bg-[#002930] text-white"
                      : "border-[#002930]/14 hover:border-[#002930]/40")
                  }
                >
                  {level === "TODOS" ? "Todos" : riskMeta[level].label}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-[#002930]/10">
            {filtered.map((item) => {
              const meta = riskMeta[item.riesgo_predicho];
              return (
                <Link
                  key={item.codigo_dane_establecimiento}
                  href={`/core/ai/${encodeURIComponent(item.codigo_dane_establecimiento)}`}
                  className="group grid gap-4 px-5 py-5 transition hover:bg-white/25 md:grid-cols-[1fr_8rem_8rem_auto] md:items-center"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#002930]">
                      {item.institucion_educativa}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.13em] text-[#002930]/38">
                      DANE {item.codigo_dane_establecimiento} · {item.zona_institucion || "Zona no informada"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.13em] text-[#002930]/35">Nivel</p>
                    <p className={`mt-1 text-sm font-medium ${meta.text}`}>{meta.label}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.13em] text-[#002930]/35">P(ALTO)</p>
                    <p className="mt-1 text-sm font-medium">{pct(item.prob_alto)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#AC4A00] transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel eyebrow="Modelo" title="Trazabilidad del modelo activo">
            <div className="grid gap-px bg-[#002930]/12 sm:grid-cols-2">
              <Meta label="Versión" value={modelVersion} />
              <Meta label="Algoritmo" value={modelName(model)} />
              <Meta
                label="Variables"
                value={String(model?.feature_columns?.length ?? model?.features?.length ?? "—")}
              />
              <Meta
                label="Años de entrenamiento"
                value={model?.trained_years?.length ? `${Math.min(...model.trained_years)}–${Math.max(...model.trained_years)}` : "—"}
              />
            </div>
          </Panel>

          <Panel eyebrow="Gobierno" title="Gates empresariales">
            <div className="divide-y divide-[#002930]/10">
              {Object.keys(gates).length > 0 ? (
                Object.entries(gates).map(([key, passed]) => (
                  <div key={key} className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      {passed ? (
                        <ShieldCheck className="h-4 w-4 text-[#2f6a5f]" />
                      ) : (
                        <Activity className="h-4 w-4 text-[#AC4A00]" />
                      )}
                      <span className="text-xs font-medium capitalize">{key.replaceAll("_", " ")}</span>
                    </div>
                    <span className={passed ? "text-xs text-[#2f6a5f]" : "text-xs text-[#AC4A00]"}>
                      {passed ? "Cumple" : "Pendiente"}
                    </span>
                  </div>
                ))
              ) : (
                <p className="px-5 py-6 text-sm text-[#002930]/45">Sin gates informados.</p>
              )}
            </div>
          </Panel>

          <InlineNotice tone="info" title="Arquitectura integrada">
            Next.js consulta NestJS y NestJS consulta FastAPI mediante una credencial de servicio privada. La API key de IA nunca se envía al navegador.
          </InlineNotice>
        </div>
      </div>

      <div className="mt-6 border-l-2 border-[#AC4A00] bg-[#F8F0AF] px-5 py-4">
        <div className="flex items-start gap-3">
          <BrainCircuit className="mt-0.5 h-4 w-4 shrink-0 text-[#AC4A00]" />
          <p className="text-xs leading-5 text-[#002930]/52">
            El nivel de riesgo es una herramienta de priorización institucional. Las acciones de seguimiento deben considerar contexto pedagógico, territorial, cultural y evidencia complementaria antes de intervenir.
          </p>
        </div>
      </div>
    </CorePage>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#F8F0AF] p-5">
      <p className="text-[9px] uppercase tracking-[0.14em] text-[#002930]/35">{label}</p>
      <p className="mt-2 break-words text-sm font-medium">{value}</p>
    </div>
  );
}

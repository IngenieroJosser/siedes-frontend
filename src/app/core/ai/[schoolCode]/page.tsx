"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BarChart3, ShieldCheck } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
  getInstitutionRiskFactors,
  getInstitutionRiskHistory,
} from "@/services/predictions";
import { AiInstitutionFactor, AiInstitutionRisk } from "@/lib/prediction-types";

const riskText = {
  ALTO: "text-[#8f2f20]",
  MEDIO: "text-[#8b6d14]",
  BAJO: "text-[#2f6a5f]",
} as const;

function percent(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `${value.toFixed(1)}%`;
}

function probability(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `${(value * 100).toFixed(1)}%`;
}

function humanFeature(feature: string) {
  return feature
    .replace(/^num__|^cat__/, "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function InstitutionRiskDetailPage() {
  const params = useParams();
  const schoolCode = String(params.schoolCode || "");
  const [history, setHistory] = useState<AiInstitutionRisk[]>([]);
  const [factors, setFactors] = useState<AiInstitutionFactor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [historyData, factorData] = await Promise.all([
          getInstitutionRiskHistory(schoolCode),
          getInstitutionRiskFactors(schoolCode),
        ]);
        setHistory(historyData);
        setFactors(factorData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "No fue posible cargar la institución.");
      } finally {
        setLoading(false);
      }
    };
    if (schoolCode) load();
  }, [schoolCode]);

  const latest = useMemo(
    () => [...history].sort((a, b) => b.anio - a.anio)[0],
    [history]
  );

  const chartData = useMemo(
    () =>
      [...history]
        .sort((a, b) => a.anio - b.anio)
        .map((item) => ({
          anio: item.anio,
          probAlto: typeof item.prob_alto === "number" ? item.prob_alto * 100 : null,
          tasa: typeof item.target_tasa_desercion_fin_anio_pct === "number" ? item.target_tasa_desercion_fin_anio_pct : null,
        })),
    [history]
  );

  if (loading) {
    return (
      <CorePage>
        <LoadingState label="Cargando riesgo institucional..." />
      </CorePage>
    );
  }

  if (error || !latest) {
    return (
      <CorePage>
        <ErrorState
          title="Institución no disponible"
          message={error || "No existen resultados para este código DANE."}
        />
      </CorePage>
    );
  }

  return (
    <CorePage>
      <CorePageHeader
        eyebrow={`Código DANE ${latest.codigo_dane_establecimiento}`}
        title={latest.institucion_educativa}
        description={`Lectura institucional del corte ${latest.anio}. Zona ${latest.zona_institucion || "no informada"}. Los resultados apoyan priorización y revisión humana; no constituyen una decisión automática.`}
        actions={
          <Link
            href="/core/ai"
            className="inline-flex min-h-11 items-center gap-3 border border-[#002930]/16 px-4 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Riesgo institucional
          </Link>
        }
      />

      <StatGrid>
        <StatCard
          label="Nivel de riesgo"
          value={<span className={riskText[latest.riesgo_predicho]}>{latest.riesgo_predicho}</span>}
          note={`Modelo · corte ${latest.anio}`}
          accent={latest.riesgo_predicho === "ALTO" ? "orange" : "neutral"}
        />
        <StatCard label="Probabilidad ALTO" value={probability(latest.prob_alto)} note="Probabilidad del clasificador" />
        <StatCard label="Asistencia" value={percent(latest.asistencia_promedio_sem1_pct)} note="Promedio institucional del semestre" />
        <StatCard label="Vulnerabilidad" value={percent(latest.vulnerabilidad_socioeconomica_media)} note="Índice agregado 0–100" />
      </StatGrid>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.12fr_.88fr]">
        <Panel eyebrow="Tendencia" title="Evolución histórica del riesgo">
          <div className="h-[360px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="anio" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="probAlto" name="P(ALTO) %" stroke="currentColor" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="tasa" name="Tasa deserción sintética %" stroke="currentColor" strokeDasharray="6 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel eyebrow="Interpretabilidad" title="Factores SHAP del último corte">
          <div className="divide-y divide-[#002930]/10">
            {factors.slice(0, 10).map((factor) => (
              <div key={`${factor.rank}-${factor.feature}`} className="grid grid-cols-[2rem_1fr_auto] gap-3 px-5 py-4">
                <span className="text-xs text-[#002930]/35">{String(factor.rank).padStart(2, "0")}</span>
                <div>
                  <p className="text-xs font-medium">{humanFeature(factor.feature)}</p>
                  <p className="mt-1 text-[10px] text-[#002930]/40">
                    {factor.direccion === "AUMENTA_RIESGO_ALTO" ? "Aumenta la señal de riesgo alto" : "Reduce la señal de riesgo alto"}
                  </p>
                </div>
                <span className={factor.shap_alto >= 0 ? "text-xs text-[#AC4A00]" : "text-xs text-[#2f6a5f]"}>
                  {factor.shap_alto >= 0 ? "+" : ""}{factor.shap_alto.toFixed(4)}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="mt-6" eyebrow="Indicadores" title="Contexto del último corte">
        <div className="grid gap-px bg-[#002930]/12 sm:grid-cols-2 xl:grid-cols-4">
          <Indicator label="Matrícula" value={String(latest.matricula_sintetica_10_18_corte ?? "—")} />
          <Indicator label="PAE" value={percent(latest.cobertura_pae_estudiantes_pct)} />
          <Indicator label="Respuesta institucional" value={percent(latest.respuesta_institucional_promedio)} />
          <Indicator label="Pertinencia etnoeducativa" value={percent(latest.pertinencia_etnoeducativa_ie_promedio)} />
          <Indicator label="Pertenencia cultural" value={percent(latest.pertenencia_cultural_estudiante_promedio)} />
          <Indicator label="Alerta asistencia" value={percent(latest.pct_alerta_asistencia)} />
          <Indicator label="Alerta académica" value={percent(latest.pct_alerta_academica)} />
          <Indicator label="Alerta socioeconómica" value={percent(latest.pct_alerta_socioeconomica)} />
        </div>
      </Panel>

      <div className="mt-6">
        <InlineNotice tone="info" title="Uso responsable">
          <span className="inline-flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            La explicación SHAP describe cómo el modelo llegó a su resultado; no demuestra causalidad. Una institución de riesgo alto debe pasar por revisión humana, contraste con fuentes oficiales y validación contextual antes de definir intervenciones.
          </span>
        </InlineNotice>
      </div>
    </CorePage>
  );
}

function Indicator({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#F8F0AF] p-5">
      <div className="flex items-center gap-2 text-[#AC4A00]">
        <BarChart3 className="h-4 w-4" />
        <p className="text-[9px] uppercase tracking-[0.13em]">{label}</p>
      </div>
      <p className="mt-3 text-xl font-medium">{value}</p>
    </div>
  );
}

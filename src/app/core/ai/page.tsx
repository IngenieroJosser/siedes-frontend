"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Database,
  GitCompareArrows,
  GraduationCap,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  CorePage,
  CorePageHeader,
  InlineNotice,
  LoadingState,
  Panel,
  StatCard,
  StatGrid,
} from "@/components/core/CoreUI";
import { getStudents } from "@/services/students";
import { getAiHealth, getAiModel } from "@/services/predictions";
import { Student } from "@/lib/type";
import { AiHealthResponse, AiModelMetadata } from "@/lib/prediction-types";

const riskOrder = ["CRITICO", "ALTO", "MEDIO", "BAJO"] as const;
const riskLabels: Record<(typeof riskOrder)[number], string> = {
  CRITICO: "Crítico",
  ALTO: "Alto",
  MEDIO: "Medio",
  BAJO: "Bajo",
};

function riskLevel(value: number): (typeof riskOrder)[number] {
  if (value >= 0.8) return "CRITICO";
  if (value >= 0.6) return "ALTO";
  if (value >= 0.4) return "MEDIO";
  return "BAJO";
}

function firstString(
  source: AiModelMetadata | null,
  keys: string[]
): string | null {
  if (!source) return null;
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number") return String(value);
  }
  return null;
}

function getFeatureCount(model: AiModelMetadata | null): number | null {
  if (!model) return null;
  const candidates = [model.features, model.feature_names];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate.length;
  }
  const raw = model.feature_count;
  return typeof raw === "number" ? raw : null;
}

function formatDateTime(value: string | null) {
  if (!value) return "No informado";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function AiOperationsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [health, setHealth] = useState<AiHealthResponse | null>(null);
  const [model, setModel] = useState<AiModelMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [aiAvailable, setAiAvailable] = useState(false);
  const [studentsAvailable, setStudentsAvailable] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setIsLoading(true);
    setError(null);

    const [healthResult, modelResult, studentsResult] =
      await Promise.allSettled([getAiHealth(), getAiModel(), getStudents()]);

    if (healthResult.status === "fulfilled") {
      setHealth(healthResult.value);
      setAiAvailable(true);
    } else {
      setHealth(null);
      setAiAvailable(false);
    }

    if (modelResult.status === "fulfilled") {
      setModel(modelResult.value);
    } else {
      setModel(null);
    }

    if (studentsResult.status === "fulfilled") {
      setStudents(studentsResult.value || []);
      setStudentsAvailable(true);
    } else {
      setStudents([]);
      setStudentsAvailable(false);
    }

    if (
      healthResult.status === "rejected" &&
      modelResult.status === "rejected"
    ) {
      setError(
        "El backend respondió, pero no fue posible consultar el servicio predictivo o el modelo desplegado."
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const distribution = useMemo(
    () =>
      riskOrder.map((level) => {
        const count = students.filter(
          (student) => riskLevel(student.riesgoDesercion) === level
        ).length;
        return {
          level,
          count,
          percent: students.length ? (count / students.length) * 100 : 0,
        };
      }),
    [students]
  );

  const highRisk = students.filter(
    (student) => student.riesgoDesercion >= 0.6
  ).length;

  const modelVersion =
    firstString(model, ["model_version", "version"]) || "No informado";
  const modelType =
    firstString(model, ["model_type", "model_name", "algorithm"]) ||
    "No informado";
  const task = firstString(model, ["task", "target", "objective"]);
  const trainedAt = firstString(model, ["trained_at", "created_at"]);
  const featureCount = getFeatureCount(model);

  if (isLoading) {
    return (
      <CorePage>
        <LoadingState label="Consultando SIEDES AI..." />
      </CorePage>
    );
  }

  return (
    <CorePage>
      <CorePageHeader
        eyebrow="Inteligencia artificial"
        title="IA predictiva"
        description="Estado operativo del servicio de IA, versión del modelo desplegado y lectura responsable de las señales de riesgo registradas. El frontend nunca se comunica directamente con FastAPI: toda la integración pasa por el backend SIEDES."
        actions={
          <button
            type="button"
            onClick={load}
            className="inline-flex min-h-11 items-center gap-3 border border-[#002930]/16 px-4 text-sm font-medium transition hover:border-[#002930]/45"
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar estado
          </button>
        }
      />

      {error && (
        <div className="mt-6">
          <InlineNotice tone="warning" title="Servicio de IA no disponible">
            {error} Las demás funciones operativas de SIEDES pueden continuar
            funcionando; las nuevas inferencias quedan temporalmente pendientes.
          </InlineNotice>
        </div>
      )}

      <StatGrid>
        <StatCard
          label="Servicio IA"
          value={aiAvailable ? "Disponible" : "No disponible"}
          note={
            aiAvailable
              ? String(health?.status || "Respuesta correcta del servicio")
              : "Requiere revisar backend y FastAPI"
          }
          accent={aiAvailable ? "neutral" : "danger"}
        />
        <StatCard
          label="Modelo activo"
          value={modelVersion}
          note={modelType}
          accent="orange"
        />
        <StatCard
          label="Estudiantes"
          value={studentsAvailable ? students.length : "—"}
          note="Trayectorias con riesgo almacenado"
        />
        <StatCard
          label="Riesgo alto o crítico"
          value={studentsAvailable ? highRisk : "—"}
          note="Señales actuales, no deserciones observadas"
          accent="orange"
        />
      </StatGrid>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
        <Panel eyebrow="Modelo" title="Modelo desplegado">
          <div className="grid gap-px bg-[#002930]/12 sm:grid-cols-2">
            <MetaItem label="Versión" value={modelVersion} />
            <MetaItem label="Tipo / algoritmo" value={modelType} />
            <MetaItem label="Tarea" value={task || "No informada por metadata"} />
            <MetaItem
              label="Variables de entrada"
              value={featureCount === null ? "No informado" : String(featureCount)}
            />
            <MetaItem
              label="Entrenamiento / registro"
              value={formatDateTime(trainedAt)}
              className="sm:col-span-2"
            />
          </div>

          {model?.metrics && Object.keys(model.metrics).length > 0 && (
            <div className="border-t border-[#002930]/12 p-5">
              <p className="text-[9px] uppercase tracking-[0.17em] text-[#AC4A00]">
                Métricas informadas por el modelo
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(model.metrics).map(([key, value]) => (
                  <div key={key} className="border border-[#002930]/12 p-3">
                    <p className="text-[9px] uppercase tracking-[0.13em] text-[#002930]/36">
                      {key.replaceAll("_", " ")}
                    </p>
                    <p className="mt-2 text-sm font-medium">
                      {typeof value === "number"
                        ? Number(value).toFixed(4)
                        : String(value ?? "—")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Panel>

        <Panel eyebrow="Señales" title="Distribución de riesgo almacenado">
          <div className="space-y-5 p-5">
            {distribution.map((item) => (
              <div key={item.level}>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#002930]/62">
                    {riskLabels[item.level]}
                  </span>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
                <div className="mt-2 h-px bg-[#002930]/12">
                  <div
                    className="h-px bg-[#AC4A00]"
                    style={{ width: `${Math.min(100, item.percent)}%` }}
                  />
                </div>
                <p className="mt-1 text-[10px] text-[#002930]/32">
                  {item.percent.toFixed(1)}%
                </p>
              </div>
            ))}

            <p className="border-t border-[#002930]/12 pt-5 text-xs leading-5 text-[#002930]/45">
              Esta distribución describe probabilidades almacenadas en las
              trayectorias. No equivale a una tasa real de deserción ni debe
              interpretarse como resultado educativo observado.
            </p>
          </div>
        </Panel>
      </div>

      <Panel className="mt-6" eyebrow="Arquitectura" title="Flujo de inferencia activo">
        <div className="grid gap-px bg-[#002930]/12 md:grid-cols-2 xl:grid-cols-6">
          <FlowStep index="01" icon={<Database className="h-5 w-5" />} title="PostgreSQL" text="Datos académicos y contextuales." />
          <FlowStep index="02" icon={<Activity className="h-5 w-5" />} title="NestJS" text="Construye el contrato de features." />
          <FlowStep index="03" icon={<BrainCircuit className="h-5 w-5" />} title="FastAPI" text="Orquesta la inferencia del modelo." />
          <FlowStep index="04" icon={<Sparkles className="h-5 w-5" />} title="Modelo" text="Estima probabilidad y factores." />
          <FlowStep index="05" icon={<ShieldCheck className="h-5 w-5" />} title="Persistencia" text="Guarda versión e historial." />
          <FlowStep index="06" icon={<GraduationCap className="h-5 w-5" />} title="Revisión humana" text="Contextualiza y decide el acompañamiento." />
        </div>
      </Panel>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel eyebrow="Aprendizaje" title="Champion → Challenger">
          <div className="p-5">
            <div className="flex items-start gap-4">
              <GitCompareArrows className="mt-0.5 h-5 w-5 shrink-0 text-[#AC4A00]" />
              <div>
                <p className="text-sm font-medium">Reentrenamiento gobernado</p>
                <p className="mt-2 text-xs leading-5 text-[#002930]/48">
                  El modelo no aprende de sus propias predicciones. Solo los
                  outcomes educativos reales posteriores pueden convertirse en
                  etiquetas de entrenamiento. Un modelo challenger debe superar
                  métricas y controles de fairness antes de reemplazar al champion.
                </p>
              </div>
            </div>
          </div>
        </Panel>

        <Panel eyebrow="Acceso" title="Trabajar con predicciones">
          <div className="divide-y divide-[#002930]/12">
            <Link
              href="/core/students"
              className="group flex items-center justify-between gap-6 px-5 py-5 transition hover:bg-white/25"
            >
              <div>
                <p className="text-sm font-medium">Abrir trayectorias</p>
                <p className="mt-1 text-xs text-[#002930]/45">
                  Cada estudiante incluye una pestaña de IA con predicción,
                  factores, versión e historial.
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/core/reports"
              className="group flex items-center justify-between gap-6 px-5 py-5 transition hover:bg-white/25"
            >
              <div>
                <p className="text-sm font-medium">Analizar operación</p>
                <p className="mt-1 text-xs text-[#002930]/45">
                  Contrasta riesgo, alertas e intervenciones sin convertir la
                  probabilidad en una decisión automática.
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Panel>
      </div>

      <div className="mt-6">
        <InlineNotice tone="info" title="IA responsable">
          SIEDES presenta señales para priorizar revisión. La probabilidad no es
          un diagnóstico ni una sentencia de deserción. El autorreconocimiento
          étnico y otras variables sensibles deben utilizarse para contexto y
          auditoría de equidad, no como penalización automática.
        </InlineNotice>
      </div>
    </CorePage>
  );
}

function MetaItem({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`bg-[#F8F0AF] p-5 ${className}`}>
      <p className="text-[9px] uppercase tracking-[0.15em] text-[#002930]/36">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-medium">{value}</p>
    </div>
  );
}

function FlowStep({
  index,
  icon,
  title,
  text,
}: {
  index: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="bg-[#F8F0AF] p-5">
      <div className="flex items-center justify-between">
        <span className="text-[#AC4A00]">{icon}</span>
        <span className="text-[9px] tracking-[0.16em] text-[#002930]/28">
          {index}
        </span>
      </div>
      <h3 className="mt-7 text-sm font-medium">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-[#002930]/45">{text}</p>
    </article>
  );
}

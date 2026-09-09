"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpenCheck,
  BrainCircuit,
  Clock3,
  Database,
  GraduationCap,
  History,
  RefreshCw,
  MapPin,
  Pencil,
  Plus,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { getStudentById } from "@/services/students";
import { getStudentPredictionHistory, predictStudentRisk } from "@/services/predictions";
import {
  Alerta,
  Intervencion as IntervencionDetalle,
  Nota,
  RegistroAcademico,
  Student as StudentType,
} from "@/lib/type";
import { AiPredictionHistoryItem, AiStudentPrediction } from "@/lib/prediction-types";
import {
  CorePage,
  CorePageHeader,
  DetailItem,
  EmptyState,
  ErrorState,
  InlineNotice,
  LoadingState,
  Panel,
  StatCard,
  StatGrid,
} from "@/components/core/CoreUI";

interface AlertaDetalle extends Alerta {
  tipo?: string;
  severidad?: string;
  creadaEn: string;
  revisada?: boolean;
}

interface RegistroAcademicoDetalle extends RegistroAcademico {
  periodo: string;
  promedio: number;
  creadoEn: string;
  materiasAprobadas: number;
  materiasReprobadas: number;
  inasistencias: number;
  comportamiento: number;
  observaciones: string;
}

type Student = StudentType & {
  alertas?: AlertaDetalle[];
  registros?: RegistroAcademicoDetalle[];
  notas?: Nota[];
  intervenciones?: IntervencionDetalle[];
};

type TabId = "general" | "ia" | "alertas" | "academico" | "contexto";

const tabs: Array<{
  id: TabId;
  label: string;
  icon: typeof UserRound;
}> = [
  { id: "general", label: "Resumen", icon: UserRound },
  { id: "ia", label: "IA predictiva", icon: BrainCircuit },
  { id: "alertas", label: "Alertas", icon: AlertTriangle },
  { id: "academico", label: "Académico", icon: GraduationCap },
  { id: "contexto", label: "Contexto", icon: MapPin },
];

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

const getRiskLevel = (risk: number) => {
  if (risk >= 0.8) return "CRITICO";
  if (risk >= 0.6) return "ALTO";
  if (risk >= 0.4) return "MEDIO";
  return "BAJO";
};

const riskMeta: Record<
  string,
  { label: string; text: string; bar: string; border: string }
> = {
  CRITICO: {
    label: "Crítico",
    text: "text-[#8f2f20]",
    bar: "bg-[#8f2f20]",
    border: "border-[#8f2f20]/30",
  },
  ALTO: {
    label: "Alto",
    text: "text-[#AC4A00]",
    bar: "bg-[#AC4A00]",
    border: "border-[#AC4A00]/30",
  },
  MEDIO: {
    label: "Medio",
    text: "text-[#6f5710]",
    bar: "bg-[#8b6d14]",
    border: "border-[#8b6d14]/30",
  },
  BAJO: {
    label: "Bajo",
    text: "text-[#2f6a5f]",
    bar: "bg-[#2f6a5f]",
    border: "border-[#2f6a5f]/30",
  },
};

const formatDate = (value?: string) => {
  if (!value) return "No disponible";
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

const formatDateTime = (value?: string) => {
  if (!value) return "No disponible";
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

export default function StudentDetail() {
  const params = useParams();
  const studentId = params.id as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [predictionHistory, setPredictionHistory] = useState<AiPredictionHistoryItem[]>([]);
  const [latestPrediction, setLatestPrediction] = useState<AiStudentPrediction | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const loadStudent = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getStudentById(studentId);
      setStudent(data as Student);
    } catch (err) {
      console.error("Error cargando estudiante:", err);
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible cargar la información del estudiante."
      );
    } finally {
      setIsLoading(false);
    }
  }, [studentId]);


  const loadPredictionHistory = useCallback(async () => {
    if (!studentId) return;
    try {
      setAiLoading(true);
      setAiError(null);
      const history = await getStudentPredictionHistory(studentId);
      setPredictionHistory(history || []);
    } catch (err) {
      setPredictionHistory([]);
      setAiError(
        err instanceof Error
          ? err.message
          : "No fue posible consultar el historial predictivo."
      );
    } finally {
      setAiLoading(false);
    }
  }, [studentId]);

  const handlePredict = async () => {
    if (!studentId || !student) return;
    try {
      setPredicting(true);
      setAiError(null);
      const prediction = await predictStudentRisk(studentId, true);
      setLatestPrediction(prediction);
      setStudent((current) =>
        current
          ? { ...current, riesgoDesercion: prediction.probability }
          : current
      );
      await loadPredictionHistory();
      setActiveTab("ia");
    } catch (err) {
      setAiError(
        err instanceof Error
          ? err.message
          : "No fue posible ejecutar la predicción."
      );
    } finally {
      setPredicting(false);
    }
  };

  useEffect(() => {
    if (studentId) {
      loadStudent();
      loadPredictionHistory();
    }
  }, [studentId, loadStudent, loadPredictionHistory]);

  const stats = useMemo(() => {
    if (!student) {
      return {
        alerts: 0,
        pendingAlerts: 0,
        records: 0,
        interventions: 0,
      };
    }

    return {
      alerts: student.alertas?.length || 0,
      pendingAlerts:
        student.alertas?.filter((alert) => !alert.revisada).length || 0,
      records: student.registros?.length || 0,
      interventions: student.intervenciones?.length || 0,
    };
  }, [student]);

  if (isLoading) {
    return (
      <CorePage>
        <LoadingState label="Cargando trayectoria del estudiante..." />
      </CorePage>
    );
  }

  if (!student) {
    return (
      <CorePage>
        <ErrorState
          title="No fue posible abrir la trayectoria"
          message={
            error || "El estudiante no existe o no se encuentra disponible."
          }
          onRetry={loadStudent}
        />
      </CorePage>
    );
  }

  const riskLevel = getRiskLevel(student.riesgoDesercion);
  const risk = riskMeta[riskLevel];
  const fullName =
    `${student.usuario?.nombre || ""} ${student.usuario?.apellido || ""}`.trim() ||
    "Estudiante";

  return (
    <CorePage>
      <CorePageHeader
        eyebrow="Trayectoria individual"
        title={fullName}
        description={`${student.grado || "Grado no especificado"} · ${student.institucion?.nombre || "Sin institución"} · ${student.activo ? "Registro activo" : "Registro inactivo"}`}
        actions={
          <>
            <Link
              href="/core/students"
              className="inline-flex min-h-11 items-center gap-3 border border-[#002930]/16 px-4 text-sm font-medium transition hover:border-[#002930]/45"
            >
              <ArrowLeft className="h-4 w-4" />
              Estudiantes
            </Link>
            <Link
              href={`/core/students/edit/${student.id}`}
              className="inline-flex min-h-11 items-center gap-3 bg-[#002930] px-4 text-sm font-medium text-white transition hover:bg-[#00343d]"
            >
              <Pencil className="h-4 w-4" />
              Editar
            </Link>
          </>
        }
      />

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_330px]">
        <Panel className="overflow-hidden">
          <div className="grid gap-6 p-5 md:grid-cols-[auto_1fr] md:p-6">
            <div className="flex h-20 w-20 items-center justify-center border border-[#002930]/14 bg-[#002930] text-2xl font-medium text-[#F8F0AF]">
              {student.usuario?.nombre?.charAt(0) || ""}
              {student.usuario?.apellido?.charAt(0) || ""}
            </div>

            <div className="min-w-0">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#AC4A00]">
                    Perfil
                  </p>
                  <h2 className="mt-2 text-2xl font-medium tracking-[-0.035em]">
                    {fullName}
                  </h2>
                  <p className="mt-2 text-sm text-[#002930]/48">
                    {student.usuario?.email || "Sin correo registrado"}
                  </p>
                </div>

                <div className={"border-l-2 pl-4 " + risk.border}>
                  <p className="text-[9px] uppercase tracking-[0.16em] text-[#002930]/38">
                    Señal de riesgo actual
                  </p>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span className={"text-lg font-medium " + risk.text}>
                      {risk.label}
                    </span>
                    <span className="text-sm text-[#002930]/45">
                      {(student.riesgoDesercion * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="mt-3 h-px w-40 bg-[#002930]/12">
                    <div
                      className={"h-px " + risk.bar}
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(100, student.riesgoDesercion * 100)
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Panel>

        <div className="space-y-4">
          <InlineNotice tone="warning" title="Interpretación">
            El porcentaje de riesgo es una señal de apoyo para priorizar revisión.
            No constituye diagnóstico ni decisión automática sobre el estudiante.
          </InlineNotice>

          <Link
            href="/core/alerts/add"
            className="group flex min-h-12 items-center justify-between bg-[#AC4A00] px-4 text-sm font-medium text-white transition hover:bg-[#D45A10]"
          >
            Crear alerta
            <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
          </Link>
        </div>
      </div>

      <StatGrid>
        <StatCard
          label="Alertas registradas"
          value={stats.alerts}
          note={`${stats.pendingAlerts} pendientes de revisión`}
          accent={stats.pendingAlerts > 0 ? "orange" : "neutral"}
        />
        <StatCard
          label="Registros académicos"
          value={stats.records}
          note="Registros incluidos en la respuesta actual"
        />
        <StatCard
          label="Intervenciones"
          value={stats.interventions}
          note="Procesos asociados disponibles"
        />
        <StatCard
          label="Contexto"
          value={student.contexto ? "Disponible" : "Pendiente"}
          note="Información contextual del estudiante"
        />
      </StatGrid>

      <Panel className="mt-8 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-[#002930]/14">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={
                  "flex min-h-14 shrink-0 items-center gap-3 border-r border-[#002930]/10 px-5 text-sm font-medium transition last:border-r-0 " +
                  (active
                    ? "bg-[#002930] text-white"
                    : "text-[#002930]/55 hover:bg-white/25 hover:text-[#002930]")
                }
              >
                <span
                  className={
                    "text-[9px] tracking-[0.15em] " +
                    (active ? "text-[#F8F0AF]" : "text-[#AC4A00]")
                  }
                >
                  0{index + 1}
                </span>
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "general" && (
          <div className="grid gap-px bg-[#002930]/12 lg:grid-cols-2">
            <section className="bg-[#F8F0AF] p-5 md:p-6">
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#AC4A00]">
                Identidad y trayectoria
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <DetailItem
                  label="Edad"
                  value={`${student.edad} años`}
                />
                <DetailItem
                  label="Grado"
                  value={student.grado || "No registrado"}
                />
                <DetailItem
                  label="Género"
                  value={student.genero?.toLowerCase() || "No registrado"}
                />
                <DetailItem
                  label="Autorreconocimiento étnico"
                  value={getEthnicityLabel(student.etnia)}
                />
                <DetailItem
                  label="Institución"
                  value={
                    student.institucion?.nombre || "Sin institución asignada"
                  }
                  className="sm:col-span-2"
                />
              </div>
            </section>

            <section className="bg-[#F8F0AF] p-5 md:p-6">
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#AC4A00]">
                Cuenta y trazabilidad
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <DetailItem
                  label="Correo"
                  value={student.usuario?.email || "No registrado"}
                />
                <DetailItem
                  label="Teléfono"
                  value={student.usuario?.telefono || "No registrado"}
                />
                <DetailItem
                  label="Fecha de registro"
                  value={formatDateTime(student.creadoEn)}
                />
                <DetailItem
                  label="Última actualización"
                  value={formatDateTime(student.actualizadoEn)}
                />
                <DetailItem
                  label="Estado"
                  value={student.activo ? "Activo" : "Inactivo"}
                />
                <DetailItem
                  label="Identificador"
                  value={
                    <span className="break-all font-mono text-xs">
                      {student.id}
                    </span>
                  }
                />
              </div>
            </section>

            <section className="bg-[#F8F0AF] p-5 md:p-6 lg:col-span-2">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#AC4A00]" />
                <p className="max-w-4xl text-xs leading-5 text-[#002930]/50">
                  La pertenencia étnica y demás variables contextuales deben
                  utilizarse para comprender el entorno y auditar equidad, no
                  como justificación automática para aumentar el riesgo.
                </p>
              </div>
            </section>
          </div>
        )}

        {activeTab === "ia" && (
          <div className="p-5 md:p-6">
            <div className="flex flex-col gap-5 border-b border-[#002930]/12 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-[#AC4A00]">
                  Inteligencia artificial
                </p>
                <h3 className="mt-2 text-lg font-medium">
                  Predicción, factores y trazabilidad
                </h3>
                <p className="mt-2 max-w-2xl text-xs leading-5 text-[#002930]/48">
                  SIEDES consulta el backend, que construye las variables desde
                  PostgreSQL y delega la inferencia al servicio FastAPI. La
                  predicción persistida conserva versión del modelo e historial.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePredict}
                disabled={predicting}
                className="inline-flex min-h-11 items-center justify-center gap-3 bg-[#AC4A00] px-4 text-sm font-medium text-white transition hover:bg-[#D45A10] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw className={`h-4 w-4 ${predicting ? "animate-spin" : ""}`} />
                {predicting ? "Calculando..." : "Actualizar predicción IA"}
              </button>
            </div>

            {aiError && (
              <div className="mt-5">
                <InlineNotice tone="warning" title="Predicción no disponible">
                  {aiError} La trayectoria del estudiante permanece disponible y
                  la inferencia puede reintentarse cuando el servicio de IA esté
                  operativo.
                </InlineNotice>
              </div>
            )}

            {aiLoading ? (
              <div className="py-12 text-center">
                <RefreshCw className="mx-auto h-5 w-5 animate-spin text-[#AC4A00]" />
                <p className="mt-3 text-xs text-[#002930]/45">
                  Consultando historial predictivo...
                </p>
              </div>
            ) : latestPrediction || predictionHistory.length > 0 ? (
              <AiPredictionView
                livePrediction={latestPrediction}
                history={predictionHistory}
              />
            ) : (
              <EmptyState
                title="Sin predicciones persistidas"
                description="Todavía no existe un historial de inferencia para esta trayectoria. Ejecuta una predicción cuando el contexto y el registro académico estén suficientemente actualizados."
                action={
                  <button
                    type="button"
                    onClick={handlePredict}
                    disabled={predicting}
                    className="inline-flex min-h-10 items-center gap-2 bg-[#AC4A00] px-4 text-xs font-medium text-white disabled:opacity-60"
                  >
                    <BrainCircuit className="h-4 w-4" />
                    Generar primera predicción
                  </button>
                }
              />
            )}

            <div className="mt-6">
              <InlineNotice tone="info" title="Interpretación humana obligatoria">
                La probabilidad expresa una señal de priorización, no una certeza de
                deserción. Los factores deben contrastarse con la trayectoria,
                contexto territorial, situación familiar y criterio pedagógico. El
                autorreconocimiento étnico no debe convertirse en una penalización
                automática del riesgo.
              </InlineNotice>
            </div>
          </div>
        )}

        {activeTab === "alertas" && (
          <div className="p-5 md:p-6">
            <div className="flex flex-col gap-4 border-b border-[#002930]/12 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-[#AC4A00]">
                  Historial
                </p>
                <h3 className="mt-2 text-lg font-medium">
                  Alertas asociadas
                </h3>
              </div>
              <Link
                href="/core/alerts/add"
                className="inline-flex min-h-10 items-center gap-2 border border-[#002930]/16 px-4 text-xs font-medium"
              >
                <Plus className="h-4 w-4" />
                Nueva alerta
              </Link>
            </div>

            {student.alertas && student.alertas.length > 0 ? (
              <div className="divide-y divide-[#002930]/12">
                {student.alertas.map((alert, index) => (
                  <article
                    key={alert.id || index}
                    className="grid gap-4 py-5 lg:grid-cols-[10rem_1fr_auto] lg:items-start"
                  >
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.16em] text-[#AC4A00]">
                        {alert.tipo || "Alerta"}
                      </p>
                      <p className="mt-2 text-xs text-[#002930]/42">
                        {formatDate(alert.creadaEn)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm leading-6 text-[#002930]/65">
                        {alert.descripcion || "Sin descripción disponible"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {alert.severidad && (
                        <span className="border border-[#002930]/12 px-2 py-1 text-[10px] uppercase tracking-[0.13em] text-[#002930]/55">
                          {alert.severidad}
                        </span>
                      )}
                      <span
                        className={
                          "border px-2 py-1 text-[10px] uppercase tracking-[0.13em] " +
                          (alert.revisada
                            ? "border-[#2f6a5f]/25 text-[#2f6a5f]"
                            : "border-[#AC4A00]/25 text-[#AC4A00]")
                        }
                      >
                        {alert.revisada ? "Revisada" : "Pendiente"}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Sin alertas registradas"
                description="La respuesta actual del estudiante no contiene alertas asociadas."
                action={
                  <Link
                    href="/core/alerts/add"
                    className="inline-flex min-h-10 items-center gap-2 bg-[#AC4A00] px-4 text-xs font-medium text-white"
                  >
                    <Plus className="h-4 w-4" />
                    Crear alerta
                  </Link>
                }
              />
            )}
          </div>
        )}

        {activeTab === "academico" && (
          <div className="p-5 md:p-6">
            <div className="border-b border-[#002930]/12 pb-5">
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#AC4A00]">
                Seguimiento
              </p>
              <h3 className="mt-2 text-lg font-medium">
                Registros académicos
              </h3>
            </div>

            {student.registros && student.registros.length > 0 ? (
              <div className="grid gap-px bg-[#002930]/12 md:grid-cols-2 xl:grid-cols-3">
                {student.registros.map((record, index) => (
                  <article
                    key={record.id || index}
                    className="bg-[#F8F0AF] p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.16em] text-[#AC4A00]">
                          {record.periodo || "Período"}
                        </p>
                        <p className="mt-2 text-xs text-[#002930]/42">
                          {formatDate(record.creadoEn)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-medium tracking-[-0.04em]">
                          {Number(record.promedio || 0).toFixed(1)}
                        </p>
                        <p className="text-[9px] uppercase tracking-[0.13em] text-[#002930]/35">
                          Promedio
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <AcademicMetric
                        label="Aprobadas"
                        value={record.materiasAprobadas || 0}
                      />
                      <AcademicMetric
                        label="Reprobadas"
                        value={record.materiasReprobadas || 0}
                      />
                      <AcademicMetric
                        label="Inasistencias"
                        value={record.inasistencias || 0}
                      />
                      <AcademicMetric
                        label="Comportamiento"
                        value={`${record.comportamiento || 0}/10`}
                      />
                    </div>

                    {record.observaciones && (
                      <p className="mt-5 border-t border-[#002930]/10 pt-4 text-xs leading-5 text-[#002930]/50">
                        {record.observaciones}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Sin registros académicos"
                description="La respuesta actual del estudiante no contiene registros académicos."
              />
            )}
          </div>
        )}

        {activeTab === "contexto" && (
          <div className="p-5 md:p-6">
            <div className="border-b border-[#002930]/12 pb-5">
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#AC4A00]">
                Entorno
              </p>
              <h3 className="mt-2 text-lg font-medium">
                Contexto del estudiante
              </h3>
            </div>

            {student.contexto ? (
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <ContextBlock title="Movilidad y hogar">
                  <DetailItem
                    label="Distancia a la escuela"
                    value={`${student.contexto.distanciaEscuela} km`}
                  />
                  <DetailItem
                    label="Tiempo de desplazamiento"
                    value={`${student.contexto.tiempoDesplazamiento} min`}
                  />
                  <DetailItem
                    label="Personas en el hogar"
                    value={String(student.contexto.personasHogar)}
                  />
                  <DetailItem
                    label="Ingresos familiares"
                    value={
                      typeof student.contexto.ingresosFamiliares === "number"
                        ? new Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            maximumFractionDigits: 0,
                          }).format(student.contexto.ingresosFamiliares)
                        : "No registrado"
                    }
                  />
                </ContextBlock>

                <ContextBlock title="Acceso y apoyo">
                  <BooleanItem
                    label="Trabaja"
                    value={student.contexto.trabaja}
                    detail={
                      student.contexto.horasTrabajo
                        ? `${student.contexto.horasTrabajo} h/semana`
                        : undefined
                    }
                  />
                  <BooleanItem
                    label="Apoyo familiar"
                    value={student.contexto.apoyoFamiliar}
                  />
                  <BooleanItem
                    label="Acceso a internet"
                    value={student.contexto.accesoInternet}
                  />
                  <BooleanItem
                    label="Dispositivo electrónico"
                    value={student.contexto.dispositivoElectronico}
                  />
                  <BooleanItem
                    label="Participación comunitaria"
                    value={student.contexto.participacionComunitaria}
                  />
                  <BooleanItem
                    label="Conocimientos ancestrales"
                    value={student.contexto.conocimientosAncestrales}
                  />
                </ContextBlock>

                {(student.contexto.situacionesEspeciales ||
                  student.contexto.necesidadesEspeciales) && (
                  <div className="border border-[#002930]/12 p-5 lg:col-span-2">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#AC4A00]">
                      Observaciones contextuales
                    </p>
                    <div className="mt-5 grid gap-6 md:grid-cols-2">
                      <DetailItem
                        label="Situaciones especiales"
                        value={
                          student.contexto.situacionesEspeciales ||
                          "No registrado"
                        }
                      />
                      <DetailItem
                        label="Necesidades de apoyo"
                        value={
                          student.contexto.necesidadesEspeciales ||
                          "No registrado"
                        }
                      />
                    </div>
                  </div>
                )}

                <div className="lg:col-span-2">
                  <InlineNotice tone="info" title="Lectura contextual">
                    Estas variables ayudan a comprender condiciones de acceso y
                    acompañamiento. Deben interpretarse de manera conjunta y con
                    revisión humana.
                  </InlineNotice>
                </div>
              </div>
            ) : (
              <EmptyState
                title="Contexto no registrado"
                description="No hay información contextual disponible para este estudiante en la respuesta actual."
                action={
                  <Link
                    href={`/core/students/edit/${student.id}`}
                    className="inline-flex min-h-10 items-center gap-2 border border-[#002930]/16 px-4 text-xs font-medium"
                  >
                    <Pencil className="h-4 w-4" />
                    Editar estudiante
                  </Link>
                }
              />
            )}
          </div>
        )}
      </Panel>

      <div className="mt-6 flex items-start gap-3 border-l-2 border-[#AC4A00] bg-[#F8F0AF] px-4 py-4">
        <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#AC4A00]" />
        <p className="text-xs leading-5 text-[#002930]/50">
          Última actualización del registro:{" "}
          <span className="font-medium text-[#002930]">
            {formatDateTime(student.actualizadoEn)}
          </span>
          .
        </p>
      </div>
    </CorePage>
  );
}

function AiPredictionView({
  livePrediction,
  history,
}: {
  livePrediction: AiStudentPrediction | null;
  history: AiPredictionHistoryItem[];
}) {
  const persisted = history[0];
  const probability = livePrediction?.probability ?? persisted?.probability ?? 0;
  const level = livePrediction?.risk_level ?? persisted?.nivelRiesgo ?? getRiskLevel(probability);
  const modelType = livePrediction?.model_type ?? persisted?.modelType ?? "No informado";
  const modelVersion = livePrediction?.model_version ?? persisted?.modelVersion ?? "No informado";
  const prior = livePrediction?.institutional_prior ?? persisted?.institutionalPrior ?? null;
  const factors = livePrediction?.factors ?? (Array.isArray(persisted?.factores) ? persisted?.factores : []) ?? [];
  const warnings = livePrediction?.warnings ?? (Array.isArray(persisted?.warnings) ? persisted?.warnings : []) ?? [];
  const meta = riskMeta[level] || riskMeta[getRiskLevel(probability)];

  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-px border border-[#002930]/12 bg-[#002930]/12 sm:grid-cols-2 xl:grid-cols-4">
        <div className="bg-[#F8F0AF] p-5">
          <p className="text-[9px] uppercase tracking-[0.15em] text-[#002930]/36">
            Probabilidad
          </p>
          <p className={`mt-3 text-3xl font-medium ${meta.text}`}>
            {(probability * 100).toFixed(0)}%
          </p>
          <p className="mt-2 text-xs text-[#002930]/42">Nivel {meta.label.toLowerCase()}</p>
        </div>
        <div className="bg-[#F8F0AF] p-5">
          <p className="text-[9px] uppercase tracking-[0.15em] text-[#002930]/36">
            Modelo
          </p>
          <p className="mt-3 break-words text-sm font-medium">{modelType}</p>
          <p className="mt-2 break-all text-xs text-[#002930]/42">{modelVersion}</p>
        </div>
        <div className="bg-[#F8F0AF] p-5">
          <p className="text-[9px] uppercase tracking-[0.15em] text-[#002930]/36">
            Prior institucional
          </p>
          <p className="mt-3 text-xl font-medium">
            {typeof prior === "number" ? `${(prior * 100).toFixed(1)}%` : "No disponible"}
          </p>
          <p className="mt-2 text-xs text-[#002930]/42">Contexto agregado, cuando aplica</p>
        </div>
        <div className="bg-[#F8F0AF] p-5">
          <p className="text-[9px] uppercase tracking-[0.15em] text-[#002930]/36">
            Historial
          </p>
          <p className="mt-3 text-xl font-medium">{history.length}</p>
          <p className="mt-2 text-xs text-[#002930]/42">Predicciones persistidas</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_.92fr]">
        <section className="border border-[#002930]/12">
          <div className="border-b border-[#002930]/12 px-5 py-4">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-4 w-4 text-[#AC4A00]" />
              <h4 className="text-sm font-medium">Factores informados por el modelo</h4>
            </div>
          </div>
          {factors.length > 0 ? (
            <div className="divide-y divide-[#002930]/10">
              {factors.map((factor, index) => (
                <div key={`${factor.factor}-${index}`} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <p className="text-sm font-medium">
                      {factor.factor.replaceAll("_", " ")}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#002930]/45">
                      {factor.explanation || "Factor incluido en la explicación de la inferencia."}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className={
                      "text-[9px] uppercase tracking-[0.14em] " +
                      (factor.direction === "AUMENTA"
                        ? "text-[#AC4A00]"
                        : factor.direction === "REDUCE"
                          ? "text-[#2f6a5f]"
                          : "text-[#315c75]")
                    }>
                      {factor.direction}
                    </p>
                    <p className="mt-1 text-xs text-[#002930]/38">
                      contrib. {Number(factor.contribution || 0).toFixed(3)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="px-5 py-8 text-sm text-[#002930]/45">
              Esta inferencia no informó factores explicativos estructurados.
            </p>
          )}
        </section>

        <section className="border border-[#002930]/12">
          <div className="border-b border-[#002930]/12 px-5 py-4">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-[#AC4A00]" />
              <h4 className="text-sm font-medium">Historial de predicciones</h4>
            </div>
          </div>
          {history.length > 0 ? (
            <div className="max-h-[360px] overflow-auto divide-y divide-[#002930]/10">
              {history.map((item) => {
                const itemMeta = riskMeta[item.nivelRiesgo] || riskMeta[getRiskLevel(item.probability)];
                return (
                  <div key={item.id} className="grid grid-cols-[5.5rem_1fr] gap-4 px-5 py-4">
                    <div>
                      <p className={`text-sm font-medium ${itemMeta.text}`}>
                        {(item.probability * 100).toFixed(0)}%
                      </p>
                      <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[#002930]/36">
                        {itemMeta.label}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium">{item.modelVersion}</p>
                      <p className="mt-1 text-[10px] text-[#002930]/38">
                        {formatDateTime(item.creadaEn)} · {item.modelType}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="px-5 py-8 text-sm text-[#002930]/45">Sin historial persistido.</p>
          )}
        </section>
      </div>

      {warnings.length > 0 && (
        <section className="border border-[#AC4A00]/20 p-5">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-[#AC4A00]" />
            <h4 className="text-sm font-medium">Advertencias del modelo</h4>
          </div>
          <ul className="mt-4 space-y-2">
            {warnings.map((warning, index) => (
              <li key={`${warning}-${index}`} className="text-xs leading-5 text-[#002930]/50">
                {warning}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function AcademicMetric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-xl font-medium tracking-[-0.03em]">{value}</p>
      <p className="mt-1 text-[9px] uppercase tracking-[0.13em] text-[#002930]/35">
        {label}
      </p>
    </div>
  );
}

function ContextBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-[#002930]/12 p-5">
      <div className="flex items-center gap-2">
        <BookOpenCheck className="h-4 w-4 text-[#AC4A00]" />
        <h4 className="text-sm font-medium">{title}</h4>
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function BooleanItem({
  label,
  value,
  detail,
}: {
  label: string;
  value: boolean;
  detail?: string;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[0.15em] text-[#002930]/36">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium">
        {value ? "Sí" : "No"}
        {detail ? (
          <span className="ml-2 font-normal text-[#002930]/42">
            {detail}
          </span>
        ) : null}
      </p>
    </div>
  );
}

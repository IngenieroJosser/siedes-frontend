"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpenCheck,
  Clock3,
  GraduationCap,
  MapPin,
  Pencil,
  Plus,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { getStudentById } from "@/services/students";
import {
  Alerta,
  Intervencion as IntervencionDetalle,
  Nota,
  RegistroAcademico,
  Student as StudentType,
} from "@/lib/type";
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

type TabId = "general" | "alertas" | "academico" | "contexto";

const tabs: Array<{
  id: TabId;
  label: string;
  icon: typeof UserRound;
}> = [
  { id: "general", label: "Resumen", icon: UserRound },
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

  const loadStudent = async () => {
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
  };

  useEffect(() => {
    if (studentId) {
      loadStudent();
    }
  }, [studentId]);

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
                    Riesgo registrado
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

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  LoaderCircle,
  Plus,
  Search,
  X,
} from "lucide-react";
import { getStudents } from "@/services/students";
import { Student as StudentType } from "@/lib/type";
import { createAlert } from "@/services/alerts";
import {
  CorePage,
  CorePageHeader,
  EmptyState,
  FieldLabel,
  InlineNotice,
  LoadingState,
  Panel,
  inputClass,
} from "@/components/core/CoreUI";

type Student = StudentType;
type RiskLevel = "CRITICO" | "ALTO" | "MEDIO" | "BAJO";

const FACTORES_RIESGO = [
  "Bajo rendimiento académico",
  "Inasistencias frecuentes",
  "Problemas económicos familiares",
  "Falta de apoyo familiar",
  "Trabaja mientras estudia",
  "Larga distancia a la escuela",
  "Sin acceso a internet",
  "Sin dispositivo electrónico",
  "Problemas de salud mental",
  "Situación de acoso escolar",
  "Problemas familiares",
  "Falta de motivación",
  "Dificultades de aprendizaje",
  "Situación de desplazamiento",
  "Problemas de vivienda",
  "Falta de alimentación adecuada",
  "Problemas de transporte",
  "Falta de participación en clase",
  "Bajo promedio académico",
  "Barreras de acceso o permanencia",
];

const riskOptions: Array<{
  value: RiskLevel;
  label: string;
  description: string;
}> = [
  {
    value: "BAJO",
    label: "Bajo",
    description: "Seguimiento ordinario",
  },
  {
    value: "MEDIO",
    label: "Medio",
    description: "Requiere observación",
  },
  {
    value: "ALTO",
    label: "Alto",
    description: "Seguimiento cercano",
  },
  {
    value: "CRITICO",
    label: "Crítico",
    description: "Revisión prioritaria",
  },
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

const getRiskLevel = (value: number): RiskLevel => {
  if (value >= 0.8) return "CRITICO";
  if (value >= 0.6) return "ALTO";
  if (value >= 0.4) return "MEDIO";
  return "BAJO";
};

export default function CreateAlertPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);
  const [alertData, setAlertData] = useState({
    nivelRiesgo: "ALTO" as RiskLevel,
    descripcion: "",
    factores: [] as string[],
    factorInput: "",
  });

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getStudents();
      setStudents(data || []);
    } catch (err) {
      console.error("Error cargando estudiantes:", err);
      setError("No fue posible cargar los estudiantes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return students.slice(0, 8);

    return students
      .filter((student) => {
        const fullName =
          `${student.usuario?.nombre || ""} ${student.usuario?.apellido || ""}`.toLowerCase();

        return (
          fullName.includes(term) ||
          student.usuario?.email?.toLowerCase().includes(term) ||
          student.institucion?.nombre?.toLowerCase().includes(term)
        );
      })
      .slice(0, 12);
  }, [students, searchTerm]);

  const selectStudent = (student: Student) => {
    setSelectedStudent(student);
    setSearchTerm("");

    setAlertData((current) => ({
      ...current,
      descripcion:
        current.descripcion ||
        `Alerta de seguimiento para ${student.usuario.nombre} ${student.usuario.apellido}, estudiante de ${student.grado || "grado no especificado"} en ${student.institucion.nombre}.`,
    }));
  };

  const addFactor = (factor: string) => {
    const normalized = factor.trim();
    if (!normalized || alertData.factores.includes(normalized)) return;

    setAlertData((current) => ({
      ...current,
      factores: [...current.factores, normalized],
      factorInput: "",
    }));
  };

  const removeFactor = (factor: string) => {
    setAlertData((current) => ({
      ...current,
      factores: current.factores.filter((item) => item !== factor),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedStudent) {
      setError("Selecciona un estudiante antes de crear la alerta.");
      return;
    }

    if (!alertData.descripcion.trim()) {
      setError("La descripción de la alerta es obligatoria.");
      return;
    }

    if (alertData.factores.length === 0) {
      setError("Agrega al menos un factor asociado a la alerta.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createAlert({
        estudianteId: selectedStudent.id,
        nivelRiesgo: alertData.nivelRiesgo,
        descripcion: alertData.descripcion.trim(),
        factores: alertData.factores,
        revisada: false,
      });

      router.push("/core/alerts");
    } catch (err) {
      console.error("Error creando alerta:", err);
      setError("No fue posible crear la alerta. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <CorePage>
        <LoadingState label="Cargando estudiantes disponibles..." />
      </CorePage>
    );
  }

  return (
    <CorePage>
      <CorePageHeader
        eyebrow="Registro manual"
        title="Crear alerta"
        description="Registra una señal que requiera seguimiento, documenta los factores observados y asigna una prioridad de revisión. La alerta no constituye una decisión automática."
        actions={
          <Link
            href="/core/alerts"
            className="inline-flex min-h-11 items-center gap-3 border border-[#002930]/16 px-4 text-sm font-medium transition hover:border-[#002930]/45"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a alertas
          </Link>
        }
      />

      {error && (
        <div className="mt-6">
          <InlineNotice tone="error" title="No se pudo completar la operación">
            {error}
          </InlineNotice>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-6 xl:grid-cols-[380px_1fr]"
      >
        <Panel
          eyebrow="01"
          title="Seleccionar estudiante"
          className="self-start xl:sticky xl:top-[100px]"
        >
          <div className="p-5">
            {selectedStudent ? (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#002930]/14 text-sm font-medium text-[#AC4A00]">
                      {selectedStudent.usuario.nombre.charAt(0)}
                      {selectedStudent.usuario.apellido.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {selectedStudent.usuario.nombre}{" "}
                        {selectedStudent.usuario.apellido}
                      </p>
                      <p className="mt-1 truncate text-xs text-[#002930]/42">
                        {selectedStudent.institucion.nombre}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedStudent(null)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#002930]/14"
                    aria-label="Cambiar estudiante"
                    title="Cambiar estudiante"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-px border border-[#002930]/12 bg-[#002930]/12">
                  <StudentDatum
                    label="Grado"
                    value={selectedStudent.grado || "Sin grado"}
                  />
                  <StudentDatum
                    label="Edad"
                    value={`${selectedStudent.edad} años`}
                  />
                  <StudentDatum
                    label="Etnia"
                    value={getEthnicityLabel(selectedStudent.etnia)}
                  />
                  <StudentDatum
                    label="Riesgo actual"
                    value={`${getRiskLevel(
                      selectedStudent.riesgoDesercion
                    )} · ${(
                      selectedStudent.riesgoDesercion * 100
                    ).toFixed(0)}%`}
                  />
                </div>

                <Link
                  href={`/core/students/${selectedStudent.id}`}
                  className="mt-4 inline-flex min-h-10 items-center text-xs font-medium text-[#AC4A00] underline decoration-[#AC4A00]/30 underline-offset-4"
                >
                  Abrir trayectoria completa
                </Link>
              </div>
            ) : (
              <>
                <FieldLabel htmlFor="student-search">
                  Buscar estudiante
                </FieldLabel>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#002930]/35" />
                  <input
                    id="student-search"
                    type="search"
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                    placeholder="Nombre, correo o institución"
                    className={inputClass + " pl-10"}
                  />
                </div>

                <div className="mt-4 border-t border-[#002930]/12">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <button
                        key={student.id}
                        type="button"
                        onClick={() => selectStudent(student)}
                        className="grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-b border-[#002930]/10 py-3 text-left transition hover:bg-white/25"
                      >
                        <span className="flex h-9 w-9 items-center justify-center border border-[#002930]/12 text-xs font-medium text-[#AC4A00]">
                          {student.usuario?.nombre?.charAt(0) || ""}
                          {student.usuario?.apellido?.charAt(0) || ""}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium">
                            {student.usuario?.nombre || ""}{" "}
                            {student.usuario?.apellido || ""}
                          </span>
                          <span className="mt-1 block truncate text-[10px] text-[#002930]/40">
                            {student.institucion?.nombre ||
                              "Sin institución"}
                          </span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.14em] text-[#002930]/32">
                          {getRiskLevel(student.riesgoDesercion)}
                        </span>
                      </button>
                    ))
                  ) : (
                    <EmptyState
                      title="Sin coincidencias"
                      description="No encontramos estudiantes con ese término de búsqueda."
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </Panel>

        <Panel className="overflow-hidden">
          <section className="border-b border-[#002930]/14 px-5 py-7 md:px-6">
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#AC4A00]">
              02 · Prioridad
            </p>
            <h2 className="mt-2 text-lg font-medium tracking-[-0.025em]">
              Nivel de revisión
            </h2>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-[#002930]/45">
              Selecciona la prioridad con base en la evidencia disponible.
            </p>

            <div className="mt-5 grid gap-px border border-[#002930]/12 bg-[#002930]/12 sm:grid-cols-2 xl:grid-cols-4">
              {riskOptions.map((option) => {
                const active =
                  alertData.nivelRiesgo === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setAlertData((current) => ({
                        ...current,
                        nivelRiesgo: option.value,
                      }))
                    }
                    className={
                      "min-h-28 bg-[#F8F0AF] p-4 text-left transition " +
                      (active
                        ? "bg-[#002930] text-white"
                        : "hover:bg-white/30")
                    }
                  >
                    <p
                      className={
                        "text-[9px] uppercase tracking-[0.16em] " +
                        (active
                          ? "text-[#F8F0AF]"
                          : "text-[#AC4A00]")
                      }
                    >
                      {option.value}
                    </p>
                    <p className="mt-3 text-base font-medium">
                      {option.label}
                    </p>
                    <p
                      className={
                        "mt-1 text-xs " +
                        (active
                          ? "text-white/45"
                          : "text-[#002930]/42")
                      }
                    >
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="border-b border-[#002930]/14 px-5 py-7 md:px-6">
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#AC4A00]">
              03 · Descripción
            </p>
            <div className="mt-5">
              <FieldLabel htmlFor="alert-description">
                Descripción de la situación
              </FieldLabel>
              <textarea
                id="alert-description"
                value={alertData.descripcion}
                onChange={(event) =>
                  setAlertData((current) => ({
                    ...current,
                    descripcion: event.target.value,
                  }))
                }
                rows={6}
                required
                className={inputClass + " resize-y"}
                placeholder="Describe qué se observó, cuándo ocurrió y por qué requiere seguimiento."
              />
            </div>
          </section>

          <section className="px-5 py-7 md:px-6">
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#AC4A00]">
              04 · Evidencia
            </p>
            <h2 className="mt-2 text-lg font-medium tracking-[-0.025em]">
              Factores asociados
            </h2>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-[#002930]/45">
              Documenta factores observados sin convertir atributos de identidad
              en causas automáticas de riesgo.
            </p>

            {alertData.factores.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {alertData.factores.map((factor) => (
                  <button
                    key={factor}
                    type="button"
                    onClick={() => removeFactor(factor)}
                    className="inline-flex min-h-9 items-center gap-2 border border-[#002930]/16 px-3 text-xs transition hover:border-[#8f2f20]/40 hover:text-[#8f2f20]"
                    title="Quitar factor"
                  >
                    {factor}
                    <X className="h-3.5 w-3.5" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-5">
              <p className="text-[9px] uppercase tracking-[0.16em] text-[#002930]/38">
                Factores frecuentes
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {FACTORES_RIESGO.map((factor) => {
                  const selected =
                    alertData.factores.includes(factor);

                  return (
                    <button
                      key={factor}
                      type="button"
                      disabled={selected}
                      onClick={() => addFactor(factor)}
                      className="min-h-9 border border-[#002930]/12 px-3 text-xs text-[#002930]/58 transition hover:border-[#002930]/35 disabled:cursor-not-allowed disabled:bg-[#002930] disabled:text-white"
                    >
                      {selected ? "✓ " : "+ "}
                      {factor}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <FieldLabel htmlFor="custom-factor">
                Agregar factor personalizado
              </FieldLabel>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  id="custom-factor"
                  type="text"
                  value={alertData.factorInput}
                  onChange={(event) =>
                    setAlertData((current) => ({
                      ...current,
                      factorInput: event.target.value,
                    }))
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addFactor(alertData.factorInput);
                    }
                  }}
                  className={inputClass}
                  placeholder="Escribe un factor observado"
                />
                <button
                  type="button"
                  onClick={() => addFactor(alertData.factorInput)}
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-[#002930]/16 px-4 text-sm font-medium"
                >
                  <Plus className="h-4 w-4" />
                  Agregar
                </button>
              </div>
            </div>

            <div className="mt-6">
              <InlineNotice tone="warning" title="Criterio de uso">
                La pertenencia étnica no se presenta como factor de riesgo por sí
                misma. Si existe una barrera cultural, lingüística, territorial o
                institucional, registra la barrera concreta observada.
              </InlineNotice>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 border-t border-[#002930]/14 px-5 py-5 sm:flex-row sm:items-center sm:justify-end">
            <Link
              href="/core/alerts"
              className="inline-flex min-h-11 items-center justify-center border border-[#002930]/16 px-5 text-sm font-medium"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || !selectedStudent}
              className="inline-flex min-h-11 items-center justify-center gap-3 bg-[#AC4A00] px-5 text-sm font-medium text-white transition hover:bg-[#D45A10] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Creando alerta...
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4" />
                  Crear alerta
                </>
              )}
            </button>
          </div>
        </Panel>
      </form>
    </CorePage>
  );
}

function StudentDatum({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#F8F0AF] p-3">
      <p className="text-[9px] uppercase tracking-[0.14em] text-[#002930]/35">
        {label}
      </p>
      <p className="mt-1 text-xs leading-5 text-[#002930]">{value}</p>
    </div>
  );
}

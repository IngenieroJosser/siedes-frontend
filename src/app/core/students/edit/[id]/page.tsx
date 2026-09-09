"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  LoaderCircle,
  Save,
  ShieldCheck,
} from "lucide-react";
import {
  Institution,
  Student,
  UpdateStudentData,
} from "@/lib/type";
import { getInstitutions } from "@/services/institution";
import { getStudentById, updateStudent } from "@/services/students";
import {
  CorePage,
  CorePageHeader,
  DetailItem,
  ErrorState,
  FieldLabel,
  FormSection,
  InlineNotice,
  LoadingState,
  Panel,
  inputClass,
} from "@/components/core/CoreUI";

type FormState = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  edad: string;
  genero: string;
  etnia: string;
  grado: string;
  institucionId: string;
};

const riskMeta = {
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

const getRiskLevel = (value: number) => {
  if (value >= 0.8) return "CRITICO";
  if (value >= 0.6) return "ALTO";
  if (value >= 0.4) return "MEDIO";
  return "BAJO";
};

const ethnicityOptions = [
  ["NINGUNA", "No se autorreconoce en grupo étnico"],
  ["AFRODESCENDIENTE", "Afrocolombiano(a) / afrodescendiente"],
  ["INDIGENA", "Pueblos indígenas"],
  ["ROM", "Pueblo Rrom / gitano"],
  ["RAIZAL", "Raizal"],
  ["PALENQUERO", "Palenquero"],
] as const;

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [formData, setFormData] = useState<FormState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [studentData, institutionData] = await Promise.all([
        getStudentById(studentId),
        getInstitutions(),
      ]);

      setStudent(studentData);
      setInstitutions(institutionData || []);
      setFormData({
        nombre: studentData.usuario.nombre || "",
        apellido: studentData.usuario.apellido || "",
        email: studentData.usuario.email || "",
        telefono: studentData.usuario.telefono || "",
        edad: String(studentData.edad ?? ""),
        genero: studentData.genero || "",
        etnia: studentData.etnia || "NINGUNA",
        grado: studentData.grado || "",
        institucionId: studentData.institucionId || "",
      });
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
      loadData();
    }
  }, [studentId]);

  const risk = useMemo(() => {
    if (!student) return riskMeta.BAJO;
    return riskMeta[getRiskLevel(student.riesgoDesercion)];
  }, [student]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((current) =>
      current
        ? {
            ...current,
            [name]: value,
          }
        : current
    );
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!student || !formData) return;

    const age = Number.parseInt(formData.edad, 10);

    if (!Number.isFinite(age) || age < 5 || age > 30) {
      setError("La edad debe estar entre 5 y 30 años.");
      return;
    }

    if (!formData.institucionId) {
      setError("Selecciona una institución educativa.");
      return;
    }

    const payload: UpdateStudentData = {
      edad: age,
      genero: formData.genero,
      etnia: formData.etnia,
      grado: formData.grado.trim(),
      institucionId: formData.institucionId,
      riesgoDesercion: student.riesgoDesercion,
      usuario: {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim() || undefined,
      },
    };

    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      await updateStudent(student.id, payload);

      setSuccess("Los cambios del estudiante se guardaron correctamente.");

      window.setTimeout(() => {
        router.push(`/core/students/${student.id}`);
        router.refresh();
      }, 900);
    } catch (err) {
      console.error("Error actualizando estudiante:", err);
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible guardar los cambios."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <CorePage>
        <LoadingState label="Cargando datos para edición..." />
      </CorePage>
    );
  }

  if (!student || !formData) {
    return (
      <CorePage>
        <ErrorState
          title="No fue posible editar el estudiante"
          message={error || "El estudiante no existe o no está disponible."}
          onRetry={loadData}
        />
      </CorePage>
    );
  }

  return (
    <CorePage>
      <CorePageHeader
        eyebrow="Edición de trayectoria"
        title="Editar estudiante"
        description="Actualiza datos de identidad y trayectoria que el backend permite modificar. El contexto y el riesgo se muestran como referencia cuando no existe un contrato de actualización específico."
        actions={
          <Link
            href={`/core/students/${student.id}`}
            className="inline-flex min-h-11 items-center gap-3 border border-[#002930]/16 px-4 text-sm font-medium transition hover:border-[#002930]/45"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al detalle
          </Link>
        }
      />

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_300px]">
        <Panel className="overflow-hidden">
          <form onSubmit={handleSubmit}>
            {(error || success) && (
              <div className="border-b border-[#002930]/12 p-5">
                {error && (
                  <InlineNotice tone="error" title="No se pudieron guardar los cambios">
                    {error}
                  </InlineNotice>
                )}
                {success && (
                  <InlineNotice tone="success" title="Cambios guardados">
                    {success}
                  </InlineNotice>
                )}
              </div>
            )}

            <FormSection
              index="01"
              title="Identidad y contacto"
              description="Datos de cuenta visibles en la trayectoria del estudiante."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Teléfono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Opcional"
                />
              </div>
            </FormSection>

            <FormSection
              index="02"
              title="Trayectoria educativa"
              description="Información que ubica al estudiante dentro de su proceso académico."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  label="Edad"
                  name="edad"
                  type="number"
                  value={formData.edad}
                  onChange={handleChange}
                  required
                  min={5}
                  max={30}
                />

                <div>
                  <FieldLabel htmlFor="grado">Grado *</FieldLabel>
                  <select
                    id="grado"
                    name="grado"
                    value={formData.grado}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Seleccionar grado</option>
                    {["6°", "7°", "8°", "9°", "10°", "11°"].map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel htmlFor="genero">Género *</FieldLabel>
                  <select
                    id="genero"
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Seleccionar</option>
                    <option value="FEMENINO">Femenino</option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="NO_BINARIO">No binario</option>
                    <option value="OTRO">Otro</option>
                    <option value="PREFIERO_NO_DECIR">Prefiero no decir</option>
                  </select>
                </div>

                <div>
                  <FieldLabel htmlFor="etnia">
                    Autorreconocimiento étnico *
                  </FieldLabel>
                  <select
                    id="etnia"
                    name="etnia"
                    value={formData.etnia}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    {ethnicityOptions.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-xs leading-5 text-[#002930]/42">
                    Se conserva como variable contextual y de auditoría de equidad,
                    no como causa automática de riesgo.
                  </p>
                </div>

                <div className="md:col-span-2">
                  <FieldLabel htmlFor="institucionId">
                    Institución educativa *
                  </FieldLabel>
                  <select
                    id="institucionId"
                    name="institucionId"
                    value={formData.institucionId}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Seleccionar institución</option>
                    {institutions.map((institution) => (
                      <option key={institution.id} value={institution.id}>
                        {institution.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </FormSection>

            <FormSection
              index="03"
              title="Datos no editables desde este formulario"
              description="Información visible para referencia pero sin endpoint de actualización incluido en el contrato actual."
            >
              <div className="grid gap-px border border-[#002930]/12 bg-[#002930]/12 sm:grid-cols-2">
                <ReadOnlyCard
                  label="Riesgo registrado"
                  value={
                    <div className={"border-l-2 pl-3 " + risk.border}>
                      <div className="flex items-baseline gap-3">
                        <span className={"font-medium " + risk.text}>
                          {risk.label}
                        </span>
                        <span className="text-xs text-[#002930]/45">
                          {(student.riesgoDesercion * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="mt-2 h-px bg-[#002930]/12">
                        <div
                          className={"h-px " + risk.bar}
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(0, student.riesgoDesercion * 100)
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  }
                />

                <ReadOnlyCard
                  label="Contexto"
                  value={
                    student.contexto
                      ? "Disponible en la trayectoria"
                      : "No registrado"
                  }
                />
              </div>

              <div className="mt-5">
                <InlineNotice tone="info" title="Contrato actual del backend">
                  El DTO de actualización de estudiante permite modificar identidad,
                  edad, género, etnia, grado e institución. Por eso este formulario
                  no aparenta guardar cambios de contexto que el backend no persiste.
                </InlineNotice>
              </div>
            </FormSection>

            <div className="flex flex-col-reverse gap-3 border-t border-[#002930]/14 px-5 py-5 sm:flex-row sm:items-center sm:justify-end">
              <Link
                href={`/core/students/${student.id}`}
                className="inline-flex min-h-11 items-center justify-center border border-[#002930]/16 px-5 text-sm font-medium transition hover:border-[#002930]/45"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex min-h-11 items-center justify-center gap-3 bg-[#AC4A00] px-5 text-sm font-medium text-white transition hover:bg-[#D45A10] disabled:cursor-not-allowed disabled:opacity-45"
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Guardar cambios
                  </>
                )}
              </button>
            </div>
          </form>
        </Panel>

        <aside className="space-y-4 xl:sticky xl:top-[100px] xl:self-start">
          <div className="border border-[#002930]/14 bg-[#002930] p-5 text-white">
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#F8F0AF]">
              Estudiante
            </p>
            <h2 className="mt-3 text-xl font-medium tracking-[-0.03em]">
              {student.usuario.nombre} {student.usuario.apellido}
            </h2>
            <p className="mt-2 text-xs leading-5 text-white/45">
              {student.institucion?.nombre || "Sin institución"}
            </p>

            <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
              <SideRow label="ID" value={student.id} mono />
              <SideRow
                label="Estado"
                value={student.activo ? "Activo" : "Inactivo"}
              />
              <SideRow label="Registro" value={student.creadoEn.slice(0, 10)} />
            </div>
          </div>

          <div className="flex items-start gap-3 border-l-2 border-[#AC4A00] bg-[#F8F0AF] px-4 py-4">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#AC4A00]" />
            <p className="text-xs leading-5 text-[#002930]/50">
              Verifica que los cambios correspondan a información confirmada y
              necesaria para el seguimiento educativo.
            </p>
          </div>

          <div className="border border-[#002930]/14 bg-[#F8F0AF] p-5">
            <p className="text-[9px] uppercase tracking-[0.17em] text-[#AC4A00]">
              Antes de guardar
            </p>
            <div className="mt-5 space-y-4">
              {[
                "Revisa nombre, correo y grado.",
                "Confirma la institución educativa.",
                "No modifiques datos para alterar artificialmente la lectura de riesgo.",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#AC4A00]" />
                  <p className="text-xs leading-5 text-[#002930]/52">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </CorePage>
  );
}

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <FieldLabel htmlFor={name}>
        {label}
        {required ? " *" : ""}
      </FieldLabel>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        className={inputClass}
      />
    </div>
  );
}

function ReadOnlyCard({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="bg-[#F8F0AF] p-4">
      <p className="text-[9px] uppercase tracking-[0.15em] text-[#002930]/36">
        {label}
      </p>
      <div className="mt-3 text-sm leading-6 text-[#002930]">{value}</div>
    </div>
  );
}

function SideRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="grid grid-cols-[4rem_1fr] gap-3 text-xs">
      <span className="text-white/30">{label}</span>
      <span
        className={
          "break-all text-right text-white/65 " + (mono ? "font-mono text-[10px]" : "")
        }
      >
        {value}
      </span>
    </div>
  );
}

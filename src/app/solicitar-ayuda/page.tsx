"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Search,
  ShieldCheck,
  UserRoundSearch,
} from "lucide-react";
import { requestQuickHelp } from "@/services/help";
import { getInstitutions } from "@/services/institution";
import { getStudentsByInstitution } from "@/services/students";
import {
  Institution,
  MotivoSolicitud,
  QuickHelpRequest,
  Student,
  TipoSolicitante,
} from "@/lib/type";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

interface HelpFormState {
  tipoSolicitante: TipoSolicitante | "";
  nombre: string;
  email: string;
  telefono: string;
  institucionId: string;
  estudianteId: string;
  motivoSolicitud: MotivoSolicitud | "";
  descripcion: string;
}

const inputClass =
  "min-h-12 w-full border border-[#002930]/20 bg-transparent px-4 py-3 text-sm text-[#002930] outline-none transition placeholder:text-[#002930]/30 focus:border-[#002930] disabled:cursor-not-allowed disabled:opacity-50";

const requesterOptions = [
  [TipoSolicitante.DOCENTE, "Docente"],
  [TipoSolicitante.ESTUDIANTE, "Estudiante"],
  [TipoSolicitante.FAMILIAR, "Familiar"],
  [TipoSolicitante.INSTITUCION, "Institución"],
] as const;

const reasonOptions = [
  [MotivoSolicitud.BAJO_RENDIMIENTO, "Bajo rendimiento académico"],
  [MotivoSolicitud.INASISTENCIA, "Inasistencia frecuente"],
  [MotivoSolicitud.PROBLEMAS_FAMILIARES, "Situación familiar"],
  [MotivoSolicitud.PROBLEMAS_ECONOMICOS, "Situación económica"],
  [MotivoSolicitud.ACOSO_ESCOLAR, "Acoso escolar"],
  [MotivoSolicitud.OTROS, "Otro motivo"],
] as const;

export default function SolicitaAyuda() {
  const [formData, setFormData] = useState<HelpFormState>({
    tipoSolicitante: "",
    nombre: "",
    email: "",
    telefono: "",
    institucionId: "",
    estudianteId: "",
    motivoSolicitud: "",
    descripcion: "",
  });
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoadingInstitutions, setIsLoadingInstitutions] = useState(true);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadInstitutions = async () => {
      try {
        const data = await getInstitutions();
        setInstitutions(data);
      } catch (err) {
        console.error("Error al cargar instituciones:", err);
        setError("No fue posible cargar la lista de instituciones.");
      } finally {
        setIsLoadingInstitutions(false);
      }
    };

    loadInstitutions();
  }, []);

  useEffect(() => {
    const loadStudents = async () => {
      if (!formData.institucionId) {
        setStudents([]);
        return;
      }

      try {
        setIsLoadingStudents(true);
        const data = await getStudentsByInstitution(formData.institucionId);
        setStudents(data);
      } catch (err) {
        console.error("Error al cargar estudiantes:", err);
        setError("No fue posible cargar la lista de estudiantes.");
      } finally {
        setIsLoadingStudents(false);
      }
    };

    loadStudents();
  }, [formData.institucionId]);

  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) return students;

    const term = searchTerm.toLowerCase().trim();

    return students.filter(
      (student) =>
        student.nombre.toLowerCase().includes(term) ||
        student.apellido.toLowerCase().includes(term) ||
        student.grado?.toLowerCase().includes(term) ||
        student.identificacion?.toLowerCase().includes(term)
    );
  }, [students, searchTerm]);

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => {
      if (name === "institucionId") {
        return {
          ...current,
          institucionId: value,
          estudianteId: "",
        };
      }

      return {
        ...current,
        [name]: value,
      };
    });

    if (name === "institucionId") setSearchTerm("");
    if (error) setError(null);
  };

  const setRequester = (value: string) => {
    setFormData((current) => ({
      ...current,
      tipoSolicitante: Number(value) as TipoSolicitante,
    }));
    if (error) setError(null);
  };

  const setReason = (value: string) => {
    setFormData((current) => ({
      ...current,
      motivoSolicitud: value === "" ? "" : (Number(value) as MotivoSolicitud),
    }));
    if (error) setError(null);
  };

  const handleStudentSelect = (studentId: string) => {
    setFormData((current) => ({
      ...current,
      estudianteId: studentId,
    }));
    setSearchTerm("");
    if (error) setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      formData.tipoSolicitante === "" ||
      formData.motivoSolicitud === "" ||
      !formData.institucionId ||
      !formData.estudianteId
    ) {
      setError("Completa el tipo de solicitante, el motivo, la institución y el estudiante.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const payload: QuickHelpRequest = {
      estudianteId: formData.estudianteId,
      motivo: formData.motivoSolicitud,
      descripcion: formData.descripcion,
      solicitante: formData.tipoSolicitante,
      informacionContacto: {
        nombre: formData.nombre,
        email: formData.email,
        ...(formData.telefono ? { telefono: formData.telefono } : {}),
      },
    };

    try {
      await requestQuickHelp(payload);
      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error("Error al enviar solicitud:", err);
      const apiError = err as ApiError;
      setError(
        apiError.response?.data?.message ||
          apiError.message ||
          "No fue posible registrar la solicitud. Intenta nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedStudent = students.find(
    (student) => student.id === formData.estudianteId
  );

  if (isSubmitted) {
    return (
      <div className="min-h-[calc(100vh-72px)] bg-[#001c22] px-5 py-16 text-white sm:px-6 md:py-24">
        <div className="mx-auto max-w-4xl border border-white/10 bg-[#002930]">
          <div className="grid lg:grid-cols-[.72fr_1.28fr]">
            <div className="border-b border-white/10 bg-[#F8F0AF] p-8 text-[#002930] lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex h-14 w-14 items-center justify-center border border-[#002930]/20">
                <CheckCircle2 className="h-7 w-7 text-[#AC4A00]" />
              </div>
              <p className="mt-10 text-[10px] uppercase tracking-[0.2em] text-[#AC4A00]">
                Estado
              </p>
              <p className="mt-2 text-2xl font-medium">Solicitud registrada</p>
            </div>

            <div className="p-8 md:p-10 lg:p-12">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#F8F0AF]">
                SIEDES / Solicitud de apoyo
              </p>
              <h1 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.045em] md:text-5xl">
                La información fue recibida.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/60">
                {formData.nombre
                  ? `${formData.nombre}, el equipo podrá revisar la solicitud y continuar el proceso de atención según la ruta disponible.`
                  : "El equipo podrá revisar la solicitud y continuar el proceso de atención según la ruta disponible."}
              </p>

              <div className="mt-8 flex items-start gap-3 border-l border-[#F8F0AF]/20 pl-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#F8F0AF]" />
                <p className="text-sm leading-6 text-white/50">
                  Conserva únicamente la información necesaria para el seguimiento
                  del caso y evita compartir datos sensibles por canales no
                  autorizados.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="group inline-flex min-h-12 items-center justify-between gap-8 bg-[#F8F0AF] px-5 py-3 text-sm font-medium text-[#002930] transition hover:bg-white"
                >
                  Volver al inicio
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/como-funciona"
                  className="group inline-flex min-h-12 items-center justify-between gap-8 border border-white/20 px-5 py-3 text-sm font-medium transition hover:border-[#F8F0AF]/50 hover:text-[#F8F0AF]"
                >
                  Ver cómo funciona
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001c22] text-white">
      <section className="relative isolate border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(248,240,175,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,240,175,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute -right-36 -top-40 h-[32rem] w-[32rem] rounded-full border border-[#F8F0AF]/10" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 md:py-20 lg:grid-cols-[1fr_.72fr] lg:items-end lg:px-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#F8F0AF]">
              Solicitar apoyo
            </p>
            <h1 className="mt-5 max-w-4xl text-[clamp(3rem,7vw,6.2rem)] font-medium leading-[0.92] tracking-[-0.055em]">
              Registrar una señal
              <span className="block text-[#F8F0AF]">para poder actuar.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/60">
              Usa este formulario para registrar una situación que requiera
              revisión. La solicitud se asocia a una institución y a un estudiante
              existente en SIEDES.
            </p>
          </div>

          <div className="border-l border-white/10 pl-6">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              Antes de enviar
            </p>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Describe hechos relevantes y evita incluir información que no sea
              necesaria para comprender la situación educativa.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F0AF] py-14 text-[#002930] md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[.68fr_1.32fr] lg:gap-16 lg:px-8">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#AC4A00]">
              Ruta de solicitud
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em]">
              Información mínima para revisar el caso.
            </h2>

            <div className="mt-8 border-t border-[#002930]/15">
              {[
                ["01", "Solicitante", "Quién registra la situación"],
                ["02", "Contexto", "Institución y estudiante"],
                ["03", "Motivo", "Qué requiere revisión"],
                ["04", "Detalle", "Información para comprender el caso"],
              ].map(([number, label, description]) => (
                <div
                  key={number}
                  className="grid grid-cols-[2rem_1fr] gap-3 border-b border-[#002930]/15 py-4"
                >
                  <span className="text-[10px] tracking-[0.16em] text-[#AC4A00]">
                    {number}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="mt-1 text-xs text-[#002930]/45">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-3 border-l border-[#002930]/15 pl-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#AC4A00]" />
              <p className="text-xs leading-5 text-[#002930]/45">
                La solicitud no sustituye los protocolos institucionales o rutas
                de atención que correspondan a una situación urgente.
              </p>
            </div>
          </aside>

          <div>
            {error && (
              <div
                role="alert"
                className="mb-6 border border-[#AC4A00]/30 bg-[#AC4A00]/5 px-4 py-3 text-sm leading-6 text-[#7d3500]"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="border border-[#002930]/15">
              <FormSection number="01" title="Datos del solicitante">
                <div className="grid gap-5 md:grid-cols-2">
                  <FormField label="Quién solicita ayuda" htmlFor="tipoSolicitante" required>
                    <select
                      id="tipoSolicitante"
                      name="tipoSolicitante"
                      value={formData.tipoSolicitante}
                      onChange={(event) => setRequester(event.target.value)}
                      className={inputClass}
                      required
                    >
                      <option value="">Seleccionar</option>
                      {requesterOptions.map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Nombre completo" htmlFor="nombre" required>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      value={formData.nombre}
                      onChange={handleTextChange}
                      className={inputClass}
                      required
                    />
                  </FormField>

                  <FormField label="Correo electrónico" htmlFor="email" required>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleTextChange}
                      className={inputClass}
                      required
                    />
                  </FormField>

                  <FormField label="Teléfono" htmlFor="telefono">
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleTextChange}
                      className={inputClass}
                    />
                  </FormField>
                </div>
              </FormSection>

              <FormSection number="02" title="Institución y estudiante">
                <FormField label="Institución educativa" htmlFor="institucionId" required>
                  <select
                    id="institucionId"
                    name="institucionId"
                    value={formData.institucionId}
                    onChange={handleTextChange}
                    className={inputClass}
                    disabled={isLoadingInstitutions}
                    required
                  >
                    <option value="">
                      {isLoadingInstitutions
                        ? "Cargando instituciones..."
                        : "Seleccionar institución"}
                    </option>
                    {institutions.map((institution) => (
                      <option key={institution.id} value={institution.id}>
                        {institution.nombre}
                      </option>
                    ))}
                  </select>
                </FormField>

                <div className="mt-6">
                  <label
                    htmlFor="student-search"
                    className="text-[10px] uppercase tracking-[0.16em] text-[#002930]/55"
                  >
                    Buscar estudiante *
                  </label>
                  <div className="relative mt-2">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#002930]/35" />
                    <input
                      id="student-search"
                      type="search"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      className={inputClass + " pl-11"}
                      disabled={!formData.institucionId || isLoadingStudents}
                      placeholder={
                        !formData.institucionId
                          ? "Selecciona primero una institución"
                          : "Nombre, apellido, grado o identificación"
                      }
                    />
                  </div>

                  <div className="mt-3 max-h-64 overflow-y-auto border border-[#002930]/15">
                    {!formData.institucionId ? (
                      <EmptyStudentState text="Selecciona una institución para consultar estudiantes." />
                    ) : isLoadingStudents ? (
                      <EmptyStudentState text="Cargando estudiantes..." />
                    ) : filteredStudents.length === 0 ? (
                      <EmptyStudentState text="No se encontraron estudiantes para los criterios actuales." />
                    ) : (
                      filteredStudents.map((student) => {
                        const selected = formData.estudianteId === student.id;
                        return (
                          <button
                            type="button"
                            key={student.id}
                            onClick={() => handleStudentSelect(student.id)}
                            className={
                              "grid w-full grid-cols-[1fr_auto] items-center gap-4 border-b border-[#002930]/10 px-4 py-4 text-left transition last:border-b-0 " +
                              (selected
                                ? "bg-[#002930] text-white"
                                : "hover:bg-[#002930]/5")
                            }
                          >
                            <span>
                              <span className="block text-sm font-medium">
                                {student.nombre} {student.apellido}
                              </span>
                              <span
                                className={
                                  "mt-1 block text-xs " +
                                  (selected ? "text-white/50" : "text-[#002930]/45")
                                }
                              >
                                {student.grado ? `Grado: ${student.grado}` : "Grado sin registrar"}
                                {student.identificacion
                                  ? ` · ID: ${student.identificacion}`
                                  : ""}
                              </span>
                            </span>
                            {selected && (
                              <CheckCircle2 className="h-4 w-4 text-[#F8F0AF]" />
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>

                  {selectedStudent && (
                    <div className="mt-3 flex items-center justify-between gap-4 border-l-2 border-[#AC4A00] bg-[#AC4A00]/5 px-4 py-3">
                      <p className="text-sm">
                        Seleccionado:{" "}
                        <strong>
                          {selectedStudent.nombre} {selectedStudent.apellido}
                        </strong>
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((current) => ({
                            ...current,
                            estudianteId: "",
                          }))
                        }
                        className="text-xs text-[#AC4A00] underline underline-offset-4"
                      >
                        Cambiar
                      </button>
                    </div>
                  )}
                </div>
              </FormSection>

              <FormSection number="03" title="Motivo y descripción">
                <FormField label="Motivo principal" htmlFor="motivoSolicitud" required>
                  <select
                    id="motivoSolicitud"
                    name="motivoSolicitud"
                    value={formData.motivoSolicitud}
                    onChange={(event) => setReason(event.target.value)}
                    className={inputClass}
                    required
                  >
                    <option value="">Seleccionar</option>
                    {reasonOptions.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </FormField>

                <div className="mt-6">
                  <FormField
                    label="Descripción de la situación"
                    htmlFor="descripcion"
                    required
                    hint="Incluye hechos relevantes para comprender el caso, evitando información innecesaria."
                  >
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      rows={6}
                      value={formData.descripcion}
                      onChange={handleTextChange}
                      className={inputClass}
                      required
                    />
                  </FormField>
                </div>
              </FormSection>

              <div className="flex flex-col gap-4 border-t border-[#002930]/15 bg-[#002930] p-5 text-white sm:flex-row sm:items-center sm:justify-between md:p-6">
                <p className="max-w-lg text-xs leading-5 text-white/45">
                  Al enviar, la información será utilizada para registrar y
                  gestionar la solicitud dentro del propósito educativo del sistema.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex min-h-12 items-center justify-between gap-8 bg-[#AC4A00] px-5 text-sm font-medium text-white transition hover:bg-[#D45A10] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Registrando..." : "Registrar solicitud"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>

            <div className="mt-8 grid gap-px border border-[#002930]/15 bg-[#002930]/15 sm:grid-cols-2">
              <a
                href="mailto:siedes.uib@gmail.com"
                className="group flex items-center gap-4 bg-[#F8F0AF] p-4 transition hover:bg-white/40"
              >
                <Mail className="h-4 w-4 text-[#AC4A00]" />
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-[#002930]/40">
                    Correo
                  </p>
                  <p className="mt-1 text-sm">siedes.uib@gmail.com</p>
                </div>
              </a>
              <a
                href="tel:+573232842193"
                className="group flex items-center gap-4 bg-[#F8F0AF] p-4 transition hover:bg-white/40"
              >
                <UserRoundSearch className="h-4 w-4 text-[#AC4A00]" />
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-[#002930]/40">
                    Contacto
                  </p>
                  <p className="mt-1 text-sm">+57 323 284 2193</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[#002930]/15 p-5 last:border-b-0 md:p-7">
      <div className="mb-7 flex items-center gap-4">
        <span className="text-[10px] tracking-[0.16em] text-[#AC4A00]">
          {number}
        </span>
        <span className="h-px w-8 bg-[#002930]/20" />
        <h3 className="text-sm font-medium uppercase tracking-[0.1em]">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function FormField({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-[10px] uppercase tracking-[0.16em] text-[#002930]/55"
      >
        {label}
        {required ? " *" : ""}
      </label>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-2 text-xs leading-5 text-[#002930]/40">{hint}</p>}
    </div>
  );
}

function EmptyStudentState({ text }: { text: string }) {
  return (
    <div className="flex min-h-24 items-center justify-center px-4 py-6 text-center">
      <p className="text-sm text-[#002930]/45">{text}</p>
    </div>
  );
}

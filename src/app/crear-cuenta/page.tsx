"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  LockKeyhole,
  ShieldCheck,
  UserRoundPlus,
} from "lucide-react";
import {
  Etnia_Enum,
  Institution,
  RegisterRequest,
  Rol,
} from "@/lib/type";
import { register } from "@/services/auth";
import { getInstitutions } from "@/services/institution";

interface ApiError {
  message?: string;
}

const inputClass =
  "min-h-12 w-full border border-[#002930]/20 bg-transparent px-4 py-3 text-sm text-[#002930] outline-none transition placeholder:text-[#002930]/30 focus:border-[#002930] disabled:cursor-not-allowed disabled:opacity-50";



const roleOptions = [
  [Rol.ESTUDIANTE, "Estudiante"],
  [Rol.DOCENTE, "Docente"],
  [Rol.PADRE, "Padre / madre de familia"],
  [Rol.COORDINADOR, "Coordinador"],
  [Rol.LIDER_COMUNITARIO, "Líder comunitario"],
] as const;

const ethnicityOptions = [
  [Etnia_Enum.NINGUNA, "No me identifico con una de estas opciones"],
  [Etnia_Enum.AFRODESCENDIENTE, "Afrodescendiente"],
  [Etnia_Enum.INDIGENA, "Indígena"],
  [Etnia_Enum.ROM, "Pueblo Rrom"],
  [Etnia_Enum.RAIZAL, "Raizal"],
  [Etnia_Enum.PALENQUERO, "Palenquero"],
] as const;

function isApiError(error: unknown): error is ApiError {
  return typeof error === "object" && error !== null && "message" in error;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterRequest>({
    nombre: "",
    apellido: "",
    email: "",
    identificacion: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    rol: Rol.ESTUDIANTE,
    edad: 0,
    genero: "",
    etnia: Etnia_Enum.NINGUNA,
    grado: "",
    institucionId: "",
    distanciaEscuela: 0,
    tiempoDesplazamiento: 0,
    trabaja: false,
    horasTrabajo: 0,
    ingresosFamiliares: 0,
    personasHogar: 0,
    apoyoFamiliar: true,
    accesoInternet: false,
    dispositivoElectronico: false,
    participacionComunitaria: false,
    conocimientosAncestrales: false,
    situacionesEspeciales: "",
    necesidadesEspeciales: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const isStudent = formData.rol === Rol.ESTUDIANTE;
  const totalSteps = isStudent ? 3 : 2;

  useEffect(() => {
    const loadInstitutions = async () => {
      try {
        setLoadingInstitutions(true);
        const data = await getInstitutions();
        setInstitutions(data);
      } catch (err) {
        console.error("Error cargando instituciones:", err);
        setError("No fue posible cargar las instituciones educativas.");
      } finally {
        setLoadingInstitutions(false);
      }
    };

    loadInstitutions();
  }, []);

  useEffect(() => {
    if (!isStudent && currentStep > 2) {
      setCurrentStep(2);
    }
  }, [isStudent, currentStep]);

  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;

    const enumFields = new Set(["etnia"]);
    const numericFields = new Set([
      "edad",
      "distanciaEscuela",
      "tiempoDesplazamiento",
      "horasTrabajo",
      "ingresosFamiliares",
      "personasHogar",
    ]);

    let nextValue: string | number | boolean = value;

    if (type === "checkbox") {
      nextValue = (event.target as HTMLInputElement).checked;
    } else if (enumFields.has(name)) {
      nextValue = Number(value);
    } else if (numericFields.has(name)) {
      nextValue = value === "" ? 0 : Number(value);
    }

    setFormData((current) => ({
      ...current,
      [name]: nextValue,
    }));

    if (error) setError("");
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.nombre.trim() || !formData.apellido.trim() || !formData.email.trim()) {
        setError("Completa nombre, apellido y correo electrónico para continuar.");
        return false;
      }
    }

    if (currentStep === 2 && isStudent) {
      if (!formData.edad || !formData.genero || !formData.grado || !formData.institucionId) {
        setError("Completa los datos académicos obligatorios para continuar.");
        return false;
      }
    }

    setError("");
    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setCurrentStep((step) => Math.min(step + 1, totalSteps));
  };

  const previousStep = () => {
    setError("");
    setCurrentStep((step) => Math.max(step - 1, 1));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (isStudent && !formData.institucionId) {
      setError("Selecciona una institución educativa.");
      return;
    }

    setIsLoading(true);

    try {
      await register(formData);
      router.push("/iniciar-sesion");
    } catch (err: unknown) {
      if (isApiError(err)) {
        setError(
          err.message ||
            "No fue posible crear la cuenta. Revisa la información e intenta nuevamente."
        );
      } else {
        setError(
          "No fue posible crear la cuenta. Revisa la información e intenta nuevamente."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001c22] text-white">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[.72fr_1.28fr]">
        <aside className="relative hidden min-h-[calc(100vh-72px)] overflow-hidden border-r border-white/10 bg-[#002930] p-10 lg:block xl:p-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(248,240,175,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,240,175,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
            <div className="absolute -right-36 -top-40 h-[30rem] w-[30rem] rounded-full border border-[#F8F0AF]/10" />
          </div>

          <div className="relative sticky top-28">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center border border-[#F8F0AF]/20 bg-[#001c22]">
                <Image
                  src="/favicon-32x32.png"
                  alt=""
                  width={32}
                  height={32}
                  className="h-7 w-7 object-contain"
                />
              </span>
              <div>
                <p className="text-lg font-medium">SIEDES</p>
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                  Registro de usuario
                </p>
              </div>
            </div>

            <p className="mt-14 text-[10px] uppercase tracking-[0.22em] text-[#F8F0AF]">
              Crear cuenta
            </p>
            <h1 className="mt-5 text-5xl font-medium leading-[0.96] tracking-[-0.05em]">
              Un acceso según
              <span className="block text-[#F8F0AF]">tu rol educativo.</span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-white/55">
              El registro organiza la información necesaria para identificar tu
              rol y, en el caso de estudiantes, asociar contexto académico
              relevante al proceso de permanencia.
            </p>

            <div className="mt-10 border-t border-white/10">
              {[
                ["01", "Identidad", "Datos básicos y rol"],
                ["02", isStudent ? "Trayectoria" : "Seguridad", isStudent ? "Información académica" : "Credenciales de acceso"],
                ...(isStudent
                  ? [["03", "Contexto", "Seguridad + variables opcionales"]]
                  : []),
              ].map(([number, label, description], index) => {
                const active = currentStep === index + 1;
                const complete = currentStep > index + 1;

                return (
                  <div
                    key={number}
                    className="grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-b border-white/10 py-4"
                  >
                    <span
                      className={
                        active
                          ? "text-[10px] tracking-[0.16em] text-[#F8F0AF]"
                          : "text-[10px] tracking-[0.16em] text-white/25"
                      }
                    >
                      {number}
                    </span>
                    <div>
                      <p className={active ? "text-sm text-white" : "text-sm text-white/55"}>
                        {label}
                      </p>
                      <p className="mt-1 text-xs text-white/30">{description}</p>
                    </div>
                    {complete ? (
                      <CheckCircle2 className="h-4 w-4 text-[#F8F0AF]" />
                    ) : (
                      <span
                        className={
                          active
                            ? "h-2 w-2 bg-[#AC4A00]"
                            : "h-2 w-2 border border-white/20"
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-start gap-3 border-l border-[#F8F0AF]/20 pl-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#F8F0AF]" />
              <p className="text-xs leading-5 text-white/40">
                Solicita únicamente información necesaria para el propósito
                educativo. Los datos contextuales del estudiante se presentan como
                opcionales.
              </p>
            </div>
          </div>
        </aside>

        <main className="bg-[#F8F0AF] px-5 py-14 text-[#002930] sm:px-8 md:py-20 lg:px-12 xl:px-20">
          <div className="mx-auto w-full max-w-3xl">
            <div className="mb-10 flex items-center justify-between gap-4 lg:hidden">
              <Link href="/" className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center bg-[#002930]">
                  <Image
                    src="/favicon-32x32.png"
                    alt=""
                    width={32}
                    height={32}
                    className="h-7 w-7 object-contain"
                  />
                </span>
                <span className="text-base font-medium">SIEDES</span>
              </Link>
              <span className="text-[10px] uppercase tracking-[0.17em] text-[#AC4A00]">
                Paso {currentStep} / {totalSteps}
              </span>
            </div>

            <div className="flex items-end justify-between gap-6 border-b border-[#002930]/15 pb-7">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#AC4A00]">
                  Paso {currentStep} de {totalSteps}
                </p>
                <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] md:text-4xl">
                  {currentStep === 1 && "Identidad y rol"}
                  {currentStep === 2 && isStudent && "Trayectoria académica"}
                  {currentStep === 2 && !isStudent && "Seguridad de acceso"}
                  {currentStep === 3 && "Contexto y seguridad"}
                </h2>
              </div>
              <UserRoundPlus className="hidden h-7 w-7 text-[#AC4A00] sm:block" />
            </div>

            {error && (
              <div
                role="alert"
                className="mt-6 border border-[#AC4A00]/30 bg-[#AC4A00]/5 px-4 py-3 text-sm leading-6 text-[#7d3500]"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8">
              {currentStep === 1 && (
                <StepOne formData={formData} onChange={updateField} />
              )}

              {currentStep === 2 && isStudent && (
                <AcademicStep
                  formData={formData}
                  institutions={institutions}
                  loadingInstitutions={loadingInstitutions}
                  onChange={updateField}
                />
              )}

              {currentStep === 2 && !isStudent && (
                <SecurityFields formData={formData} onChange={updateField} />
              )}

              {currentStep === 3 && isStudent && (
                <div className="space-y-10">
                  <SecurityFields formData={formData} onChange={updateField} />
                  <ContextStep formData={formData} onChange={updateField} />
                </div>
              )}

              <div className="mt-10 flex flex-col-reverse gap-3 border-t border-[#002930]/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={previousStep}
                    className="inline-flex min-h-12 items-center justify-center gap-3 border border-[#002930]/20 px-5 text-sm font-medium transition hover:border-[#002930]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Volver
                  </button>
                ) : (
                  <Link
                    href="/iniciar-sesion"
                    className="inline-flex min-h-12 items-center justify-center border border-[#002930]/20 px-5 text-sm font-medium transition hover:border-[#002930]"
                  >
                    Ya tengo cuenta
                  </Link>
                )}

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="group inline-flex min-h-12 items-center justify-between gap-8 bg-[#AC4A00] px-5 text-sm font-medium text-white transition hover:bg-[#D45A10]"
                  >
                    Continuar
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group inline-flex min-h-12 items-center justify-between gap-8 bg-[#AC4A00] px-5 text-sm font-medium text-white transition hover:bg-[#D45A10] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

function StepOne({
  formData,
  onChange,
}: {
  formData: RegisterRequest;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <div className="space-y-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Nombre" htmlFor="nombre" required>
          <input
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="given-name"
            value={formData.nombre}
            onChange={onChange}
            className={inputClass}
            placeholder="Tu nombre"
            required
          />
        </FormField>
        <FormField label="Apellido" htmlFor="apellido" required>
          <input
            id="apellido"
            name="apellido"
            type="text"
            autoComplete="family-name"
            value={formData.apellido}
            onChange={onChange}
            className={inputClass}
            placeholder="Tu apellido"
            required
          />
        </FormField>
      </div>

      <FormField label="Correo electrónico" htmlFor="email" required>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={onChange}
          className={inputClass}
          placeholder="nombre@correo.com"
          required
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Identificación" htmlFor="identificacion">
          <input
            id="identificacion"
            name="identificacion"
            type="text"
            value={formData.identificacion}
            onChange={onChange}
            className={inputClass}
            placeholder="Número de identificación"
          />
        </FormField>
        <FormField label="Teléfono" htmlFor="telefono">
          <input
            id="telefono"
            name="telefono"
            type="tel"
            autoComplete="tel"
            value={formData.telefono}
            onChange={onChange}
            className={inputClass}
            placeholder="+57"
          />
        </FormField>
      </div>

      <FormField
        label="Rol en SIEDES"
        htmlFor="rol"
        required
        hint="Define la experiencia de acceso dentro de la plataforma."
      >
        <select
          id="rol"
          name="rol"
          value={formData.rol}
          onChange={onChange}
          className={inputClass}
          required
        >
          {roleOptions.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </FormField>
    </div>
  );
}

function AcademicStep({
  formData,
  institutions,
  loadingInstitutions,
  onChange,
}: {
  formData: RegisterRequest;
  institutions: Institution[];
  loadingInstitutions: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <div className="space-y-7">
      <div className="flex items-start gap-4 border-l border-[#AC4A00]/30 pl-4">
        <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-[#AC4A00]" />
        <p className="text-sm leading-6 text-[#002930]/60">
          Estos datos permiten ubicar la trayectoria académica del estudiante y
          asociarla con su institución educativa.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Edad" htmlFor="edad" required>
          <input
            id="edad"
            name="edad"
            type="number"
            min={5}
            max={30}
            value={formData.edad || ""}
            onChange={onChange}
            className={inputClass}
            required
          />
        </FormField>

        <FormField label="Género" htmlFor="genero" required>
          <select
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={onChange}
            className={inputClass}
            required
          >
            <option value="">Seleccionar</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMENINO">Femenino</option>
            <option value="OTRO">Otro</option>
            <option value="PREFIERO_NO_DECIR">Prefiero no decir</option>
          </select>
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Etnia" htmlFor="etnia" hint="Selecciona únicamente si corresponde.">
          <select
            id="etnia"
            name="etnia"
            value={formData.etnia}
            onChange={onChange}
            className={inputClass}
          >
            {ethnicityOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Grado académico" htmlFor="grado" required>
          <select
            id="grado"
            name="grado"
            value={formData.grado}
            onChange={onChange}
            className={inputClass}
            required
          >
            <option value="">Seleccionar</option>
            {["6", "7", "8", "9", "10", "11"].map((grade) => (
              <option key={grade} value={grade}>
                {grade}° grado
              </option>
            ))}
            <option value="UNIVERSIDAD">Universidad</option>
          </select>
        </FormField>
      </div>

      <FormField label="Institución educativa" htmlFor="institucionId" required>
        <select
          id="institucionId"
          name="institucionId"
          value={formData.institucionId}
          onChange={onChange}
          className={inputClass}
          disabled={loadingInstitutions}
          required
        >
          <option value="">
            {loadingInstitutions ? "Cargando instituciones..." : "Seleccionar institución"}
          </option>
          {institutions.map((institution) => (
            <option key={institution.id} value={institution.id}>
              {institution.nombre}
            </option>
          ))}
        </select>
      </FormField>
    </div>
  );
}

function SecurityFields({
  formData,
  onChange,
}: {
  formData: RegisterRequest;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <section>
      <div className="mb-6 flex items-start gap-4 border-l border-[#AC4A00]/30 pl-4">
        <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#AC4A00]" />
        <div>
          <h3 className="text-sm font-medium">Credenciales de acceso</h3>
          <p className="mt-1 text-sm leading-6 text-[#002930]/55">
            Utiliza una contraseña de al menos 6 caracteres y evita reutilizar
            credenciales sensibles.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Contraseña" htmlFor="password" required>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={onChange}
            className={inputClass}
            minLength={6}
            required
          />
        </FormField>

        <FormField label="Confirmar contraseña" htmlFor="confirmPassword" required>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={onChange}
            className={inputClass}
            minLength={6}
            required
          />
        </FormField>
      </div>
    </section>
  );
}

function ContextStep({
  formData,
  onChange,
}: {
  formData: RegisterRequest;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <section className="border-t border-[#002930]/15 pt-8">
      <div className="mb-7">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#AC4A00]">
          Contexto opcional
        </p>
        <h3 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
          Variables para una lectura más contextualizada
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#002930]/55">
          Completa únicamente la información que corresponda. Estas variables son
          sensibles al contexto y no deberían interpretarse de forma aislada.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <FormField label="Distancia a la escuela (km)" htmlFor="distanciaEscuela">
          <input
            id="distanciaEscuela"
            name="distanciaEscuela"
            type="number"
            min={0}
            step="0.1"
            value={formData.distanciaEscuela || ""}
            onChange={onChange}
            className={inputClass}
          />
        </FormField>
        <FormField label="Tiempo de desplazamiento (min)" htmlFor="tiempoDesplazamiento">
          <input
            id="tiempoDesplazamiento"
            name="tiempoDesplazamiento"
            type="number"
            min={0}
            value={formData.tiempoDesplazamiento || ""}
            onChange={onChange}
            className={inputClass}
          />
        </FormField>
        <FormField label="Personas en el hogar" htmlFor="personasHogar">
          <input
            id="personasHogar"
            name="personasHogar"
            type="number"
            min={0}
            value={formData.personasHogar || ""}
            onChange={onChange}
            className={inputClass}
          />
        </FormField>
      </div>

      {formData.trabaja && (
        <div className="mt-5 max-w-xs">
          <FormField label="Horas de trabajo" htmlFor="horasTrabajo">
            <input
              id="horasTrabajo"
              name="horasTrabajo"
              type="number"
              min={0}
              value={formData.horasTrabajo || ""}
              onChange={onChange}
              className={inputClass}
            />
          </FormField>
        </div>
      )}

      <div className="mt-7 grid gap-px border border-[#002930]/15 bg-[#002930]/15 sm:grid-cols-2">
        <ToggleField
          name="trabaja"
          label="Trabaja actualmente"
          checked={Boolean(formData.trabaja)}
          onChange={onChange}
        />
        <ToggleField
          name="apoyoFamiliar"
          label="Cuenta con apoyo familiar"
          checked={Boolean(formData.apoyoFamiliar)}
          onChange={onChange}
        />
        <ToggleField
          name="accesoInternet"
          label="Tiene acceso a internet"
          checked={Boolean(formData.accesoInternet)}
          onChange={onChange}
        />
        <ToggleField
          name="dispositivoElectronico"
          label="Dispone de dispositivo electrónico"
          checked={Boolean(formData.dispositivoElectronico)}
          onChange={onChange}
        />
        <ToggleField
          name="participacionComunitaria"
          label="Participa en actividades comunitarias"
          checked={Boolean(formData.participacionComunitaria)}
          onChange={onChange}
        />
        <ToggleField
          name="conocimientosAncestrales"
          label="Reporta conocimientos o prácticas ancestrales"
          checked={Boolean(formData.conocimientosAncestrales)}
          onChange={onChange}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <FormField label="Situaciones especiales" htmlFor="situacionesEspeciales">
          <textarea
            id="situacionesEspeciales"
            name="situacionesEspeciales"
            rows={4}
            value={formData.situacionesEspeciales}
            onChange={onChange}
            className={inputClass}
            placeholder="Información adicional relevante"
          />
        </FormField>
        <FormField label="Necesidades especiales" htmlFor="necesidadesEspeciales">
          <textarea
            id="necesidadesEspeciales"
            name="necesidadesEspeciales"
            rows={4}
            value={formData.necesidadesEspeciales}
            onChange={onChange}
            className={inputClass}
            placeholder="Información adicional relevante"
          />
        </FormField>
      </div>
    </section>
  );
}

function FormField({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
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

function ToggleField({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-5 bg-[#F8F0AF] p-4">
      <span className="text-sm leading-5 text-[#002930]/70">{label}</span>
      <input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-[#AC4A00]"
      />
    </label>
  );
}

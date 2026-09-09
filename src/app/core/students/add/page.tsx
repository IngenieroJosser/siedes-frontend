"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  LoaderCircle,
  Save,
} from "lucide-react";
import { Institution, CreateCompleteStudent } from "@/lib/type";
import { getInstitutions } from "@/services/institution";
import { createStudent } from "@/services/students";
import {
  CheckboxField,
  CorePage,
  CorePageHeader,
  FieldLabel,
  FormSection,
  InlineNotice,
  Panel,
  inputClass,
} from "@/components/core/CoreUI";

function isAxiosError(
  error: unknown
): error is {
  response?: { data?: { message?: string }; status?: number };
} {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  );
}

const initialForm = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  password: "",
  edad: "",
  genero: "",
  etnia: "NINGUNA",
  grado: "",
  institucionId: "",
  distanciaEscuela: "",
  tiempoDesplazamiento: "",
  trabaja: false,
  horasTrabajo: "",
  ingresosFamiliares: "",
  personasHogar: "",
  apoyoFamiliar: true,
  accesoInternet: false,
  dispositivoElectronico: false,
  participacionComunitaria: false,
  conocimientosAncestrales: false,
  situacionesEspeciales: "",
  necesidadesEspeciales: "",
};

export default function AddStudent() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialForm);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [isLoadingInstitutions, setIsLoadingInstitutions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
    details?: string;
  } | null>(null);

  const loadInstitutions = async () => {
    try {
      setIsLoadingInstitutions(true);
      const data = await getInstitutions();
      setInstitutions(data || []);
    } catch (error) {
      console.error("Error cargando instituciones:", error);
      setInstitutions([]);
      setNotification({
        type: "error",
        message: "No fue posible cargar las instituciones.",
        details:
          "Recarga la página o verifica la disponibilidad del backend antes de registrar al estudiante.",
      });
    } finally {
      setIsLoadingInstitutions(false);
    }
  };

  useEffect(() => {
    loadInstitutions();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const setBoolean = (
    field:
      | "trabaja"
      | "apoyoFamiliar"
      | "accesoInternet"
      | "dispositivoElectronico"
      | "participacionComunitaria"
      | "conocimientosAncestrales",
    checked: boolean
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: checked,
      ...(field === "trabaja" && !checked ? { horasTrabajo: "" } : {}),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setNotification(null);
    setIsSubmitting(true);

    try {
      const studentData: CreateCompleteStudent = {
        usuario: {
          nombre: formData.nombre.trim(),
          apellido: formData.apellido.trim(),
          email: formData.email.trim(),
          telefono: formData.telefono.trim() || undefined,
          password: formData.password,
        },
        estudiante: {
          edad: Number.parseInt(formData.edad, 10) || 0,
          genero: formData.genero,
          etnia: formData.etnia,
          grado: formData.grado.trim(),
          institucionId: formData.institucionId,
          riesgoDesercion: 0,
        },
        contexto: {
          distanciaEscuela:
            Number.parseFloat(formData.distanciaEscuela) || 0,
          tiempoDesplazamiento:
            Number.parseInt(formData.tiempoDesplazamiento, 10) || 0,
          trabaja: formData.trabaja,
          horasTrabajo:
            formData.trabaja && formData.horasTrabajo
              ? Number.parseInt(formData.horasTrabajo, 10)
              : undefined,
          ingresosFamiliares: formData.ingresosFamiliares
            ? Number.parseInt(formData.ingresosFamiliares, 10)
            : undefined,
          personasHogar:
            Number.parseInt(formData.personasHogar, 10) || 1,
          apoyoFamiliar: formData.apoyoFamiliar,
          accesoInternet: formData.accesoInternet,
          dispositivoElectronico: formData.dispositivoElectronico,
          participacionComunitaria: formData.participacionComunitaria,
          conocimientosAncestrales: formData.conocimientosAncestrales,
          situacionesEspeciales:
            formData.situacionesEspeciales.trim() || undefined,
          necesidadesEspeciales:
            formData.necesidadesEspeciales.trim() || undefined,
        },
      };

      const response = await createStudent(studentData);

      if (!response) {
        throw new Error("Respuesta inesperada del servidor");
      }

      setNotification({
        type: "success",
        message: "Estudiante registrado correctamente.",
        details:
          "El registro quedó disponible para seguimiento dentro de SIEDES.",
      });
      setFormData(initialForm);

      window.setTimeout(() => {
        router.push("/core/students");
      }, 1200);
    } catch (error) {
      console.error("Error al agregar estudiante:", error);

      let message = "No fue posible registrar al estudiante.";
      let details =
        "Revisa la información del formulario e intenta nuevamente.";

      if (isAxiosError(error)) {
        message = error.response?.data?.message || message;

        if (error.response?.status === 409) {
          details =
            "El correo electrónico ya se encuentra registrado en el sistema.";
        } else if (error.response?.status === 404) {
          details =
            "La institución seleccionada no existe o no está disponible.";
        } else if (error.response?.status === 400) {
          details =
            "El backend rechazó uno o más campos. Verifica los datos requeridos.";
        } else if (error.response?.status === 500) {
          details =
            "El servidor presentó un error interno durante el registro.";
        }
      } else if (error instanceof Error) {
        message = error.message;
      }

      setNotification({
        type: "error",
        message,
        details,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CorePage>
      <CorePageHeader
        eyebrow="Nueva trayectoria"
        title="Agregar estudiante"
        description="Registra la identidad, trayectoria educativa y contexto necesario para el seguimiento. Solicita únicamente información pertinente para el propósito educativo."
        actions={
          <Link
            href="/core/students"
            className="inline-flex min-h-11 items-center gap-3 border border-[#002930]/16 px-4 text-sm font-medium transition hover:border-[#002930]/45"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a estudiantes
          </Link>
        }
      />

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_280px]">
        <Panel className="overflow-hidden">
          <form onSubmit={handleSubmit}>
            {notification && (
              <div className="border-b border-[#002930]/12 p-5">
                <InlineNotice
                  tone={notification.type}
                  title={notification.message}
                >
                  {notification.details}
                </InlineNotice>
              </div>
            )}

            <FormSection
              index="01"
              title="Cuenta e identificación"
              description="Datos de acceso e identificación asociados al estudiante."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Nombre"
                />
                <FormField
                  label="Apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  placeholder="Apellido"
                />
                <FormField
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="nombre@correo.com"
                />
                <FormField
                  label="Teléfono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+57 300 000 0000"
                />
                <FormField
                  label="Contraseña inicial"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  placeholder="Contraseña"
                />
              </div>
            </FormSection>

            <FormSection
              index="02"
              title="Trayectoria educativa"
              description="Información básica para ubicar al estudiante dentro de su contexto académico."
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
                  max={25}
                  placeholder="Edad"
                />

                <div>
                  <FieldLabel htmlFor="genero">Género</FieldLabel>
                  <select
                    id="genero"
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMENINO">Femenino</option>
                    <option value="NO_BINARIO">No binario</option>
                    <option value="OTRO">Otro</option>
                  </select>
                </div>

                <div>
                  <FieldLabel htmlFor="etnia">Autorreconocimiento étnico</FieldLabel>
                  <select
                    id="etnia"
                    name="etnia"
                    value={formData.etnia}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="NINGUNA">
                      No se autorreconoce en grupo étnico
                    </option>
                    <option value="AFRODESCENDIENTE">
                      Afrocolombiano(a) / afrodescendiente
                    </option>
                    <option value="INDIGENA">Pueblos indígenas</option>
                    <option value="ROM">Pueblo Rrom / gitano</option>
                    <option value="RAIZAL">Raizal</option>
                    <option value="PALENQUERO">Palenquero</option>
                  </select>
                  <p className="mt-2 text-xs leading-5 text-[#002930]/42">
                    Esta información aporta contexto y puede utilizarse para
                    auditoría de equidad. No debe aumentar automáticamente el
                    nivel de riesgo.
                  </p>
                </div>

                <FormField
                  label="Grado"
                  name="grado"
                  value={formData.grado}
                  onChange={handleChange}
                  required
                  placeholder="Ej. 10°"
                />

                <div className="md:col-span-2">
                  <FieldLabel htmlFor="institucionId">
                    Institución educativa
                  </FieldLabel>
                  <select
                    id="institucionId"
                    name="institucionId"
                    value={formData.institucionId}
                    onChange={handleChange}
                    required
                    disabled={isLoadingInstitutions}
                    className={inputClass + " disabled:opacity-50"}
                  >
                    <option value="">
                      {isLoadingInstitutions
                        ? "Cargando instituciones..."
                        : "Seleccione una institución"}
                    </option>
                    {institutions.map((institution) => (
                      <option key={institution.id} value={institution.id}>
                        {institution.nombre}
                      </option>
                    ))}
                  </select>
                  {!isLoadingInstitutions && institutions.length === 0 && (
                    <p className="mt-2 text-xs text-[#8f2f20]">
                      No hay instituciones disponibles para seleccionar.
                    </p>
                  )}
                </div>
              </div>
            </FormSection>

            <FormSection
              index="03"
              title="Entorno y movilidad"
              description="Variables contextuales relacionadas con acceso, desplazamiento y condiciones del hogar."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  label="Distancia a la escuela (km)"
                  name="distanciaEscuela"
                  type="number"
                  value={formData.distanciaEscuela}
                  onChange={handleChange}
                  required
                  min={0}
                  step={0.1}
                  placeholder="Ej. 2.5"
                />
                <FormField
                  label="Tiempo de desplazamiento (min)"
                  name="tiempoDesplazamiento"
                  type="number"
                  value={formData.tiempoDesplazamiento}
                  onChange={handleChange}
                  required
                  min={0}
                  placeholder="Ej. 45"
                />
                <FormField
                  label="Personas en el hogar"
                  name="personasHogar"
                  type="number"
                  value={formData.personasHogar}
                  onChange={handleChange}
                  required
                  min={1}
                  placeholder="Ej. 4"
                />
                <FormField
                  label="Ingresos familiares mensuales (COP)"
                  name="ingresosFamiliares"
                  type="number"
                  value={formData.ingresosFamiliares}
                  onChange={handleChange}
                  min={0}
                  placeholder="Opcional"
                />
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <CheckboxField
                  id="trabaja"
                  label="El estudiante trabaja"
                  description="Registra esta condición solo cuando exista información confiable."
                  checked={formData.trabaja}
                  onChange={(checked) => setBoolean("trabaja", checked)}
                />

                {formData.trabaja && (
                  <FormField
                    label="Horas de trabajo semanales"
                    name="horasTrabajo"
                    type="number"
                    value={formData.horasTrabajo}
                    onChange={handleChange}
                    min={0}
                    max={40}
                    placeholder="Ej. 20"
                  />
                )}
              </div>
            </FormSection>

            <FormSection
              index="04"
              title="Acceso y redes de apoyo"
              description="Registra condiciones que pueden ayudar a interpretar la trayectoria sin convertirlas, por sí solas, en decisiones."
            >
              <div className="grid gap-3 md:grid-cols-2">
                <CheckboxField
                  id="apoyoFamiliar"
                  label="Apoyo familiar para los estudios"
                  checked={formData.apoyoFamiliar}
                  onChange={(checked) =>
                    setBoolean("apoyoFamiliar", checked)
                  }
                />
                <CheckboxField
                  id="accesoInternet"
                  label="Acceso a internet"
                  checked={formData.accesoInternet}
                  onChange={(checked) =>
                    setBoolean("accesoInternet", checked)
                  }
                />
                <CheckboxField
                  id="dispositivoElectronico"
                  label="Dispositivo electrónico para estudiar"
                  checked={formData.dispositivoElectronico}
                  onChange={(checked) =>
                    setBoolean("dispositivoElectronico", checked)
                  }
                />
                <CheckboxField
                  id="participacionComunitaria"
                  label="Participación comunitaria"
                  checked={formData.participacionComunitaria}
                  onChange={(checked) =>
                    setBoolean("participacionComunitaria", checked)
                  }
                />
                <CheckboxField
                  id="conocimientosAncestrales"
                  label="Conocimientos o prácticas ancestrales"
                  description="Dato contextual etnoeducativo."
                  checked={formData.conocimientosAncestrales}
                  onChange={(checked) =>
                    setBoolean("conocimientosAncestrales", checked)
                  }
                />
              </div>
            </FormSection>

            <FormSection
              index="05"
              title="Observaciones contextuales"
              description="Utiliza texto libre únicamente para información pertinente al acompañamiento educativo."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="situacionesEspeciales">
                    Situaciones especiales
                  </FieldLabel>
                  <textarea
                    id="situacionesEspeciales"
                    name="situacionesEspeciales"
                    value={formData.situacionesEspeciales}
                    onChange={handleChange}
                    rows={5}
                    className={inputClass + " resize-y"}
                    placeholder="Opcional"
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="necesidadesEspeciales">
                    Necesidades de apoyo
                  </FieldLabel>
                  <textarea
                    id="necesidadesEspeciales"
                    name="necesidadesEspeciales"
                    value={formData.necesidadesEspeciales}
                    onChange={handleChange}
                    rows={5}
                    className={inputClass + " resize-y"}
                    placeholder="Opcional"
                  />
                </div>
              </div>
            </FormSection>

            <div className="flex flex-col-reverse gap-3 border-t border-[#002930]/14 px-5 py-5 sm:flex-row sm:items-center sm:justify-end">
              <Link
                href="/core/students"
                className="inline-flex min-h-11 items-center justify-center border border-[#002930]/16 px-5 text-sm font-medium transition hover:border-[#002930]/45"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || isLoadingInstitutions}
                className="inline-flex min-h-11 items-center justify-center gap-3 bg-[#AC4A00] px-5 text-sm font-medium text-white transition hover:bg-[#D45A10] disabled:cursor-not-allowed disabled:opacity-45"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Registrar estudiante
                  </>
                )}
              </button>
            </div>
          </form>
        </Panel>

        <aside className="space-y-4 xl:sticky xl:top-[100px] xl:self-start">
          <div className="border border-[#002930]/14 bg-[#002930] p-5 text-white">
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#F8F0AF]">
              Antes de guardar
            </p>
            <div className="mt-5 space-y-4">
              {[
                "Verifica que la institución sea correcta.",
                "Evita registrar información sensible que no sea necesaria.",
                "Revisa los datos contextuales antes de usarlos para seguimiento.",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#F8F0AF]" />
                  <p className="text-xs leading-5 text-white/55">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <InlineNotice tone="warning" title="Uso del riesgo">
            El registro crea la trayectoria del estudiante. Cualquier señal
            predictiva posterior debe utilizarse como apoyo a la revisión humana,
            no como una sentencia sobre permanencia o deserción.
          </InlineNotice>
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
  step,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  autoComplete?: string;
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
        step={step}
        autoComplete={autoComplete}
        className={inputClass}
      />
    </div>
  );
}

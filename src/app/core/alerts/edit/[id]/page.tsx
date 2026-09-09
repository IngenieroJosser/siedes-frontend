"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  LoaderCircle,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { getAlertById, updateAlert } from "@/services/alerts";
import { Alert as AlertType } from "@/lib/type";
import {
  CheckboxField,
  CorePage,
  CorePageHeader,
  ErrorState,
  FieldLabel,
  FormSection,
  InlineNotice,
  LoadingState,
  Panel,
  inputClass,
} from "@/components/core/CoreUI";

type Alert = AlertType;
type RiskLevel = "BAJO" | "MEDIO" | "ALTO" | "CRITICO";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    ("response" in error || "message" in error)
  );
}

const riskOptions: Array<{
  value: RiskLevel;
  label: string;
  description: string;
}> = [
  { value: "BAJO", label: "Bajo", description: "Seguimiento ordinario" },
  { value: "MEDIO", label: "Medio", description: "Requiere observación" },
  { value: "ALTO", label: "Alto", description: "Seguimiento cercano" },
  { value: "CRITICO", label: "Crítico", description: "Revisión prioritaria" },
];

const formatDateTime = (value: string) => {
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

export default function EditAlertPage() {
  const router = useRouter();
  const params = useParams();
  const alertId = params.id as string;

  const [alert, setAlert] = useState<Alert | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nivelRiesgo: "BAJO" as RiskLevel,
    descripcion: "",
    factores: [""],
    revisada: false,
    observaciones: "",
  });

  const loadAlert = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getAlertById(alertId);
      setAlert(data);
      setFormData({
        nivelRiesgo: data.nivelRiesgo,
        descripcion: data.descripcion,
        factores: data.factores.length > 0 ? data.factores : [""],
        revisada: data.revisada,
        observaciones: data.observaciones || "",
      });
    } catch (err) {
      console.error("Error cargando alerta:", err);
      setError("No fue posible cargar la alerta.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (alertId) {
      loadAlert();
    }
  }, [alertId]);

  const handleFactorChange = (index: number, value: string) => {
    setFormData((current) => {
      const factors = [...current.factores];
      factors[index] = value;
      return { ...current, factores: factors };
    });
  };

  const addFactor = () => {
    setFormData((current) => ({
      ...current,
      factores: [...current.factores, ""],
    }));
  };

  const removeFactor = (index: number) => {
    setFormData((current) => {
      const factors = current.factores.filter((_, i) => i !== index);
      return {
        ...current,
        factores: factors.length > 0 ? factors : [""],
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const factors = formData.factores
      .map((factor) => factor.trim())
      .filter(Boolean);

    if (factors.length === 0) {
      setError("Agrega al menos un factor asociado a la alerta.");
      return;
    }

    if (!formData.descripcion.trim()) {
      setError("La descripción de la alerta es obligatoria.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const updated = await updateAlert(alertId, {
        estudianteId: alert?.estudianteId,
        nivelRiesgo: formData.nivelRiesgo,
        descripcion: formData.descripcion.trim(),
        factores: factors,
        revisada: formData.revisada,
        observaciones: formData.observaciones.trim() || undefined,
      });

      setAlert(updated);
      setSuccess("La alerta se actualizó correctamente.");

      window.setTimeout(() => {
        router.push("/core/alerts");
      }, 1200);
    } catch (err: unknown) {
      console.error("Error actualizando alerta:", err);

      if (isApiError(err)) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "No fue posible actualizar la alerta."
        );
      } else {
        setError("No fue posible actualizar la alerta.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <CorePage>
        <LoadingState label="Cargando alerta..." />
      </CorePage>
    );
  }

  if (!alert) {
    return (
      <CorePage>
        <ErrorState
          title="No fue posible abrir la alerta"
          message={error || "La alerta no existe o no está disponible."}
          onRetry={loadAlert}
        />
      </CorePage>
    );
  }

  const studentName =
    `${alert.estudiante?.usuario?.nombre || ""} ${alert.estudiante?.usuario?.apellido || ""}`.trim() ||
    "Estudiante";

  return (
    <CorePage>
      <CorePageHeader
        eyebrow="Revisión de alerta"
        title="Editar alerta"
        description="Actualiza la prioridad, descripción, factores observados y estado de revisión sin modificar la relación de la alerta con el estudiante."
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

      <div className="mt-8 grid gap-6 xl:grid-cols-[300px_1fr]">
        <aside className="space-y-4 xl:sticky xl:top-[100px] xl:self-start">
          <Panel eyebrow="Caso" title="Estudiante asociado">
            <div className="p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#002930]/14 text-sm font-medium text-[#AC4A00]">
                  {alert.estudiante?.usuario?.nombre?.charAt(0) || "—"}
                  {alert.estudiante?.usuario?.apellido?.charAt(0) || ""}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{studentName}</p>
                  <p className="mt-1 truncate text-xs text-[#002930]/42">
                    {alert.estudiante?.institucion?.nombre ||
                      "Sin institución"}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4 border-t border-[#002930]/12 pt-5">
                <MetaRow label="Creada" value={formatDateTime(alert.creadaEn)} />
                <MetaRow
                  label="Estado"
                  value={alert.revisada ? "Revisada" : "Pendiente"}
                />
                <MetaRow label="Nivel actual" value={alert.nivelRiesgo} />
                <MetaRow
                  label="Factores"
                  value={String(alert.factores.length)}
                />
              </div>

              <Link
                href={`/core/students/${alert.estudianteId}`}
                className="mt-5 inline-flex min-h-10 items-center text-xs font-medium text-[#AC4A00] underline decoration-[#AC4A00]/30 underline-offset-4"
              >
                Abrir trayectoria del estudiante
              </Link>
            </div>
          </Panel>

          <InlineNotice tone="warning" title="Criterio de edición">
            Cambiar el nivel de riesgo debe responder a nueva evidencia o a una
            revisión del caso. La etiqueta no debe utilizarse como sanción ni
            decisión automática.
          </InlineNotice>
        </aside>

        <Panel className="overflow-hidden">
          <form onSubmit={handleSubmit}>
            {(error || success) && (
              <div className="border-b border-[#002930]/12 p-5">
                {error && (
                  <InlineNotice tone="error" title="No se pudo guardar">
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
              title="Prioridad y revisión"
              description="Actualiza cómo se organiza la revisión operativa del caso."
            >
              <div className="grid gap-px border border-[#002930]/12 bg-[#002930]/12 sm:grid-cols-2 xl:grid-cols-4">
                {riskOptions.map((option) => {
                  const active =
                    formData.nivelRiesgo === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData((current) => ({
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

              <div className="mt-5">
                <CheckboxField
                  id="revisada"
                  label="Marcar alerta como revisada"
                  description="Indica que una persona responsable ya realizó una revisión del caso."
                  checked={formData.revisada}
                  onChange={(checked) =>
                    setFormData((current) => ({
                      ...current,
                      revisada: checked,
                    }))
                  }
                />
              </div>
            </FormSection>

            <FormSection
              index="02"
              title="Descripción"
              description="Mantén una descripción concreta, observable y útil para el seguimiento."
            >
              <FieldLabel htmlFor="descripcion">
                Descripción de la alerta *
              </FieldLabel>
              <textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    descripcion: event.target.value,
                  }))
                }
                rows={7}
                required
                className={inputClass + " resize-y"}
                placeholder="Describe la situación que requiere seguimiento."
              />
            </FormSection>

            <FormSection
              index="03"
              title="Factores asociados"
              description="Conserva factores observables y evita convertir características identitarias en explicaciones automáticas."
            >
              <div className="space-y-3">
                {formData.factores.map((factor, index) => (
                  <div
                    key={index}
                    className="grid gap-2 sm:grid-cols-[1fr_auto]"
                  >
                    <div>
                      <FieldLabel htmlFor={`factor-${index}`}>
                        Factor {index + 1}
                      </FieldLabel>
                      <input
                        id={`factor-${index}`}
                        type="text"
                        value={factor}
                        onChange={(event) =>
                          handleFactorChange(index, event.target.value)
                        }
                        className={inputClass}
                        placeholder="Factor observado"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFactor(index)}
                      className="mt-auto flex min-h-11 items-center justify-center gap-2 border border-[#8f2f20]/20 px-4 text-xs font-medium text-[#8f2f20] transition hover:border-[#8f2f20]/50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Quitar
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addFactor}
                  className="inline-flex min-h-10 items-center gap-2 border border-[#002930]/16 px-4 text-xs font-medium transition hover:border-[#002930]/45"
                >
                  <Plus className="h-4 w-4" />
                  Agregar factor
                </button>
              </div>
            </FormSection>

            <FormSection
              index="04"
              title="Observaciones"
              description="Espacio opcional para registrar contexto adicional de la revisión."
            >
              <FieldLabel htmlFor="observaciones">
                Observaciones adicionales
              </FieldLabel>
              <textarea
                id="observaciones"
                value={formData.observaciones}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    observaciones: event.target.value,
                  }))
                }
                rows={5}
                className={inputClass + " resize-y"}
                placeholder="Opcional"
              />
            </FormSection>

            <div className="flex flex-col-reverse gap-3 border-t border-[#002930]/14 px-5 py-5 sm:flex-row sm:items-center sm:justify-end">
              <Link
                href="/core/alerts"
                className="inline-flex min-h-11 items-center justify-center border border-[#002930]/16 px-5 text-sm font-medium"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
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
                    Guardar cambios
                  </>
                )}
              </button>
            </div>
          </form>
        </Panel>
      </div>
    </CorePage>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[6rem_1fr] gap-3 text-xs">
      <span className="text-[#002930]/38">{label}</span>
      <span className="text-right font-medium text-[#002930]">{value}</span>
    </div>
  );
}

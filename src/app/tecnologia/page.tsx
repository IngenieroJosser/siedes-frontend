import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BellRing,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  Database,
  Eye,
  GitBranch,
  Layers3,
  LockKeyhole,
  MapPin,
  Network,
  ShieldCheck,
  SlidersHorizontal,
  UserRoundCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tecnología de SIEDES",
  description:
    "Conoce la arquitectura conceptual de SIEDES: datos contextualizados, análisis predictivo, alertas tempranas, intervención humana y principios de IA responsable.",
};

const layers = [
  {
    number: "01",
    icon: <Database className="h-6 w-6" />,
    label: "Datos",
    title: "Información académica y contextual",
    description:
      "La base analítica parte de variables que describen la trayectoria educativa y el contexto del estudiante.",
    items: [
      "Asistencia y desempeño",
      "Entorno familiar y social",
      "Condiciones territoriales",
      "Contexto cultural pertinente",
    ],
  },
  {
    number: "02",
    icon: <BrainCircuit className="h-6 w-6" />,
    label: "Analítica",
    title: "Modelos para detectar patrones de riesgo",
    description:
      "El análisis predictivo busca asociaciones que ayuden a priorizar casos para revisión, sin convertir la predicción en una decisión automática.",
    items: [
      "Preparación y validación de variables",
      "Entrenamiento y evaluación del modelo",
      "Estimación de riesgo",
      "Monitoreo de desempeño",
    ],
  },
  {
    number: "03",
    icon: <BellRing className="h-6 w-6" />,
    label: "Aplicación",
    title: "Alertas, visualización y seguimiento",
    description:
      "Los resultados analíticos deben traducirse en información legible para que los equipos educativos puedan revisar, priorizar y documentar acciones.",
    items: [
      "Alertas priorizadas",
      "Vista del contexto del caso",
      "Registro de intervenciones",
      "Seguimiento de evolución",
    ],
  },
  {
    number: "04",
    icon: <UserRoundCheck className="h-6 w-6" />,
    label: "Decisión",
    title: "Human-in-the-loop",
    description:
      "SIEDES está orientado a apoyar decisiones pedagógicas y de acompañamiento. La interpretación y la acción permanecen en manos de las personas.",
    items: [
      "Revisión humana de señales",
      "Criterio pedagógico",
      "Contextualización territorial",
      "Decisiones trazables",
    ],
  },
];

const responsibleAI = [
  {
    icon: <Eye className="h-5 w-5" />,
    title: "Explicabilidad",
    description:
      "Los equipos necesitan comprender qué señales contribuyen a una alerta para poder interpretarla y discutirla.",
  },
  {
    icon: <SlidersHorizontal className="h-5 w-5" />,
    title: "Monitoreo del modelo",
    description:
      "El desempeño debe evaluarse con datos reales del piloto y revisarse ante cambios de población o contexto.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Gobernanza",
    description:
      "Variables, accesos, decisiones e intervenciones requieren reglas claras de responsabilidad y trazabilidad.",
  },
  {
    icon: <LockKeyhole className="h-5 w-5" />,
    title: "Privacidad",
    description:
      "La arquitectura debe aplicar minimización de datos, control de acceso y protección proporcional a la sensibilidad de la información.",
  },
];

const pipeline = [
  ["01", "Ingesta", "Datos educativos + contexto"],
  ["02", "Preparación", "Calidad + variables"],
  ["03", "Modelo", "Patrones + riesgo"],
  ["04", "Entrega", "Alertas + contexto"],
  ["05", "Acción", "Intervención humana"],
  ["06", "Retorno", "Seguimiento + evidencia"],
];

export default function TecnologiaPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#001c22] text-white">
      <section className="relative isolate border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(248,240,175,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,240,175,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-[#F8F0AF]/10" />
          <div className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem] bg-[#AC4A00]/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-[#F8F0AF]/25 bg-[#F8F0AF]/5 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#F8F0AF]">
                Tecnología
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                Arquitectura conceptual
              </span>
            </div>

            <h1 className="mt-8 max-w-5xl text-[clamp(3.4rem,8vw,7rem)] font-medium leading-[0.9] tracking-[-0.055em]">
              IA que observa señales.
              <span className="block text-[#F8F0AF]">Personas que deciden.</span>
            </h1>

            <p className="mt-8 max-w-3xl border-t border-white/10 pt-7 text-base leading-7 text-white/65 md:text-lg">
              SIEDES combina datos contextualizados, análisis predictivo y una
              capa de seguimiento para apoyar la prevención de la deserción
              escolar. La tecnología organiza señales; el criterio educativo
              interpreta y actúa.
            </p>
          </div>

          <div className="border border-white/10 bg-[#002930]/80 p-6 md:p-8">
            <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#F8F0AF]">
                  Flujo de referencia
                </p>
                <h2 className="mt-2 text-2xl font-medium">
                  De datos a acompañamiento
                </h2>
              </div>
              <Cpu className="h-7 w-7 text-[#F8F0AF]" />
            </div>

            <div className="mt-2">
              {pipeline.map(([number, label, value], index) => (
                <div
                  key={number}
                  className="grid grid-cols-[2rem_5.5rem_1fr_auto] items-center gap-3 border-b border-white/10 py-4 last:border-b-0"
                >
                  <span className="text-[10px] tracking-[0.16em] text-[#F8F0AF]">
                    {number}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                    {label}
                  </span>
                  <span className="text-sm text-white/70">{value}</span>
                  {index < pipeline.length - 1 ? (
                    <ArrowRight className="h-3.5 w-3.5 text-[#AC4A00]" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#F8F0AF]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#002930]/15 bg-[#F8F0AF] py-8 text-[#002930]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-px border border-[#002930]/15 bg-[#002930]/15 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Datos", "Trayectoria + contexto"],
              ["Modelo", "Detección de patrones"],
              ["Alertas", "Priorización para revisión"],
              ["Acción", "Decisión humana"],
            ].map(([label, value], index) => (
              <div key={label} className="bg-[#F8F0AF] p-5">
                <p className="text-[9px] uppercase tracking-[0.17em] text-[#AC4A00]">
                  0{index + 1} / {label}
                </p>
                <p className="mt-3 text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#002930] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#F8F0AF]">
              Arquitectura del producto
            </p>
            <h2 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.045em] md:text-6xl">
              Cuatro capas para convertir información en capacidad de respuesta.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/55">
              Esta representación describe la arquitectura funcional objetivo del
              proyecto. No implica que todos los mecanismos estén productivizados
              hasta que hayan sido implementados y validados.
            </p>
          </div>

          <div className="border-t border-white/10">
            {layers.map((layer, index) => (
              <TechnologyLayer
                key={layer.number}
                layer={layer}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#002930]/15 bg-[#F8F0AF] py-20 text-[#002930] md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[.82fr_1.18fr] lg:gap-20 lg:px-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#AC4A00]">
              IA responsable
            </p>
            <h2 className="mt-5 max-w-2xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] md:text-6xl">
              La calidad del modelo no basta.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#002930]/65">
              Trabajar con información educativa y población vulnerable exige
              gobernanza, explicabilidad, monitoreo y controles de privacidad
              desde el diseño.
            </p>
          </div>

          <div className="grid gap-px border border-[#002930]/15 bg-[#002930]/15 sm:grid-cols-2">
            {responsibleAI.map((item, index) => (
              <ResponsibleCard
                key={item.title}
                number={index + 1}
                {...item}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#001c22] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#F8F0AF]">
              Contexto etnoeducativo
            </p>
            <h2 className="mt-5 max-w-2xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] md:text-6xl">
              El territorio no es una variable decorativa.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/60">
              La interpretación del riesgo debe reconocer que las condiciones de
              Quibdó y el Chocó pueden modificar el significado de una ausencia,
              una caída de rendimiento o una dificultad de acceso.
            </p>

            <div className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              <ContextCard
                icon={<MapPin className="h-5 w-5" />}
                label="Territorio"
                value="Condiciones locales"
              />
              <ContextCard
                icon={<Network className="h-5 w-5" />}
                label="Comunidad"
                value="Redes y actores"
              />
              <ContextCard
                icon={<Layers3 className="h-5 w-5" />}
                label="Trayectoria"
                value="Historia educativa"
              />
              <ContextCard
                icon={<GitBranch className="h-5 w-5" />}
                label="Interpretación"
                value="Dato + contexto"
              />
            </div>
          </div>

          <div className="border border-white/10 bg-[#002930] p-6 md:p-8">
            <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#F8F0AF]">
                  Principio de diseño
                </p>
                <h3 className="mt-3 text-2xl font-medium">
                  Señal analítica ≠ decisión final
                </h3>
              </div>
              <ShieldCheck className="h-7 w-7 text-[#F8F0AF]" />
            </div>

            <div className="mt-8 space-y-6">
              <DesignPrinciple
                number="01"
                title="El modelo sugiere prioridad"
                description="Entrega una señal para revisión, no una sentencia sobre el estudiante."
              />
              <DesignPrinciple
                number="02"
                title="El equipo interpreta"
                description="Docentes y profesionales contrastan la señal con información pedagógica y contextual."
              />
              <DesignPrinciple
                number="03"
                title="La institución decide"
                description="La intervención se define según el caso, las capacidades disponibles y la ruta institucional."
              />
              <DesignPrinciple
                number="04"
                title="El seguimiento retroalimenta"
                description="La evolución del caso aporta evidencia para evaluar y ajustar el sistema."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#00343d] py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-[#F8F0AF]/10" />
          <div className="absolute -right-8 -top-10 h-48 w-48 rounded-full border border-[#F8F0AF]/10" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-end gap-10 px-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#F8F0AF]">
              Tecnología al servicio del proceso
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-[1] tracking-[-0.045em] md:text-6xl">
              Explora cómo la arquitectura se convierte en un flujo de prevención.
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/como-funciona"
              className="group inline-flex min-h-12 items-center justify-between gap-8 bg-[#F8F0AF] px-5 py-3 text-sm font-medium text-[#002930] transition hover:bg-white"
            >
              Ver el proceso
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/solicitar-ayuda"
              className="group inline-flex min-h-12 items-center justify-between gap-8 border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:border-[#F8F0AF]/50 hover:text-[#F8F0AF]"
            >
              Solicitar apoyo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function TechnologyLayer({
  layer,
  index,
}: {
  layer: (typeof layers)[number];
  index: number;
}) {
  return (
    <article className="border-b border-white/10 py-10 last:border-b-0 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-[0.18em] text-white/30">
              {layer.number}
            </span>
            <span className="h-px w-10 bg-[#AC4A00]" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#F8F0AF]">
              {layer.label}
            </span>
          </div>

          <div className="mt-7 flex items-start gap-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#F8F0AF]/20 text-[#F8F0AF]">
              {layer.icon}
            </span>
            <div>
              <h3 className="max-w-2xl text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                {layer.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55 md:text-base md:leading-7">
                {layer.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
          {layer.items.map((item) => (
            <div key={item} className="flex gap-3 bg-[#001c22] p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F8F0AF]" />
              <p className="text-sm leading-6 text-white/60">{item}</p>
            </div>
          ))}
          <div className="bg-[#001c22] p-4 sm:col-span-2">
            <div className="h-px bg-white/10">
              <div
                className="h-px bg-[#F8F0AF]"
                style={{ width: (index + 1) * 25 + "%" }}
              />
            </div>
            <div className="mt-3 flex justify-between text-[9px] uppercase tracking-[0.15em] text-white/25">
              <span>Capa</span>
              <span>0{index + 1} / 04</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ResponsibleCard({
  number,
  icon,
  title,
  description,
}: {
  number: number;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="bg-[#F8F0AF] p-6 md:p-7">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center border border-[#002930]/20 text-[#AC4A00]">
          {icon}
        </span>
        <span className="text-xs text-[#002930]/25">0{number}</span>
      </div>
      <h3 className="mt-9 text-xl font-medium tracking-[-0.025em]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#002930]/60">{description}</p>
    </article>
  );
}

function ContextCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#001c22] p-5">
      <div className="text-[#F8F0AF]">{icon}</div>
      <p className="mt-8 text-[9px] uppercase tracking-[0.18em] text-white/30">
        {label}
      </p>
      <p className="mt-2 text-sm text-white/70">{value}</p>
    </div>
  );
}

function DesignPrinciple({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="grid grid-cols-[2rem_1fr] gap-4 border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
      <span className="text-[10px] tracking-[0.16em] text-[#AC4A00]">
        {number}
      </span>
      <div>
        <h4 className="text-sm font-medium text-white">{title}</h4>
        <p className="mt-2 text-sm leading-6 text-white/50">{description}</p>
      </div>
    </div>
  );
}

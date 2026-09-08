import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BellRing,
  BrainCircuit,
  CheckCircle2,
  Database,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Network,
  RefreshCcw,
  ShieldCheck,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo funciona SIEDES",
  description:
    "Conoce cómo SIEDES integra datos contextualizados, análisis predictivo, alertas tempranas e intervención humana para apoyar la permanencia escolar.",
};

const steps = [
  {
    number: "01",
    id: "datos",
    eyebrow: "Comprender antes de predecir",
    icon: <Database className="h-6 w-6" />,
    title: "Recolección de datos contextualizados",
    description:
      "SIEDES organiza variables académicas y contextuales para construir una lectura más completa de la trayectoria de cada estudiante.",
    bullets: [
      "Asistencia, desempeño y cambios en la trayectoria académica",
      "Condiciones familiares, sociales y socioeconómicas relevantes",
      "Contexto territorial y acceso a recursos o servicios",
      "Variables culturales y comunitarias pertinentes al enfoque etnoeducativo",
    ],
    visualLabel: "Entrada",
    visualValue: "Datos + contexto",
  },
  {
    number: "02",
    id: "analisis",
    eyebrow: "Encontrar señales relevantes",
    icon: <BrainCircuit className="h-6 w-6" />,
    title: "Análisis predictivo con inteligencia artificial",
    description:
      "Los modelos analíticos buscan patrones asociados con riesgo de abandono escolar. La predicción funciona como una señal de apoyo y no como una etiqueta definitiva.",
    bullets: [
      "Identificación de patrones en múltiples variables",
      "Estimación de niveles de atención o riesgo",
      "Priorización de casos que requieren revisión",
      "Lectura de resultados junto con el contexto disponible",
    ],
    visualLabel: "Proceso",
    visualValue: "Patrones + riesgo",
  },
  {
    number: "03",
    id: "alertas",
    eyebrow: "Traducir señales en atención",
    icon: <BellRing className="h-6 w-6" />,
    title: "Generación y priorización de alertas tempranas",
    description:
      "Las señales analíticas se convierten en alertas que permiten a los equipos educativos focalizar la atención donde puede ser más necesaria.",
    bullets: [
      "Alertas organizadas por nivel de prioridad",
      "Contexto visible para interpretar cada señal",
      "Seguimiento del estado de cada caso",
      "Trazabilidad de la atención realizada",
    ],
    visualLabel: "Salida",
    visualValue: "Alerta priorizada",
  },
  {
    number: "04",
    id: "intervencion",
    eyebrow: "La decisión sigue siendo humana",
    icon: <HeartHandshake className="h-6 w-6" />,
    title: "Intervención contextualizada",
    description:
      "La plataforma busca apoyar la coordinación entre actores educativos para definir acciones pertinentes según las necesidades y el contexto del estudiante.",
    bullets: [
      "Revisión del caso por el equipo educativo",
      "Articulación con familia y redes de apoyo cuando corresponda",
      "Acciones pedagógicas y de acompañamiento contextualizadas",
      "Registro de decisiones y actividades de seguimiento",
    ],
    visualLabel: "Acción",
    visualValue: "Acompañamiento",
  },
  {
    number: "05",
    id: "seguimiento",
    eyebrow: "Cerrar el ciclo",
    icon: <RefreshCcw className="h-6 w-6" />,
    title: "Seguimiento y mejora continua",
    description:
      "El resultado de las acciones permite revisar la evolución de los casos y generar evidencia para mejorar progresivamente el proceso de prevención.",
    bullets: [
      "Seguimiento de la evolución del estudiante",
      "Revisión de alertas e intervenciones registradas",
      "Análisis de resultados para ajustar criterios y procesos",
      "Aprendizaje institucional basado en evidencia",
    ],
    visualLabel: "Ciclo",
    visualValue: "Medir + ajustar",
  },
];

const principles = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "La predicción no sentencia",
    description:
      "Un puntaje o nivel de riesgo orienta la atención. No define el futuro de un estudiante ni reemplaza el criterio profesional.",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "El contexto cambia la lectura",
    description:
      "La interpretación debe considerar territorio, comunidad, condiciones de vulnerabilidad e identidad cultural.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "La intervención es humana",
    description:
      "Docentes, orientación escolar, familias y comunidad convierten la información en acciones de acompañamiento.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#001c22] text-white">
      <section className="relative isolate border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(248,240,175,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,240,175,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute -right-36 -top-40 h-[34rem] w-[34rem] rounded-full border border-[#F8F0AF]/10" />
          <div className="absolute -right-12 -top-16 h-[20rem] w-[20rem] rounded-full border border-[#F8F0AF]/10" />
          <div className="absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#AC4A00]/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-[#F8F0AF]/25 bg-[#F8F0AF]/5 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#F8F0AF]">
                Cómo funciona
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                05 etapas · 01 ciclo
              </span>
            </div>

            <h1 className="mt-8 max-w-5xl text-[clamp(3.4rem,8vw,7.2rem)] font-medium leading-[0.9] tracking-[-0.055em]">
              Del dato
              <span className="block text-[#F8F0AF]">a la intervención.</span>
            </h1>

            <div className="mt-9 max-w-3xl border-t border-white/10 pt-7">
              <p className="text-base leading-7 text-white/65 md:text-lg">
                SIEDES conecta información académica y contextual con análisis
                predictivo, alertas tempranas y acompañamiento humano para apoyar
                decisiones oportunas frente al riesgo de deserción escolar.
              </p>
            </div>
          </div>

          <PipelinePreview />
        </div>
      </section>

      <section className="border-b border-[#002930]/15 bg-[#F8F0AF] text-[#002930]">
        <div className="mx-auto max-w-7xl overflow-x-auto px-5 sm:px-6 lg:px-8">
          <nav className="flex min-w-max" aria-label="Etapas del proceso SIEDES">
            {steps.map((step) => (
              <a
                key={step.id}
                href={"#" + step.id}
                className="group flex min-w-[185px] items-center gap-3 border-r border-[#002930]/15 px-5 py-5 first:border-l transition hover:bg-white/30"
              >
                <span className="text-[10px] tracking-[0.18em] text-[#AC4A00]">
                  {step.number}
                </span>
                <span className="text-xs font-medium">{step.visualLabel}</span>
                <ArrowRight className="ml-auto h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="bg-[#002930]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#F8F0AF]">
                Flujo operacional
              </p>
              <h2 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.045em] md:text-5xl">
                Cinco etapas para convertir una señal en acompañamiento.
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-6 text-white/55">
                El proceso está pensado como un ciclo. La información inicial
                orienta el análisis; la intervención genera nueva evidencia que
                puede mejorar el seguimiento posterior.
              </p>

              <div className="mt-9 border-l border-[#F8F0AF]/20 pl-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Principio rector
                </p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  La tecnología prioriza señales. Las personas interpretan,
                  deciden y acompañan.
                </p>
              </div>
            </div>

            <div className="border-t border-white/10">
              {steps.map((step, index) => (
                <ProcessStep
                  key={step.id}
                  step={step}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#002930]/15 bg-[#F8F0AF] py-20 text-[#002930] md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#AC4A00]">
                Gobernanza del riesgo
              </p>
              <h2 className="mt-5 max-w-2xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] md:text-6xl">
                Una alerta no es una decisión.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#002930]/65">
                El valor del análisis predictivo aparece cuando se combina con
                contexto, criterio pedagógico y una ruta de acompañamiento
                responsable.
              </p>
            </div>

            <div className="grid gap-px border border-[#002930]/15 bg-[#002930]/15 md:grid-cols-3">
              {principles.map((principle, index) => (
                <PrincipleCard
                  key={principle.title}
                  principle={principle}
                  number={index + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#001c22] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#F8F0AF]">
                Lectura contextual
              </p>
              <h2 className="mt-5 max-w-2xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] md:text-6xl">
                El mismo dato puede significar cosas distintas según el contexto.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/60">
                Por eso SIEDES incorpora una perspectiva etnoeducativa: el dato
                no se interpreta aislado de la historia, el territorio, la
                comunidad y las condiciones que rodean al estudiante.
              </p>

              <div className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
                <ContextItem
                  icon={<GraduationCap className="h-5 w-5" />}
                  label="Trayectoria"
                  value="Asistencia y desempeño"
                />
                <ContextItem
                  icon={<Users className="h-5 w-5" />}
                  label="Entorno"
                  value="Familia y red de apoyo"
                />
                <ContextItem
                  icon={<MapPin className="h-5 w-5" />}
                  label="Territorio"
                  value="Condiciones locales"
                />
                <ContextItem
                  icon={<Network className="h-5 w-5" />}
                  label="Comunidad"
                  value="Actores y contexto cultural"
                />
              </div>
            </div>

            <div className="border border-white/10 bg-[#002930] p-6 md:p-8">
              <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#F8F0AF]">
                    Vista conceptual
                  </p>
                  <h3 className="mt-3 text-2xl font-medium">
                    Ciclo de información SIEDES
                  </h3>
                </div>
                <BrainCircuit className="h-7 w-7 text-[#F8F0AF]" />
              </div>

              <div className="mt-2">
                <ArchitectureRow
                  number="01"
                  label="Entrada"
                  value="Datos académicos + contexto"
                />
                <ArchitectureRow
                  number="02"
                  label="Análisis"
                  value="Patrones + estimación de riesgo"
                />
                <ArchitectureRow
                  number="03"
                  label="Priorización"
                  value="Alertas para revisión"
                />
                <ArchitectureRow
                  number="04"
                  label="Acción"
                  value="Intervención humana"
                />
                <ArchitectureRow
                  number="05"
                  label="Retorno"
                  value="Seguimiento + nueva evidencia"
                />
              </div>

              <div className="mt-7 flex items-start gap-3 border-t border-white/10 pt-6">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#F8F0AF]" />
                <p className="text-sm leading-6 text-white/55">
                  El tratamiento de información educativa requiere trazabilidad,
                  control de acceso y prácticas responsables de protección de
                  datos durante todo el ciclo.
                </p>
              </div>
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
              De la comprensión a la acción
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-[1] tracking-[-0.045em] md:text-6xl">
              Conoce cómo SIEDES puede apoyar una estrategia de permanencia escolar.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/60">
              Explora la arquitectura tecnológica o continúa hacia la ruta de
              solicitud de apoyo del proyecto.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/solicitar-ayuda"
              className="group inline-flex min-h-12 items-center justify-between gap-8 bg-[#F8F0AF] px-5 py-3 text-sm font-medium text-[#002930] transition hover:bg-white"
            >
              Solicitar apoyo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/tecnologia"
              className="group inline-flex min-h-12 items-center justify-between gap-8 border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:border-[#F8F0AF]/50 hover:text-[#F8F0AF]"
            >
              Explorar tecnología
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PipelinePreview() {
  const nodes = [
    { number: "01", label: "Datos", icon: <Database className="h-4 w-4" /> },
    { number: "02", label: "Análisis", icon: <BrainCircuit className="h-4 w-4" /> },
    { number: "03", label: "Alerta", icon: <BellRing className="h-4 w-4" /> },
    { number: "04", label: "Acción", icon: <HeartHandshake className="h-4 w-4" /> },
    { number: "05", label: "Seguimiento", icon: <RefreshCcw className="h-4 w-4" /> },
  ];

  return (
    <div className="border border-white/10 bg-[#002930]/80 p-5 md:p-6">
      <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#F8F0AF]">
            Vista del proceso
          </p>
          <h2 className="mt-2 text-xl font-medium">Pipeline de permanencia</h2>
        </div>
        <span className="text-[10px] uppercase tracking-[0.17em] text-white/30">
          Conceptual
        </span>
      </div>

      <div className="mt-2">
        {nodes.map((node, index) => (
          <div
            key={node.number}
            className="grid grid-cols-[2.2rem_auto_1fr_auto] items-center gap-3 border-b border-white/10 py-4 last:border-b-0"
          >
            <span className="text-[10px] tracking-[0.16em] text-white/30">
              {node.number}
            </span>
            <span className="text-[#F8F0AF]">{node.icon}</span>
            <span className="text-sm text-white/70">{node.label}</span>
            {index < nodes.length - 1 ? (
              <ArrowRight className="h-3.5 w-3.5 text-[#AC4A00]" />
            ) : (
              <CheckCircle2 className="h-3.5 w-3.5 text-[#F8F0AF]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessStep({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  return (
    <article id={step.id} className="scroll-mt-32 border-b border-white/10 py-10 last:border-b-0 md:py-14">
      <div className="grid gap-8 xl:grid-cols-[1fr_.72fr] xl:items-start xl:gap-14">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-[0.18em] text-white/30">
              {step.number}
            </span>
            <span className="h-px w-10 bg-[#AC4A00]" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#F8F0AF]">
              {step.eyebrow}
            </span>
          </div>

          <div className="mt-7 flex items-start gap-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#F8F0AF]/20 text-[#F8F0AF]">
              {step.icon}
            </span>
            <div>
              <h3 className="max-w-2xl text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                {step.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60 md:text-base md:leading-7">
                {step.description}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {step.bullets.map((bullet) => (
              <div key={bullet} className="flex gap-3 bg-[#002930] p-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F8F0AF]" />
                <p className="text-sm leading-6 text-white/60">{bullet}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-white/10 bg-[#001c22] p-5 xl:mt-1">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              {step.visualLabel}
            </span>
            <span className="text-xs text-[#F8F0AF]">{step.number}</span>
          </div>
          <div className="flex min-h-40 flex-col justify-between pt-6">
            <p className="text-3xl font-medium tracking-[-0.04em] text-white">
              {step.visualValue}
            </p>
            <div className="mt-10">
              <div className="h-px bg-white/10">
                <div
                  className="h-px bg-[#F8F0AF]"
                  style={{ width: (index + 1) * 20 + "%" }}
                />
              </div>
              <div className="mt-3 flex justify-between text-[9px] uppercase tracking-[0.16em] text-white/25">
                <span>Inicio</span>
                <span>Ciclo 0{index + 1}/05</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function PrincipleCard({
  principle,
  number,
}: {
  principle: (typeof principles)[number];
  number: number;
}) {
  return (
    <article className="bg-[#F8F0AF] p-6 md:p-7">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center border border-[#002930]/20 text-[#AC4A00]">
          {principle.icon}
        </span>
        <span className="text-xs text-[#002930]/30">0{number}</span>
      </div>
      <h3 className="mt-10 text-xl font-medium tracking-[-0.025em]">
        {principle.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[#002930]/60">
        {principle.description}
      </p>
    </article>
  );
}

function ContextItem({
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
      <p className="mt-8 text-[10px] uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>
      <p className="mt-2 text-sm text-white/70">{value}</p>
    </div>
  );
}

function ArchitectureRow({
  number,
  label,
  value,
}: {
  number: string;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[2rem_5rem_1fr] items-center gap-3 border-b border-white/10 py-4 last:border-b-0">
      <span className="text-[10px] tracking-[0.16em] text-[#F8F0AF]">{number}</span>
      <span className="text-[9px] uppercase tracking-[0.15em] text-white/30">
        {label}
      </span>
      <span className="text-sm text-white/70">{value}</span>
    </div>
  );
}

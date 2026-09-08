import Link from "next/link";
import type { ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BellRing,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  Database,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Network,
  School,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const COLORS = {
  ink: "#001c22",
  deep: "#002930",
  teal: "#00343d",
  sand: "#F8F0AF",
  ember: "#AC4A00",
};

const riskFactors = [
  { label: "Asistencia", value: 72 },
  { label: "Rendimiento", value: 61 },
  { label: "Contexto socioeconómico", value: 54 },
  { label: "Red de apoyo", value: 79 },
];

const dimensions = [
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Trayectoria académica",
    description:
      "Asistencia, desempeño y señales de cambio que ayudan a detectar variaciones relevantes en el proceso escolar.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Entorno familiar y social",
    description:
      "Variables contextuales que permiten interpretar el riesgo más allá de una calificación o una ausencia.",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Contexto territorial",
    description:
      "La lectura del riesgo considera las particularidades del territorio, la comunidad y las condiciones de vulnerabilidad.",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Enfoque etnoeducativo",
    description:
      "La tecnología acompaña los procesos educativos sin desconectarlos de la identidad cultural y del contexto local.",
  },
];

const process = [
  {
    number: "01",
    icon: <Database className="h-5 w-5" />,
    title: "Datos contextualizados",
    description:
      "Se integran variables académicas, sociales y contextuales para construir una lectura más completa del estudiante.",
  },
  {
    number: "02",
    icon: <BrainCircuit className="h-5 w-5" />,
    title: "Análisis predictivo",
    description:
      "Los modelos identifican patrones y señales que pueden asociarse con un mayor riesgo de abandono escolar.",
  },
  {
    number: "03",
    icon: <BellRing className="h-5 w-5" />,
    title: "Alerta temprana",
    description:
      "La información se traduce en alertas priorizadas para que los equipos educativos sepan dónde concentrar la atención.",
  },
  {
    number: "04",
    icon: <HeartHandshake className="h-5 w-5" />,
    title: "Intervención y seguimiento",
    description:
      "Docentes, familias y comunidad pueden articular acciones y registrar el seguimiento de cada caso.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#002930] text-white">
      <section
        aria-label="Presentación de SIEDES"
        className="relative isolate border-b border-white/10"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(248,240,175,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(248,240,175,0.045)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute right-[-10rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full border border-[#F8F0AF]/10" />
          <div className="absolute right-[-4rem] top-[-6rem] h-[22rem] w-[22rem] rounded-full border border-[#F8F0AF]/10" />
          <div className="absolute bottom-[-12rem] left-[-12rem] h-[28rem] w-[28rem] rounded-full bg-[#AC4A00]/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-6 md:pb-24 md:pt-20 lg:px-8 lg:pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div>
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 border border-[#F8F0AF]/25 bg-[#F8F0AF]/5 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#F8F0AF]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Inteligencia para la permanencia escolar
                </span>
                <span className="text-xs uppercase tracking-[0.18em] text-white/45">
                  Quibdó · Chocó
                </span>
              </div>

              <h1 className="max-w-4xl text-[clamp(3.25rem,8vw,7.25rem)] font-medium leading-[0.88] tracking-[-0.055em] text-white">
                Detectar antes.
                <span className="mt-2 block text-[#F8F0AF]">Acompañar mejor.</span>
                <span className="mt-2 block">Permanecer.</span>
              </h1>

              <div className="mt-9 grid max-w-3xl gap-7 border-t border-white/10 pt-7 md:grid-cols-[1fr_auto] md:items-end">
                <p className="max-w-2xl text-base leading-7 text-white/70 md:text-lg">
                  SIEDES combina inteligencia artificial, análisis predictivo y
                  enfoque etnoeducativo para identificar señales de riesgo y
                  apoyar decisiones oportunas frente a la deserción escolar en
                  contextos de vulnerabilidad.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                  <Link
                    href="/solicitar-ayuda"
                    className="group inline-flex min-h-12 items-center justify-between gap-5 bg-[#AC4A00] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#D45A10]"
                  >
                    Solicitar apoyo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/como-funciona"
                    className="group inline-flex min-h-12 items-center justify-between gap-5 border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:border-[#F8F0AF]/50 hover:text-[#F8F0AF]"
                  >
                    Ver cómo funciona
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
                <SignalStrip
                  icon={<BrainCircuit className="h-4 w-4" />}
                  label="Inteligencia artificial"
                  value="Detección de patrones"
                />
                <SignalStrip
                  icon={<BarChart3 className="h-4 w-4" />}
                  label="Analítica predictiva"
                  value="Priorización del riesgo"
                />
                <SignalStrip
                  icon={<Users className="h-4 w-4" />}
                  label="Etnoeducación"
                  value="Contexto e identidad"
                />
              </div>
            </div>

            <div className="relative lg:pl-3">
              <div className="absolute -left-6 top-8 hidden h-[82%] w-px bg-[#F8F0AF]/20 lg:block" />
              <div className="border border-white/10 bg-[#001c22]/80 p-4 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-6">
                <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#F8F0AF]">
                      Vista demostrativa
                    </p>
                    <h2 className="mt-2 text-xl font-medium">
                      Inteligencia de riesgo escolar
                    </h2>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center border border-[#F8F0AF]/20 text-[#F8F0AF]">
                    <Activity className="h-5 w-5" />
                  </div>
                </div>

                <div className="grid gap-5 py-6 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/45">
                      <span className="h-2 w-2 bg-[#AC4A00]" />
                      Nivel de atención
                    </div>
                    <div className="mt-3 flex items-end gap-3">
                      <span className="text-5xl font-medium tracking-[-0.06em] text-[#F8F0AF]">
                        48
                      </span>
                      <span className="pb-1 text-sm text-white/50">/ 100</span>
                    </div>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-white/60">
                      Puntaje ilustrativo para mostrar cómo la plataforma puede
                      priorizar señales y orientar el seguimiento.
                    </p>
                  </div>

                  <div className="relative h-32 w-32">
                    <div className="absolute inset-0 rounded-full border border-white/10" />
                    <div className="absolute inset-3 rounded-full border border-[#F8F0AF]/20" />
                    <div className="absolute inset-7 rounded-full border border-[#AC4A00]/35" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BrainCircuit className="h-8 w-8 text-[#F8F0AF]" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                      Variables observadas
                    </p>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-[#F8F0AF]">
                      Contextualizadas
                    </span>
                  </div>

                  <div className="space-y-4">
                    {riskFactors.map((factor) => (
                      <div key={factor.label}>
                        <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                          <span className="text-white/70">{factor.label}</span>
                          <span className="text-white/40">{factor.value}%</span>
                        </div>
                        <div className="h-px bg-white/10">
                          <div
                            className="h-px bg-[#F8F0AF]"
                            style={{ width: `${factor.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-px bg-white/10">
                  <MiniMetric label="Señales" value="04" />
                  <MiniMetric label="Siguiente acción" value="Revisar" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.18em] text-white/35">
                <span>SIEDES / Early warning intelligence</span>
                <span>01 — 04</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#F8F0AF] text-[#002930]">
        <div className="mx-auto grid max-w-7xl gap-px bg-[#002930]/10 px-0 sm:grid-cols-3">
          <Principle
            number="01"
            title="Predecir no es etiquetar"
            description="El riesgo es una señal para orientar apoyo, no una sentencia sobre el estudiante."
          />
          <Principle
            number="02"
            title="Los datos necesitan contexto"
            description="La lectura analítica debe comprender territorio, familia, comunidad e identidad cultural."
          />
          <Principle
            number="03"
            title="La decisión sigue siendo humana"
            description="La plataforma apoya a los equipos educativos; no reemplaza el criterio pedagógico."
          />
        </div>
      </section>

      <section id="como-funciona" className="border-b border-white/10 bg-[#001c22] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="De la señal a la acción"
            title="Un sistema de alerta temprana diseñado para intervenir a tiempo."
            description="SIEDES organiza el proceso en una secuencia clara: entender el contexto, estimar el riesgo, priorizar alertas y acompañar la intervención."
          />

          <div className="mt-14 grid border border-white/10 md:grid-cols-2 xl:grid-cols-4">
            {process.map((item, index) => (
              <FlowStep
                key={item.number}
                {...item}
                isLast={index === process.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#002930] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#F8F0AF]">
                Lectura multidimensional
              </p>
              <h2 className="mt-5 max-w-xl text-4xl font-medium leading-[1.02] tracking-[-0.04em] md:text-5xl">
                El riesgo escolar no cabe en una sola variable.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/65">
                La plataforma busca construir una visión integral para que una
                ausencia, una caída de rendimiento o una dificultad económica
                puedan interpretarse dentro de un contexto más amplio.
              </p>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {dimensions.map((item, index) => (
                <RiskDimension key={item.title} index={index + 1} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#002930]/10 bg-[#F8F0AF] py-20 text-[#002930] md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#AC4A00]">
                Tecnología con contexto
              </p>
              <h2 className="mt-5 max-w-2xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] md:text-6xl">
                Inteligencia artificial sin perder de vista a la comunidad.
              </h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#002930]/70">
                El enfoque etnoeducativo introduce una condición esencial:
                interpretar los datos desde la realidad de los estudiantes y no
                desde un modelo abstracto desconectado del territorio.
              </p>

              <div className="mt-10 flex flex-wrap gap-2">
                {[
                  "Contexto territorial",
                  "Identidad cultural",
                  "Participación comunitaria",
                  "Decisión pedagógica",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#002930]/20 px-3 py-2 text-xs uppercase tracking-[0.12em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative border border-[#002930]/15 bg-[#002930] p-6 text-white md:p-8">
              <div className="absolute right-0 top-0 h-24 w-24 border-b border-l border-[#F8F0AF]/15" />
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#F8F0AF]">
                    Núcleo SIEDES
                  </p>
                  <h3 className="mt-3 text-2xl font-medium">
                    Analítica para la permanencia
                  </h3>
                </div>
                <Cpu className="h-7 w-7 text-[#F8F0AF]" />
              </div>

              <div className="mt-10 space-y-1">
                <ArchitectureRow
                  icon={<Database className="h-4 w-4" />}
                  label="Datos"
                  value="Académicos + contexto"
                />
                <ArchitectureRow
                  icon={<BrainCircuit className="h-4 w-4" />}
                  label="Modelo"
                  value="Análisis de patrones"
                />
                <ArchitectureRow
                  icon={<BellRing className="h-4 w-4" />}
                  label="Salida"
                  value="Alertas priorizadas"
                />
                <ArchitectureRow
                  icon={<HeartHandshake className="h-4 w-4" />}
                  label="Acción"
                  value="Intervención humana"
                />
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#F8F0AF]" />
                  <p className="text-sm leading-6 text-white/60">
                    El diseño de una plataforma educativa con IA exige
                    gobernanza, trazabilidad y tratamiento responsable de los
                    datos de estudiantes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="impacto" className="border-b border-white/10 bg-[#001c22] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <SectionHeading
              kicker="Propósito del proyecto"
              title="Convertir señales tempranas en oportunidades de permanencia."
              description="El valor de SIEDES no está en producir una predicción, sino en ayudar a que esa señal genere una respuesta coordinada y oportuna."
            />

            <Link
              href="/tecnologia"
              className="group inline-flex items-center gap-3 text-sm text-[#F8F0AF]"
            >
              Explorar la tecnología
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-3">
            <ImpactBlock
              icon={<Target className="h-6 w-6" />}
              title="Detección temprana"
              description="Identificar señales antes de que el abandono escolar se convierta en una decisión irreversible."
            />
            <ImpactBlock
              icon={<Network className="h-6 w-6" />}
              title="Respuesta coordinada"
              description="Conectar la lectura de datos con docentes, familias, orientación escolar y redes de apoyo."
            />
            <ImpactBlock
              icon={<School className="h-6 w-6" />}
              title="Permanencia educativa"
              description="Orientar recursos y acciones hacia estudiantes que requieren acompañamiento prioritario."
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#00343d] py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-[#F8F0AF]/10" />
          <div className="absolute -right-8 -top-10 h-48 w-48 rounded-full border border-[#F8F0AF]/10" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-[#F8F0AF]/50 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#F8F0AF]">
                Prevenir empieza por ver a tiempo
              </p>
              <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-[1] tracking-[-0.045em] md:text-6xl">
                Una plataforma para ayudar a que más estudiantes continúen su
                trayectoria educativa.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">
                Conoce cómo SIEDES integra tecnología, contexto y acción humana
                para apoyar la prevención de la deserción escolar.
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
                Conocer SIEDES
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SignalStrip({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#001c22]/70 p-4">
      <div className="flex items-center gap-2 text-[#F8F0AF]">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.16em]">{label}</span>
      </div>
      <p className="mt-3 text-sm text-white/70">{value}</p>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#002930] p-4">
      <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function Principle({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#F8F0AF] px-6 py-8 md:px-8 md:py-10">
      <div className="flex items-center justify-between border-b border-[#002930]/15 pb-5">
        <span className="text-[10px] uppercase tracking-[0.18em] text-[#AC4A00]">
          Principio
        </span>
        <span className="text-sm text-[#002930]/35">{number}</span>
      </div>
      <h3 className="mt-6 text-xl font-medium tracking-[-0.025em]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#002930]/65">{description}</p>
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] uppercase tracking-[0.22em] text-[#F8F0AF]">
        {kicker}
      </p>
      <h2 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.045em] md:text-6xl">
        {title}
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">
        {description}
      </p>
    </div>
  );
}

function FlowStep({
  number,
  icon,
  title,
  description,
  isLast,
}: {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
  isLast: boolean;
}) {
  return (
    <article
      className={`relative bg-[#001c22] p-6 md:p-8 ${
        isLast ? "" : "border-b border-white/10 md:border-r xl:border-b-0"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs tracking-[0.18em] text-white/35">{number}</span>
        <div className="text-[#F8F0AF]">{icon}</div>
      </div>
      <div className="mt-14 h-px bg-white/10">
        <div className="h-px w-10 bg-[#AC4A00]" />
      </div>
      <h3 className="mt-6 text-xl font-medium">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/60">{description}</p>
    </article>
  );
}

function RiskDimension({
  icon,
  title,
  description,
  index,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <article className="min-h-64 bg-[#002930] p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center border border-[#F8F0AF]/20 text-[#F8F0AF]">
          {icon}
        </div>
        <span className="text-xs text-white/30">0{index}</span>
      </div>
      <h3 className="mt-10 text-xl font-medium">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/60">{description}</p>
    </article>
  );
}

function ArchitectureRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[auto_5rem_1fr] items-center gap-3 border-b border-white/10 py-4 last:border-b-0">
      <span className="text-[#F8F0AF]">{icon}</span>
      <span className="text-[10px] uppercase tracking-[0.16em] text-white/35">
        {label}
      </span>
      <span className="text-sm text-white/75">{value}</span>
    </div>
  );
}

function ImpactBlock({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="bg-[#001c22] p-7 md:p-9">
      <div className="text-[#F8F0AF]">{icon}</div>
      <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-white/60">{description}</p>
      <div className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.17em] text-white/35">
        <CheckCircle2 className="h-3.5 w-3.5 text-[#AC4A00]" />
        SIEDES
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Network,
  ShieldCheck,
  Target,
  Users,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Beneficios de SIEDES",
  description:
    "Conoce cómo SIEDES puede apoyar a estudiantes, docentes, instituciones, familias y comunidades en estrategias de permanencia escolar.",
};

const audiences = [
  {
    number: "01",
    id: "estudiantes",
    icon: <GraduationCap className="h-6 w-6" />,
    label: "Estudiantes",
    title: "Acompañamiento antes de que el riesgo se convierta en abandono.",
    description:
      "SIEDES busca hacer visibles señales que pueden pasar desapercibidas y facilitar una respuesta más oportuna, contextualizada y humana.",
    points: [
      "Identificación temprana de cambios relevantes en la trayectoria escolar",
      "Seguimiento organizado de alertas e intervenciones",
      "Lectura del riesgo dentro del contexto personal, familiar y territorial",
      "Acompañamiento orientado a la permanencia educativa",
    ],
  },
  {
    number: "02",
    id: "docentes",
    icon: <BookOpenCheck className="h-6 w-6" />,
    label: "Docentes",
    title: "Más contexto para priorizar y acompañar mejor.",
    description:
      "La plataforma puede concentrar señales académicas y contextuales para apoyar la observación pedagógica y la coordinación con otros actores.",
    points: [
      "Alertas priorizadas para orientar la revisión de casos",
      "Información contextual disponible en un mismo flujo",
      "Registro de acciones y seguimiento",
      "Mejor coordinación con orientación, familias y redes de apoyo",
    ],
  },
  {
    number: "03",
    id: "instituciones",
    icon: <Building2 className="h-6 w-6" />,
    label: "Instituciones",
    title: "Una visión más estructurada de la permanencia escolar.",
    description:
      "SIEDES permite organizar señales, casos y acciones para apoyar decisiones institucionales basadas en evidencia y seguimiento.",
    points: [
      "Priorización de estudiantes que requieren revisión",
      "Trazabilidad de alertas e intervenciones",
      "Lectura agregada de patrones y factores recurrentes",
      "Mejor focalización de recursos y capacidades institucionales",
    ],
  },
  {
    number: "04",
    id: "familias",
    icon: <UsersRound className="h-6 w-6" />,
    label: "Familias",
    title: "Mayor articulación alrededor de la trayectoria del estudiante.",
    description:
      "Cuando corresponde, la información puede facilitar conversaciones más oportunas entre la institución, el estudiante y su entorno familiar.",
    points: [
      "Participación informada en rutas de acompañamiento",
      "Mayor claridad sobre señales que requieren atención",
      "Coordinación con la institución educativa",
      "Reconocimiento del contexto familiar dentro del análisis",
    ],
  },
  {
    number: "05",
    id: "comunidad",
    icon: <Network className="h-6 w-6" />,
    label: "Comunidad",
    title: "El territorio también forma parte de la solución.",
    description:
      "El enfoque etnoeducativo reconoce que la permanencia escolar no depende únicamente del aula y que las redes comunitarias pueden aportar contexto y capacidad de respuesta.",
    points: [
      "Lectura territorial de factores de vulnerabilidad",
      "Reconocimiento de identidad y contexto cultural",
      "Articulación con redes y actores comunitarios",
      "Evidencia para comprender retos educativos locales",
    ],
  },
];

const capabilities = [
  {
    icon: <BellRing className="h-5 w-5" />,
    title: "Detección temprana",
    description:
      "Transformar datos y cambios de trayectoria en señales que puedan revisarse antes de una posible desvinculación.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Priorización basada en evidencia",
    description:
      "Ayudar a ordenar la atención cuando existen múltiples casos y recursos institucionales limitados.",
  },
  {
    icon: <HeartHandshake className="h-5 w-5" />,
    title: "Intervención coordinada",
    description:
      "Conectar la señal analítica con acciones de docentes, orientación, familias y redes de apoyo.",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Contexto etnoeducativo",
    description:
      "Interpretar la información considerando territorio, comunidad, identidad cultural y condiciones de vulnerabilidad.",
  },
];

export default function BenefitsPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#002930] text-white">
      <section className="relative isolate border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(248,240,175,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,240,175,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute -right-36 -top-40 h-[34rem] w-[34rem] rounded-full border border-[#F8F0AF]/10" />
          <div className="absolute -bottom-36 -left-36 h-[28rem] w-[28rem] bg-[#AC4A00]/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-[#F8F0AF]/25 bg-[#F8F0AF]/5 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#F8F0AF]">
                Beneficios
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                05 actores · 01 propósito
              </span>
            </div>

            <h1 className="mt-8 max-w-5xl text-[clamp(3.4rem,8vw,7rem)] font-medium leading-[0.9] tracking-[-0.055em]">
              Tecnología que
              <span className="block text-[#F8F0AF]">amplía la capacidad</span>
              <span className="block">de acompañar.</span>
            </h1>

            <p className="mt-8 max-w-3xl border-t border-white/10 pt-7 text-base leading-7 text-white/65 md:text-lg">
              El valor de SIEDES no está en producir un puntaje. Está en ayudar a
              que estudiantes, docentes, instituciones, familias y comunidad
              puedan interpretar señales y actuar con mayor oportunidad.
            </p>
          </div>

          <div className="border border-white/10 bg-[#001c22]/80 p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#F8F0AF]">
                  Propuesta de valor
                </p>
                <h2 className="mt-2 text-2xl font-medium">
                  De la información a una respuesta coordinada
                </h2>
              </div>
              <Target className="h-6 w-6 text-[#F8F0AF]" />
            </div>

            <div className="mt-2">
              {[
                ["01", "Ver", "Detectar señales relevantes"],
                ["02", "Priorizar", "Ordenar la atención"],
                ["03", "Comprender", "Incorporar contexto"],
                ["04", "Actuar", "Coordinar acompañamiento"],
              ].map(([number, label, value]) => (
                <div
                  key={number}
                  className="grid grid-cols-[2rem_5rem_1fr] items-center gap-3 border-b border-white/10 py-4 last:border-b-0"
                >
                  <span className="text-[10px] tracking-[0.16em] text-[#F8F0AF]">
                    {number}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                    {label}
                  </span>
                  <span className="text-sm text-white/70">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#002930]/15 bg-[#F8F0AF] text-[#002930]">
        <div className="mx-auto max-w-7xl overflow-x-auto px-5 sm:px-6 lg:px-8">
          <nav className="flex min-w-max" aria-label="Beneficios por actor">
            {audiences.map((audience) => (
              <a
                key={audience.id}
                href={"#" + audience.id}
                className="group flex min-w-[190px] items-center gap-3 border-r border-[#002930]/15 px-5 py-5 first:border-l transition hover:bg-white/30"
              >
                <span className="text-[10px] tracking-[0.18em] text-[#AC4A00]">
                  {audience.number}
                </span>
                <span className="text-xs font-medium">{audience.label}</span>
                <ArrowRight className="ml-auto h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#001c22] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((item, index) => (
              <CapabilityCard
                key={item.title}
                number={index + 1}
                {...item}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#002930]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.68fr_1.32fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#F8F0AF]">
                Beneficio compartido
              </p>
              <h2 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.045em] md:text-5xl">
                Una misma señal puede activar capacidades distintas.
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-6 text-white/55">
                SIEDES organiza la información para que cada actor pueda intervenir
                desde su rol, sin convertir el análisis predictivo en una decisión
                automática.
              </p>

              <div className="mt-9 flex items-start gap-3 border-l border-[#F8F0AF]/20 pl-5">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#F8F0AF]" />
                <p className="text-sm leading-6 text-white/65">
                  El acompañamiento debe conservar criterio humano, protección de
                  datos y lectura contextual durante todo el proceso.
                </p>
              </div>
            </div>

            <div className="border-t border-white/10">
              {audiences.map((audience) => (
                <AudienceSection key={audience.id} audience={audience} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#002930]/15 bg-[#F8F0AF] py-20 text-[#002930] md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:items-center lg:px-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#AC4A00]">
              Resultado esperado
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] md:text-6xl">
              Más capacidad para actuar antes, no más automatización por sí sola.
            </h2>
          </div>

          <div className="border-l border-[#002930]/15 pl-6 md:pl-8">
            <p className="text-base leading-7 text-[#002930]/65">
              La plataforma está orientada a apoyar la permanencia escolar mediante
              detección, priorización, contexto y seguimiento. Los resultados reales
              deben medirse durante el piloto y no asumirse antes de contar con
              evidencia.
            </p>
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
              Siguiente paso
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-[1] tracking-[-0.045em] md:text-6xl">
              Conoce cómo estas capacidades se conectan dentro del flujo SIEDES.
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/como-funciona"
              className="group inline-flex min-h-12 items-center justify-between gap-8 bg-[#F8F0AF] px-5 py-3 text-sm font-medium text-[#002930] transition hover:bg-white"
            >
              Ver cómo funciona
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

function CapabilityCard({
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
    <article className="min-h-64 bg-[#001c22] p-6 md:p-8">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center border border-[#F8F0AF]/20 text-[#F8F0AF]">
          {icon}
        </span>
        <span className="text-xs text-white/25">0{number}</span>
      </div>
      <h3 className="mt-10 text-xl font-medium">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/55">{description}</p>
    </article>
  );
}

function AudienceSection({
  audience,
}: {
  audience: (typeof audiences)[number];
}) {
  return (
    <article
      id={audience.id}
      className="scroll-mt-32 border-b border-white/10 py-10 last:border-b-0 md:py-14"
    >
      <div className="flex items-center gap-4">
        <span className="text-xs tracking-[0.18em] text-white/30">
          {audience.number}
        </span>
        <span className="h-px w-10 bg-[#AC4A00]" />
        <span className="text-[10px] uppercase tracking-[0.18em] text-[#F8F0AF]">
          {audience.label}
        </span>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[.9fr_1.1fr] xl:gap-12">
        <div>
          <div className="flex h-12 w-12 items-center justify-center border border-[#F8F0AF]/20 text-[#F8F0AF]">
            {audience.icon}
          </div>
          <h3 className="mt-6 max-w-xl text-2xl font-medium leading-tight tracking-[-0.03em] md:text-3xl">
            {audience.title}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/55 md:text-base md:leading-7">
            {audience.description}
          </p>
        </div>

        <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
          {audience.points.map((point) => (
            <div key={point} className="flex gap-3 bg-[#002930] p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F8F0AF]" />
              <p className="text-sm leading-6 text-white/60">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

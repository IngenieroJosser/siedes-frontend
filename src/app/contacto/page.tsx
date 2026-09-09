import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contacto | SIEDES",
  description:
    "Canales de contacto e información para comunicarse con el proyecto SIEDES.",
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#001c22] text-white">
      <section className="relative isolate border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(248,240,175,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,240,175,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full border border-[#F8F0AF]/10" />
          <div className="absolute -bottom-44 -left-36 h-[28rem] w-[28rem] bg-[#AC4A00]/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-[#F8F0AF]/25 bg-[#F8F0AF]/5 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#F8F0AF]">
                Contacto
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                Quibdó · Chocó · Colombia
              </span>
            </div>

            <h1 className="mt-8 max-w-5xl text-[clamp(3.3rem,7.6vw,6.8rem)] font-medium leading-[0.91] tracking-[-0.055em]">
              Conversemos sobre
              <span className="block text-[#F8F0AF]">SIEDES.</span>
            </h1>

            <p className="mt-8 max-w-3xl border-t border-white/10 pt-7 text-base leading-7 text-white/60 md:text-lg">
              Este espacio reúne los canales publicados del proyecto para
              consultas generales, colaboración e información sobre la
              plataforma.
            </p>
          </div>

          <div className="border border-white/10 bg-[#002930]/85 p-6 md:p-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#F8F0AF]">
              ¿Tu consulta es sobre un estudiante?
            </p>
            <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">
              Usa la ruta de solicitud de apoyo.
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/52">
              Las situaciones educativas que requieren revisión deben registrarse
              en el flujo diseñado para asociar institución, estudiante, motivo y
              contexto.
            </p>

            <Link
              href="/solicitar-ayuda"
              className="group mt-7 inline-flex min-h-11 items-center justify-between gap-8 border border-[#F8F0AF]/25 px-4 text-sm font-medium text-[#F8F0AF] transition hover:bg-[#F8F0AF] hover:text-[#002930]"
            >
              Solicitar apoyo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F0AF] py-14 text-[#002930] md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[.78fr_1.22fr] lg:gap-16 lg:px-8">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#AC4A00]">
              Canales publicados
            </p>
            <h2 className="mt-4 max-w-md text-3xl font-medium leading-[1.02] tracking-[-0.04em] md:text-4xl">
              Una vía clara según el tipo de contacto.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#002930]/55">
              Evitamos mostrar horarios, teléfonos o promesas de respuesta que
              no estén respaldados por el proyecto.
            </p>

            <div className="mt-8 border-t border-[#002930]/15">
              <ContactChannel
                index="01"
                icon={<Mail className="h-4 w-4" />}
                label="Correo general"
                value="siedes.uib@gmail.com"
                href="mailto:siedes.uib@gmail.com"
              />
              <ContactChannel
                index="02"
                icon={<Phone className="h-4 w-4" />}
                label="Contacto"
                value="+57 323 284 2193"
                href="tel:+573232842193"
              />
              <ContactChannel
                index="03"
                icon={<MapPin className="h-4 w-4" />}
                label="Contexto del proyecto"
                value="Quibdó, Chocó · Colombia"
              />
            </div>

            <div className="mt-8 flex items-start gap-3 border-l-2 border-[#AC4A00] pl-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#AC4A00]" />
              <p className="text-xs leading-5 text-[#002930]/48">
                Para información sensible de estudiantes utiliza únicamente los
                flujos autorizados de la plataforma y evita incluir datos
                innecesarios en un correo general.
              </p>
            </div>
          </aside>

          <div className="border border-[#002930]/15">
            <div className="border-b border-[#002930]/15 p-5 md:p-7">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#AC4A00]">
                Consulta general
              </p>
              <h2 className="mt-3 text-2xl font-medium tracking-[-0.035em] md:text-3xl">
                Preparar un mensaje
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#002930]/52">
                Completa los campos y abriremos tu aplicación de correo con la
                información preparada para enviarla al canal oficial publicado.
              </p>
            </div>

            <div className="p-5 md:p-7">
              <ContactForm />
            </div>

            <div className="grid gap-px border-t border-[#002930]/15 bg-[#002930]/15 md:grid-cols-2">
              <div className="bg-[#F8F0AF] p-5">
                <p className="text-[9px] uppercase tracking-[0.16em] text-[#AC4A00]">
                  Consultas generales
                </p>
                <p className="mt-3 text-sm leading-6 text-[#002930]/55">
                  Información sobre la plataforma, tecnología, enfoque
                  etnoeducativo o posibilidades de colaboración.
                </p>
              </div>

              <div className="bg-[#F8F0AF] p-5">
                <p className="text-[9px] uppercase tracking-[0.16em] text-[#AC4A00]">
                  Solicitudes de apoyo
                </p>
                <p className="mt-3 text-sm leading-6 text-[#002930]/55">
                  Para registrar una situación educativa utiliza
                  <Link
                    href="/solicitar-ayuda"
                    className="ml-1 font-medium text-[#AC4A00] underline decoration-[#AC4A00]/30 underline-offset-4"
                  >
                    Solicitar ayuda
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactChannel({
  index,
  icon,
  label,
  value,
  href,
}: {
  index: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="grid grid-cols-[2rem_2rem_1fr_auto] items-center gap-3 border-b border-[#002930]/15 py-4">
      <span className="text-[9px] tracking-[0.16em] text-[#AC4A00]">
        {index}
      </span>
      <span className="flex h-8 w-8 items-center justify-center border border-[#002930]/14 text-[#AC4A00]">
        {icon}
      </span>
      <div>
        <p className="text-[9px] uppercase tracking-[0.14em] text-[#002930]/38">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium">{value}</p>
      </div>
      {href && <ArrowRight className="h-4 w-4 text-[#002930]/25" />}
    </div>
  );

  return href ? (
    <a href={href} className="block transition hover:bg-white/25">
      {content}
    </a>
  ) : (
    content
  );
}

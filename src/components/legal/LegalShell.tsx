import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";

export type LegalSection = {
  number: string;
  id: string;
  title: ReactNode;
  content: ReactNode;
};

type LegalShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  statusLabel: string;
  notice?: ReactNode;
  sections: LegalSection[];
};

export default function LegalShell({
  eyebrow,
  title,
  description,
  statusLabel,
  notice,
  sections,
}: LegalShellProps) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#001c22] text-white">
      <section className="relative isolate border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(248,240,175,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,240,175,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute -right-36 -top-40 h-[32rem] w-[32rem] rounded-full border border-[#F8F0AF]/10" />
          <div className="absolute -bottom-36 -left-36 h-[26rem] w-[26rem] bg-[#AC4A00]/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-[#F8F0AF]/25 bg-[#F8F0AF]/5 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#F8F0AF]">
                {eyebrow}
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                SIEDES · Septiembre 2026
              </span>
            </div>

            <h1 className="mt-8 max-w-5xl text-[clamp(3.25rem,7.5vw,6.7rem)] font-medium leading-[0.92] tracking-[-0.055em]">
              {title}
            </h1>

            <p className="mt-8 max-w-3xl border-t border-white/10 pt-7 text-base leading-7 text-white/62 md:text-lg">
              {description}
            </p>
          </div>

          <div className="border border-white/10 bg-[#002930]/80 p-6 md:p-8">
            <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#F8F0AF]">
                  Estado del documento
                </p>
                <p className="mt-2 text-2xl font-medium">{statusLabel}</p>
              </div>
              <FileText className="h-6 w-6 text-[#F8F0AF]" />
            </div>

            <div className="mt-5 flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#F8F0AF]" />
              <p className="text-sm leading-6 text-white/52">
                El contenido se limita a lo que actualmente puede inferirse del
                proyecto y de sus flujos implementados. No presenta como
                certificadas garantías legales o técnicas que aún deban
                formalizarse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {notice && (
        <section className="border-b border-[#002930]/15 bg-[#F8F0AF] text-[#002930]">
          <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
            <div className="grid gap-4 border-l-2 border-[#AC4A00] pl-5 md:grid-cols-[auto_1fr] md:items-start">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#AC4A00]">
                Nota
              </span>
              <div className="text-sm leading-6 text-[#002930]/65">{notice}</div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#F8F0AF] py-14 text-[#002930] md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[.62fr_1.38fr] lg:gap-16 lg:px-8">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#AC4A00]">
              Índice
            </p>
            <nav className="mt-6 border-t border-[#002930]/15" aria-label="Índice del documento">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={"#" + section.id}
                  className="group grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-[#002930]/15 py-4 text-sm transition hover:bg-white/25"
                >
                  <span className="text-[10px] tracking-[0.16em] text-[#AC4A00]">
                    {section.number}
                  </span>
                  <span>{section.title}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#002930]/35 transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </nav>

            <div className="mt-8 border-l border-[#002930]/15 pl-4">
              <p className="text-xs leading-5 text-[#002930]/45">
                Para asuntos relacionados con estas páginas del proyecto puedes
                usar el canal de contacto que ya se encuentra publicado en SIEDES:
                <a
                  href="mailto:siedes.uib@gmail.com"
                  className="ml-1 font-medium text-[#AC4A00] underline decoration-[#AC4A00]/30 underline-offset-4"
                >
                  siedes.uib@gmail.com
                </a>
              </p>
            </div>
          </aside>

          <div className="border-t border-[#002930]/15">
            {sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-32 border-b border-[#002930]/15 py-9 md:py-11"
              >
                <div className="grid gap-5 md:grid-cols-[3rem_1fr]">
                  <span className="text-xs tracking-[0.18em] text-[#AC4A00]">
                    {section.number}
                  </span>
                  <div>
                    <h2 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-4 text-sm leading-7 text-[#002930]/66 md:text-base">
                      {section.content}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#002930] py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#F8F0AF]">
              Información institucional
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
              Consulta también las demás páginas de información del proyecto.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <PolicyLink href="/privacidad">Privacidad</PolicyLink>
            <PolicyLink href="/terminos">Términos</PolicyLink>
            <PolicyLink href="/accesibilidad">Accesibilidad</PolicyLink>
          </div>
        </div>
      </section>
    </div>
  );
}

function PolicyLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center border border-white/15 px-4 text-xs font-medium text-white/70 transition hover:border-[#F8F0AF]/40 hover:text-[#F8F0AF]"
    >
      {children}
    </Link>
  );
}

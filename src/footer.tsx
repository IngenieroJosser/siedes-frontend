import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

const productLinks = [
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/beneficios", label: "Beneficios" },
  { href: "/tecnologia", label: "Tecnología" },
  { href: "/solicitar-ayuda", label: "Solicitar ayuda" },
];

const institutionalLinks = [
  { href: "/contacto", label: "Contacto" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/terminos", label: "Términos" },
  { href: "/accesibilidad", label: "Accesibilidad" },
];

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="relative overflow-hidden border-t border-white/10 bg-[#001c22] text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(248,240,175,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(248,240,175,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute -bottom-48 -right-40 h-[30rem] w-[30rem] rounded-full border border-[#F8F0AF]/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 py-14 md:py-16 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#F8F0AF]">
              SIEDES
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-[1.02] tracking-[-0.04em] md:text-5xl">
              Datos, contexto y acompañamiento para apoyar la permanencia escolar.
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <Link
              href="/solicitar-ayuda"
              className="group inline-flex min-h-12 items-center justify-between gap-8 bg-[#AC4A00] px-5 text-sm font-medium text-white transition hover:bg-[#D45A10]"
            >
              Registrar una solicitud
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.35fr_.65fr_.65fr] lg:gap-14">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center border border-[#F8F0AF]/20 bg-[#002930]">
                <Image
                  src="/favicon-32x32.png"
                  alt=""
                  width={32}
                  height={32}
                  className="h-7 w-7 object-contain"
                />
              </span>
              <span>
                <span className="block text-lg font-medium tracking-[-0.025em]">
                  SIEDES
                </span>
                <span className="mt-0.5 block text-[9px] uppercase tracking-[0.16em] text-white/35">
                  IA · Analítica · Etnoeducación
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-lg text-sm leading-6 text-white/52">
              Plataforma orientada a identificar señales de riesgo, organizar
              información educativa y apoyar procesos de seguimiento en contextos
              de vulnerabilidad, con una lectura responsable del componente
              etnoeducativo.
            </p>

            <div className="mt-7 grid max-w-xl gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              <ContactItem
                icon={<MapPin className="h-4 w-4" />}
                label="Contexto"
                value="Quibdó, Chocó · Colombia"
              />
              <ContactItem
                icon={<Mail className="h-4 w-4" />}
                label="Correo"
                value={
                  <a
                    href="mailto:siedes.uib@gmail.com"
                    className="transition hover:text-[#F8F0AF]"
                  >
                    siedes.uib@gmail.com
                  </a>
                }
              />
            </div>
          </div>

          <FooterColumn title="Plataforma" links={productLinks} />
          <FooterColumn title="Información" links={institutionalLinks} />
        </div>

        <div className="grid gap-6 border-t border-white/10 py-7 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#F8F0AF]" />
            <p className="max-w-2xl text-xs leading-5 text-white/38">
              Las señales generadas o registradas en SIEDES deben interpretarse
              con contexto y revisión humana. La plataforma no sustituye el
              criterio pedagógico ni institucional.
            </p>
          </div>

          <p className="text-xs text-white/32">
            © {new Date().getFullYear()} SIEDES
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[0.18em] text-[#F8F0AF]">
        {title}
      </p>
      <nav className="mt-5 border-t border-white/10" aria-label={title}>
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            className="group grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-white/10 py-4 text-sm text-white/58 transition hover:text-white"
          >
            <span className="text-[9px] tracking-[0.14em] text-white/20">
              0{index + 1}
            </span>
            <span>{link.label}</span>
            <ArrowRight className="h-3.5 w-3.5 text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-[#F8F0AF]" />
          </Link>
        ))}
      </nav>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="bg-[#001c22] p-4">
      <div className="flex items-center gap-2 text-[#F8F0AF]">
        {icon}
        <span className="text-[9px] uppercase tracking-[0.15em]">{label}</span>
      </div>
      <div className="mt-3 text-xs leading-5 text-white/52">{value}</div>
    </div>
  );
}

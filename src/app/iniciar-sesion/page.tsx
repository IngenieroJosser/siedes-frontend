"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BrainCircuit,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { login } from "@/services/auth";
import { Rol } from "@/lib/type";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await login(formData);

      switch (response.data.user.rol) {
        case Rol.ESTUDIANTE:
          router.push("/core/students");
          break;
        case Rol.DOCENTE:
        case Rol.PADRE:
        case Rol.COORDINADOR:
        case Rol.LIDER_COMUNITARIO:
        default:
          router.push("/core");
          break;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("No fue posible iniciar sesión. Verifica tus credenciales e intenta nuevamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#001c22] text-white">
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl lg:grid-cols-[.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden border-r border-white/10 bg-[#002930] p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(248,240,175,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,240,175,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
            <div className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full border border-[#F8F0AF]/10" />
            <div className="absolute -bottom-32 -left-32 h-[24rem] w-[24rem] bg-[#AC4A00]/10 blur-3xl" />
          </div>

          <div className="relative">
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
                  Entorno operativo
                </p>
              </div>
            </div>

            <p className="mt-16 text-[10px] uppercase tracking-[0.22em] text-[#F8F0AF]">
              Acceso institucional
            </p>
            <h1 className="mt-5 max-w-xl text-5xl font-medium leading-[0.96] tracking-[-0.05em] xl:text-6xl">
              Convertir señales en
              <span className="block text-[#F8F0AF]">acciones de acompañamiento.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-white/55">
              Ingresa al espacio de trabajo donde la información, las alertas y
              el seguimiento se conectan con la gestión de permanencia escolar.
            </p>
          </div>

          <div className="relative grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
            <AccessPrinciple
              icon={<BrainCircuit className="h-4 w-4" />}
              label="Analítica"
              value="Señales de riesgo"
            />
            <AccessPrinciple
              icon={<UserRoundCheck className="h-4 w-4" />}
              label="Criterio"
              value="Revisión humana"
            />
            <AccessPrinciple
              icon={<ShieldCheck className="h-4 w-4" />}
              label="Gestión"
              value="Seguimiento"
            />
          </div>
        </section>

        <main className="flex items-center bg-[#F8F0AF] px-5 py-14 text-[#002930] sm:px-8 md:py-20 lg:px-14 xl:px-20">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-10 flex items-center justify-between gap-6 lg:hidden">
              <Link href="/" className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center border border-[#002930]/15 bg-[#002930]">
                  <Image
                    src="/favicon-32x32.png"
                    alt=""
                    width={32}
                    height={32}
                    className="h-7 w-7 object-contain"
                  />
                </span>
                <span>
                  <span className="block text-base font-medium">SIEDES</span>
                  <span className="block text-[9px] uppercase tracking-[0.16em] text-[#002930]/40">
                    Acceso
                  </span>
                </span>
              </Link>
            </div>

            <p className="text-[10px] uppercase tracking-[0.22em] text-[#AC4A00]">
              Iniciar sesión
            </p>
            <h2 className="mt-4 text-4xl font-medium tracking-[-0.045em] md:text-5xl">
              Bienvenido de nuevo.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#002930]/60">
              Usa las credenciales asociadas a tu cuenta para acceder al entorno
              de SIEDES.
            </p>

            {error && (
              <div
                role="alert"
                className="mt-8 border border-[#AC4A00]/30 bg-[#AC4A00]/5 px-4 py-3 text-sm leading-6 text-[#7d3500]"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-9 space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="text-[10px] uppercase tracking-[0.17em] text-[#002930]/55"
                >
                  Correo electrónico
                </label>
                <div className="relative mt-2">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#002930]/35" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className="min-h-13 w-full border border-[#002930]/20 bg-transparent py-3 pl-11 pr-4 text-base outline-none transition placeholder:text-[#002930]/30 focus:border-[#002930]"
                    placeholder="nombre@correo.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-[10px] uppercase tracking-[0.17em] text-[#002930]/55"
                >
                  Contraseña
                </label>
                <div className="relative mt-2">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#002930]/35" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    className="min-h-13 w-full border border-[#002930]/20 bg-transparent py-3 pl-11 pr-4 text-base outline-none transition placeholder:text-[#002930]/30 focus:border-[#002930]"
                    placeholder="Tu contraseña"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group inline-flex min-h-13 w-full items-center justify-between gap-6 bg-[#AC4A00] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#D45A10] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>{isLoading ? "Validando acceso..." : "Ingresar a SIEDES"}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <div className="mt-9 border-t border-[#002930]/15 pt-6">
              <p className="text-sm text-[#002930]/60">
                ¿Aún no tienes una cuenta?{" "}
                <Link
                  href="/crear-cuenta"
                  className="font-medium text-[#AC4A00] underline decoration-[#AC4A00]/30 underline-offset-4 hover:decoration-[#AC4A00]"
                >
                  Crear cuenta
                </Link>
              </p>
            </div>

            <div className="mt-8 flex items-start gap-3 border-l border-[#002930]/15 pl-4">
              <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#AC4A00]" />
              <p className="text-xs leading-5 text-[#002930]/45">
                No compartas tus credenciales. El acceso a información educativa
                debe mantenerse restringido a usuarios autorizados.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function AccessPrinciple({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#001c22] p-4">
      <div className="flex items-center gap-2 text-[#F8F0AF]">
        {icon}
        <span className="text-[9px] uppercase tracking-[0.16em]">{label}</span>
      </div>
      <p className="mt-3 text-xs text-white/55">{value}</p>
    </div>
  );
}

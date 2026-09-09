"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Accessibility,
  BrainCircuit,
  Database,
  ExternalLink,
  FileText,
  LockKeyhole,
  LogOut,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import {
  CorePage,
  CorePageHeader,
  Panel,
} from "@/components/core/CoreUI";

const tabs = [
  {
    id: "system",
    label: "Sistema",
    description: "Integraciones y módulos",
    icon: SlidersHorizontal,
  },
  {
    id: "ai",
    label: "IA y riesgo",
    description: "Umbrales y gobernanza",
    icon: BrainCircuit,
  },
  {
    id: "privacy",
    label: "Datos y privacidad",
    description: "Políticas y minimización",
    icon: ShieldCheck,
  },
  {
    id: "access",
    label: "Acceso",
    description: "Sesión y seguridad",
    icon: LockKeyhole,
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("system");

  const apiConfigured = Boolean(process.env.NEXT_PUBLIC_BASE_URL);

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/iniciar-sesion";
    }
  };

  return (
    <CorePage>
      <CorePageHeader
        eyebrow="Configuración y gobernanza"
        title="Configuración"
        description="Consulta los parámetros que afectan la experiencia operativa de SIEDES y distingue entre configuración implementada, criterios de interfaz y aspectos que todavía requieren integración institucional."
      />

      <div className="mt-8 grid gap-6 xl:grid-cols-[320px_1fr]">
        <Panel eyebrow="Secciones" title="Configuración del sistema">
          <nav className="p-2" aria-label="Secciones de configuración">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={
                    "grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-b border-[#002930]/10 px-3 py-4 text-left transition last:border-b-0 " +
                    (active
                      ? "bg-[#002930] text-white"
                      : "hover:bg-white/30")
                  }
                >
                  <span
                    className={
                      "flex h-9 w-9 items-center justify-center border " +
                      (active
                        ? "border-white/15 text-[#F8F0AF]"
                        : "border-[#002930]/14 text-[#AC4A00]")
                    }
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <span>
                    <span className="block text-sm font-medium">
                      {tab.label}
                    </span>
                    <span
                      className={
                        "mt-1 block text-[10px] " +
                        (active ? "text-white/40" : "text-[#002930]/40")
                      }
                    >
                      {tab.description}
                    </span>
                  </span>

                  <span
                    className={
                      "text-[9px] tracking-[0.16em] " +
                      (active ? "text-[#F8F0AF]" : "text-[#002930]/28")
                    }
                  >
                    0{index + 1}
                  </span>
                </button>
              );
            })}
          </nav>
        </Panel>

        <div>
          {activeTab === "system" && (
            <Panel eyebrow="Sistema" title="Estado de integración">
              <div className="grid gap-px bg-[#002930]/12 md:grid-cols-2">
                <ConfigCard
                  icon={<Database className="h-5 w-5" />}
                  label="API del backend"
                  value={apiConfigured ? "Configurada" : "Fallback local"}
                  description={
                    apiConfigured
                      ? "La aplicación utiliza NEXT_PUBLIC_BASE_URL para resolver las solicitudes al backend."
                      : "No se detectó NEXT_PUBLIC_BASE_URL en el bundle; el cliente usa el fallback definido en la capa API."
                  }
                />
                <ConfigCard
                  icon={<BrainCircuit className="h-5 w-5" />}
                  label="Servicio de IA"
                  value="Integración indirecta"
                  description="El frontend consume el backend SIEDES. La comunicación con el servicio FastAPI de IA permanece desacoplada detrás del backend."
                />
                <ConfigCard
                  icon={<SlidersHorizontal className="h-5 w-5" />}
                  label="Módulos operativos"
                  value="5 superficies principales"
                  description="Estudiantes, alertas, intervenciones, reportes y configuración comparten el mismo workspace interno."
                />
                <ConfigCard
                  icon={<ShieldCheck className="h-5 w-5" />}
                  label="Gobernanza"
                  value="Visible en producto"
                  description="La interfaz diferencia señales predictivas, revisión humana y documentación de decisiones."
                />
              </div>

              <div className="border-t border-[#002930]/12 p-5">
                <p className="text-[9px] uppercase tracking-[0.17em] text-[#AC4A00]">
                  Nota operativa
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#002930]/55">
                  Esta página no simula un panel de administración que todavía no
                  existe en el backend. Los parámetros persistentes del sistema
                  deben exponerse mediante endpoints y permisos específicos antes
                  de ofrecer controles de edición en producción.
                </p>
              </div>
            </Panel>
          )}

          {activeTab === "ai" && (
            <Panel eyebrow="IA responsable" title="Interpretación del riesgo">
              <div className="p-5 md:p-6">
                <p className="max-w-3xl text-sm leading-6 text-[#002930]/58">
                  La interfaz actual clasifica la probabilidad disponible en cuatro
                  niveles para organizar la revisión. Estos cortes son criterios de
                  presentación y deben calibrarse con el modelo y el ground truth
                  longitudinal antes de considerarse umbrales definitivos de
                  intervención.
                </p>

                <div className="mt-7 grid gap-px border border-[#002930]/12 bg-[#002930]/12 sm:grid-cols-2 xl:grid-cols-4">
                  <ThresholdCard label="Bajo" range="< 40%" index="01" />
                  <ThresholdCard label="Medio" range="40% — 59%" index="02" />
                  <ThresholdCard label="Alto" range="60% — 79%" index="03" />
                  <ThresholdCard label="Crítico" range="≥ 80%" index="04" />
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                  <GovernanceBlock
                    title="Human-in-the-loop"
                    items={[
                      "La señal no reemplaza el criterio pedagógico.",
                      "La revisión debe contrastar el contexto disponible.",
                      "La intervención debe quedar trazable.",
                    ]}
                  />
                  <GovernanceBlock
                    title="Atributos sensibles"
                    items={[
                      "La etnia no debe incrementar automáticamente el riesgo.",
                      "Los subgrupos deben utilizarse para auditoría de equidad.",
                      "Variables territoriales pueden actuar como proxies y requieren revisión.",
                    ]}
                  />
                </div>
              </div>
            </Panel>
          )}

          {activeTab === "privacy" && (
            <Panel eyebrow="Datos" title="Privacidad y documentación">
              <div className="p-5 md:p-6">
                <p className="max-w-3xl text-sm leading-6 text-[#002930]/58">
                  SIEDES trabaja con información educativa y contextual. La
                  minimización de datos, el control de acceso y la revisión del
                  uso de variables sensibles deben formar parte del ciclo completo
                  del producto.
                </p>

                <div className="mt-8 grid gap-px border border-[#002930]/12 bg-[#002930]/12 md:grid-cols-3">
                  <PolicyCard
                    icon={<ShieldCheck className="h-5 w-5" />}
                    title="Privacidad"
                    description="Categorías de datos, finalidades y aspectos por formalizar."
                    href="/privacidad"
                  />
                  <PolicyCard
                    icon={<FileText className="h-5 w-5" />}
                    title="Términos"
                    description="Condiciones de uso y límites del análisis predictivo."
                    href="/terminos"
                  />
                  <PolicyCard
                    icon={<Accessibility className="h-5 w-5" />}
                    title="Accesibilidad"
                    description="Prácticas aplicadas y verificaciones pendientes."
                    href="/accesibilidad"
                  />
                </div>

                <div className="mt-8 border-l-2 border-[#AC4A00] pl-4">
                  <p className="text-xs leading-5 text-[#002930]/50">
                    Antes de producción institucional deben formalizarse responsable
                    del tratamiento, conservación, eliminación, derechos de los
                    titulares y reglas aplicables a menores de edad.
                  </p>
                </div>
              </div>
            </Panel>
          )}

          {activeTab === "access" && (
            <Panel eyebrow="Seguridad" title="Sesión y acceso">
              <div className="grid gap-px bg-[#002930]/12 lg:grid-cols-[1fr_.8fr]">
                <div className="bg-[#F8F0AF] p-6">
                  <LockKeyhole className="h-6 w-6 text-[#AC4A00]" />
                  <h3 className="mt-6 text-xl font-medium tracking-[-0.025em]">
                    Sesión del navegador
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#002930]/55">
                    La capa API del frontend consulta un token almacenado en el
                    navegador cuando existe. La estrategia de autenticación debe
                    endurecerse para producción según el modelo de amenazas del
                    sistema.
                  </p>

                  <button
                    type="button"
                    onClick={logout}
                    className="mt-7 inline-flex min-h-11 items-center gap-5 bg-[#002930] px-4 text-sm font-medium text-white transition hover:bg-[#00343d]"
                  >
                    Cerrar sesión actual
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>

                <div className="bg-[#F8F0AF] p-6">
                  <p className="text-[9px] uppercase tracking-[0.17em] text-[#AC4A00]">
                    Endurecimiento pendiente
                  </p>
                  <div className="mt-5 space-y-4">
                    {[
                      "Expiración y renovación de sesión",
                      "Revocación de credenciales",
                      "RBAC consistente por endpoint",
                      "Auditoría de accesos sensibles",
                      "Protección service-to-service para IA",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="grid grid-cols-[2rem_1fr] gap-3 border-b border-[#002930]/10 pb-4 last:border-b-0"
                      >
                        <span className="text-[10px] tracking-[0.16em] text-[#AC4A00]">
                          0{index + 1}
                        </span>
                        <p className="text-sm leading-6 text-[#002930]/58">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>
          )}
        </div>
      </div>
    </CorePage>
  );
}

function ConfigCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <article className="bg-[#F8F0AF] p-6">
      <div className="text-[#AC4A00]">{icon}</div>
      <p className="mt-7 text-[9px] uppercase tracking-[0.17em] text-[#002930]/38">
        {label}
      </p>
      <p className="mt-2 text-xl font-medium tracking-[-0.025em]">{value}</p>
      <p className="mt-3 text-sm leading-6 text-[#002930]/50">{description}</p>
    </article>
  );
}

function ThresholdCard({
  label,
  range,
  index,
}: {
  label: string;
  range: string;
  index: string;
}) {
  return (
    <div className="bg-[#F8F0AF] p-5">
      <p className="text-[9px] tracking-[0.16em] text-[#AC4A00]">{index}</p>
      <p className="mt-5 text-lg font-medium">{label}</p>
      <p className="mt-1 text-sm text-[#002930]/45">{range}</p>
    </div>
  );
}

function GovernanceBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="border border-[#002930]/12 p-5">
      <p className="text-sm font-medium">{title}</p>
      <div className="mt-4 space-y-3">
        {items.map((item, index) => (
          <div key={item} className="grid grid-cols-[1.5rem_1fr] gap-3">
            <span className="text-[9px] tracking-[0.15em] text-[#AC4A00]">
              0{index + 1}
            </span>
            <p className="text-xs leading-5 text-[#002930]/52">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PolicyCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-[#F8F0AF] p-5 transition hover:bg-white/35"
    >
      <div className="flex items-center justify-between">
        <span className="text-[#AC4A00]">{icon}</span>
        <ExternalLink className="h-4 w-4 text-[#002930]/28 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <h3 className="mt-8 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#002930]/48">
        {description}
      </p>
    </Link>
  );
}

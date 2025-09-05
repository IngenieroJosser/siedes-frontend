"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  UserCheck,
  HeartHandshake,
  Globe2,
  AlertTriangle,
  ClipboardCheck,
  BarChart3,
  Users,
  BookOpenText,
  Building2,
  TrendingDown,
  Target,
  FileBarChart,
  Trophy,
  BellRing,
  Lightbulb,
  MessageCircle,
  Handshake,
  UsersRound,
  Sprout,
  BarChartHorizontal,
  Network,
  Globe,
  Home,
} from "lucide-react";

export default function BenefitsPage() {
  const [activeTab, setActiveTab] = useState("estudiantes");

  return (
    <div className="min-h-screen bg-[#002930] text-white pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#F8F0AF] blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#AC4A00] blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-[#F8F0AF] ring-1 ring-white/10 mb-6">
            <span className="h-2 w-2 rounded-full bg-[#F8F0AF] animate-pulse"></span>
            Beneficios transformadores
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Impacto positivo para toda la
            <span className="block text-[#F8F0AF] mt-2">comunidad educativa</span>
          </h1>

          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            Descubre cómo SIEDES beneficia a cada actor del proceso educativo con soluciones específicas y culturalmente relevantes.
          </p>
        </div>
      </section>

      {/* Tabs de navegación */}
      <section className="py-8 bg-gradient-to-b from-[#002930] to-[#001c22] sticky top-16 z-10 border-y border-white/5">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: "estudiantes", label: "Estudiantes" },
              { id: "docentes", label: "Docentes" },
              { id: "instituciones", label: "Instituciones" },
              { id: "familias", label: "Familias" },
              { id: "comunidad", label: "Comunidad" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                    ? "bg-[#F8F0AF] text-[#002930] shadow-lg shadow-[#F8F0AF]/20"
                    : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contenido de beneficios */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          {/* Estudiantes */}
          {activeTab === "estudiantes" && (
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Beneficios para <span className="text-[#F8F0AF]">estudiantes</span>
                </h2>

                <div className="space-y-6">
                  <BenefitItem
                    icon={<GraduationCap className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Continuidad educativa garantizada"
                    description="Detección temprana de factores de riesgo que puedan afectar tu permanencia en el sistema educativo."
                  />
                  <BenefitItem
                    icon={<UserCheck className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Seguimiento personalizado"
                    description="Acompañamiento basado en tus necesidades específicas y contexto cultural."
                  />
                  <BenefitItem
                    icon={<HeartHandshake className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Apoyo integral"
                    description="Acceso a recursos académicos, psicoafectivos y socioeconómicos según tus necesidades."
                  />
                  <BenefitItem
                    icon={<Globe2 className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Identidad cultural fortalecida"
                    description="Contenidos y enfoques que valoran y fortalecen tu identidad afrocolombiana."
                  />
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-3 shadow-2xl shadow-black/30">
                  <div className="h-full w-full rounded-xl bg-[#002029] flex items-center justify-center p-8">
                    <div className="text-center">
                      <GraduationCap className="w-16 h-16 text-[#F8F0AF] mx-auto mb-6" />
                      <h3 className="text-xl font-bold text-[#F8F0AF] mb-2">
                        Enfoque centrado en el estudiante
                      </h3>
                      <p className="text-white/80">
                        Nuestro sistema prioriza el bienestar y desarrollo integral de cada estudiante, adaptándose a sus realidades y contextos específicos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Docentes */}
          {activeTab === "docentes" && (
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Beneficios para <span className="text-[#F8F0AF]">docentes</span>
                </h2>

                <div className="space-y-6">
                  <BenefitItem
                    icon={<AlertTriangle className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Alertas tempranas"
                    description="Notificaciones predictivas sobre estudiantes en riesgo de deserción, con hasta 6 meses de anticipación."
                  />
                  <BenefitItem
                    icon={<ClipboardCheck className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Herramientas de intervención"
                    description="Estrategias pedagógicas contextualizadas y culturalmente relevantes para cada caso."
                  />
                  <BenefitItem
                    icon={<BarChart3 className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Seguimiento de impacto"
                    description="Dashboard interactivo para monitorear el progreso de tus estudiantes y el éxito de las intervenciones."
                  />
                  <BenefitItem
                    icon={<Users className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Trabajo colaborativo"
                    description="Conexión con equipos psicosociales, familias y otros docentes para abordajes integrales."
                  />
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-3 shadow-2xl shadow-black/30">
                  <div className="h-full w-full rounded-xl bg-[#002029] flex items-center justify-center p-8">
                    <div className="text-center">
                      <BookOpenText className="w-16 h-16 text-[#F8F0AF] mx-auto mb-6" />
                      <h3 className="text-xl font-bold text-[#F8F0AF] mb-2">
                        Empoderamiento docente
                      </h3>
                      <p className="text-white/80">
                        Transformamos datos en insights accionables que potencian tu labor educativa y te convierten en agente de cambio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instituciones */}
          {activeTab === "instituciones" && (
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Beneficios para <span className="text-[#F8F0AF]">instituciones</span>
                </h2>

                <div className="space-y-6">
                  <BenefitItem
                    icon={<TrendingDown className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Reducción de deserción"
                    description="Disminución de hasta 25% en tasas de abandono escolar mediante intervenciones tempranas."
                  />
                  <BenefitItem
                    icon={<Target className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Optimización de recursos"
                    description="Asignación eficiente de recursos hacia los estudiantes y áreas que más lo necesitan."
                  />
                  <BenefitItem
                    icon={<FileBarChart className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Reportes y analytics"
                    description="Acceso a datos agregados y tendencias para la toma de decisiones institucionales."
                  />
                  <BenefitItem
                    icon={<Trophy className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Cumplimiento de metas"
                    description="Sistema de monitoreo para el cumplimiento de objetivos educativos y metas de permanencia."
                  />
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-3 shadow-2xl shadow-black/30">
                  <div className="h-full w-full rounded-xl bg-[#002029] flex items-center justify-center p-8">
                    <div className="text-center">
                      <Building2 className="w-16 h-16 text-[#F8F0AF] mx-auto mb-6" />
                      <h3 className="text-xl font-bold text-[#F8F0AF] mb-2">
                        Gestión educativa transformadora
                      </h3>
                      <p className="text-white/80">
                        Convierta su institución en un espacio de permanencia y éxito estudiantil con herramientas de vanguardia.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Familias */}
          {activeTab === "familias" && (
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Beneficios para <span className="text-[#F8F0AF]">familias</span>
                </h2>

                <div className="space-y-6">
                  <BenefitItem
                    icon={<BellRing className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Alertas y acompañamiento"
                    description="Notificaciones sobre posibles riesgos y acompañamiento para superar dificultades."
                  />
                  <BenefitItem
                    icon={<Lightbulb className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Herramientas de apoyo"
                    description="Recursos y guías para fortalecer el acompañamiento familiar en el proceso educativo."
                  />
                  <BenefitItem
                    icon={<MessageCircle className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Comunicación directa"
                    description="Conexión constante con docentes e institución para monitorear el progreso educativo."
                  />
                  <BenefitItem
                    icon={<Handshake className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Redes de apoyo"
                    description="Integración a comunidades de familias que enfrentan desafíos similares."
                  />
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-3 shadow-2xl shadow-black/30">
                  <div className="h-full w-full rounded-xl bg-[#002029] flex items-center justify-center p-8">
                    <div className="text-center">
                      <UsersRound className="w-16 h-16 text-[#F8F0AF] mx-auto mb-6" />
                      <h3 className="text-xl font-bold text-[#F8F0AF] mb-2">
                        Familias como pilares educativos
                      </h3>
                      <p className="text-white/80">
                        Fortalecemos su rol fundamental en el proceso educativo con información oportuna y herramientas prácticas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comunidad */}
          {activeTab === "comunidad" && (
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Beneficios para la <span className="text-[#F8F0AF]">comunidad</span>
                </h2>

                <div className="space-y-6">
                  <BenefitItem
                    icon={<Sprout className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Desarrollo comunitario"
                    description="Fortalecimiento del capital social a través de la retención escolar y formación de talento local."
                  />
                  <BenefitItem
                    icon={<BarChartHorizontal className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Datos para la incidencia"
                    description="Evidencia concreta sobre desafíos educativos para gestionar políticas públicas locales."
                  />
                  <BenefitItem
                    icon={<Network className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Redes colaborativas"
                    description="Articulación entre actores comunitarios para abordar la deserción escolar de manera integral."
                  />
                  <BenefitItem
                    icon={<Globe className="w-8 h-8 text-[#F8F0AF]" />}
                    title="Identidad cultural"
                    description="Fortalecimiento de la identidad afrocolombiana a través de procesos educativos pertinentes."
                  />
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-3 shadow-2xl shadow-black/30">
                  <div className="h-full w-full rounded-xl bg-[#002029] flex items-center justify-center p-8">
                    <div className="text-center">
                      <Home className="w-16 h-16 text-[#F8F0AF] mx-auto mb-6" />
                      <h3 className="text-xl font-bold text-[#F8F0AF] mb-2">
                        Comunidades educativas transformadoras
                      </h3>
                      <p className="text-white/80">
                        Tejemos redes comunitarias que convierten la educación en un proyecto colectivo de transformación social.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* Sección de impacto */}
      <section className="py-20 bg-gradient-to-b from-[#001c22] to-[#002930] border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Impacto <span className="text-[#F8F0AF]">comprobado</span>
            </h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Los beneficios de SIEDES se traducen en resultados tangibles para la comunidad educativa de Quibdó.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ImpactMetric value="25%" label="Reducción en deserción escolar" />
            <ImpactMetric value="91%" label="Tasa de asistencia estudiantil" />
            <ImpactMetric value="78%" label="Satisfacción de docentes" />
            <ImpactMetric value="85%" label="Familias participando activamente" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#00343d] to-[#001c22] border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            ¿Listo para experimentar estos <span className="text-[#F8F0AF]">beneficios</span>?
          </h2>
          <p className="mt-4 text-xl text-white/80">
            Únete a las instituciones y comunidades que ya están transformando su realidad educativa con SIEDES.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#D45A10] px-6 py-4 font-medium text-white shadow-lg shadow-[#AC4A00]/30 hover:shadow-xl hover:shadow-[#AC4A00]/40 transition-all duration-300"
            >
              Solicitar demostración
            </Link>

            <Link
              href="/instituciones"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-4 font-medium text-white/90 hover:text-[#F8F0AF] hover:border-[#F8F0AF]/40 transition-all"
            >
              Ver casos de éxito
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Componentes auxiliares */
function BenefitItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
      <div className="flex-shrink-0 text-2xl">{icon}</div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-white/80">{description}</p>
      </div>
    </div>
  );
}

function ImpactMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6 text-center hover:from-[#00343d] hover:to-[#002029] transition-all duration-300 group">
      <div className="text-3xl font-bold text-[#F8F0AF] group-hover:scale-110 transition-transform">{value}</div>
      <div className="mt-2 text-white/80">{label}</div>
    </div>
  );
}
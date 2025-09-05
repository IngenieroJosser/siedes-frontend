export default function BeneficiosPage() {
  return (
    <section id="beneficios" className="relative py-32 bg-[#002930] overflow-hidden">
      {/* Fondos decorativos */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#F8F0AF] blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#AC4A00] blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        {/* Título */}
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Beneficios de <span className="text-[#F8F0AF]">SIEDES</span>
        </h2>
        <p className="mt-4 text-white/70 max-w-2xl mx-auto">
          Una plataforma diseñada para transformar la educación y brindar
          oportunidades de permanencia escolar en comunidades vulnerables.
        </p>

        {/* Grid de beneficios */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Reducción de la deserción",
              desc: "Disminuimos el abandono escolar con estrategias predictivas y preventivas.",
              icon: (
                <svg
                  className="w-10 h-10 text-[#F8F0AF]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
            },
            {
              title: "Apoyo integral",
              desc: "Involucra a docentes, familias y comunidades para un acompañamiento efectivo.",
              icon: (
                <svg
                  className="w-10 h-10 text-[#AC4A00]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5V10l-6.5-5.5L9 10v10h5m-2-6h4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
              ),
            },
            {
              title: "Tecnología predictiva",
              desc: "Identificamos patrones de riesgo con inteligencia artificial.",
              icon: (
                <svg
                  className="w-10 h-10 text-[#F8F0AF]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              ),
            },
            {
              title: "Culturalmente afrocentrado",
              desc: "Un enfoque respetuoso e inclusivo que valora la diversidad y las raíces culturales.",
              icon: (
                <svg
                  className="w-10 h-10 text-[#AC4A00]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.5 5 8 5s-2.832.477-4 1.253M12 6.253C13.168 5.477 14.5 5 16 5s2.832.477 4 1.253"
                  />
                </svg>
              ),
            },
            {
              title: "Empoderamiento comunitario",
              desc: "Fortalece la capacidad de respuesta local frente a la deserción.",
              icon: (
                <svg
                  className="w-10 h-10 text-[#F8F0AF]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c0-3.866 3.134-7 7-7m0 0h-4m4 0V4M5 13l4 4L5 21m0-8v8"
                  />
                </svg>
              ),
            },
            {
              title: "Plataforma accesible",
              desc: "Interfaz amigable, moderna y pensada para todas las personas.",
              icon: (
                <svg
                  className="w-10 h-10 text-[#AC4A00]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.5 5 8 5s-2.832.477-4 1.253M12 6.253C13.168 5.477 14.5 5 16 5s2.832.477 4 1.253"
                  />
                </svg>
              ),
            },
          ].map((benefit, i) => (
            <div
              key={i}
              className="relative group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur hover:bg-white/10 hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#001c22] mb-6 mx-auto">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

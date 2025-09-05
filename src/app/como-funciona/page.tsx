export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="relative py-28 bg-[#001c22] border-t border-white/5">
      {/* Fondos decorativos */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#F8F0AF] blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#AC4A00] blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Nuestro <span className="text-[#F8F0AF]">enfoque integral</span>
          </h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            SIEDES combina inteligencia artificial, análisis predictivo y acompañamiento cultural
            para anticipar y prevenir la deserción escolar.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Monitoreo",
              desc: "Recolectamos datos en tiempo real sobre asistencia, rendimiento académico y factores sociales.",
              icon: (
                <svg className="w-12 h-12 text-[#F8F0AF]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6h6v6m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
            },
            {
              title: "Predicción",
              desc: "Aplicamos algoritmos de IA para identificar patrones de riesgo y anticiparnos a la deserción.",
              icon: (
                <svg className="w-12 h-12 text-[#AC4A00]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 11V7a4 4 0 118 0v4m-2 4h-4m4 0a4 4 0 11-8 0h4z" />
                </svg>
              ),
            },
            {
              title: "Prevención",
              desc: "Diseñamos alertas y estrategias personalizadas con apoyo de familias, docentes y comunidad.",
              icon: (
                <svg className="w-12 h-12 text-[#F8F0AF]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.567-3 3.5S10.343 15 12 15s3-1.567 3-3.5S13.657 8 12 8z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11c0 7-7 11-7 11s-7-4-7-11a7 7 0 1114 0z" />
                </svg>
              ),
            },
          ].map((step, i) => (
            <div
              key={i}
              className="relative group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-all hover:bg-white/10 hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-[#002930] mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-white/70 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
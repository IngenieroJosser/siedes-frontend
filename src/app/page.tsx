"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function HomePage() {;
  useEffect(() => {
  }, []);

  return (
    <div className="min-h-screen bg-[#002930] text-white">
      <section aria-label="Presentación" className="relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-20 w-80 h-80 rounded-full bg-[#F8F0AF] opacity-5"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-[#AC4A00] opacity-5"></div>
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-72 bg-[#F8F0AF] opacity-3 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 md:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-[#F8F0AF] ring-1 ring-white/10 mb-6">
                <span className="h-2 w-2 rounded-full bg-[#F8F0AF] animate-pulse"></span>
                Plataforma predictiva y culturalmente afrocentrada
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Tecnología con propósito social para
                <span className="block text-[#F8F0AF] bg-clip-text bg-gradient-to-r from-[#F8F0AF] to-[#FFD700] mt-2">
                  Quibdó y Colombia
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0">
                SIEDES combina inteligencia artificial, análisis predictivo y enfoque etnoeducativo para identificar y prevenir la deserción escolar en contextos de vulnerabilidad.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/solicitar-ayuda"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#D45A10] px-6 py-4 text-base font-medium text-white shadow-lg shadow-[#AC4A00]/30 hover:shadow-xl hover:shadow-[#AC4A00]/40 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Solicitar ayuda ahora
                </Link>
                <Link
                  href="/tecnologia"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-4 text-base font-medium text-white/90 hover:text-[#F8F0AF] hover:border-[#F8F0AF]/40 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Conocer la tecnología
                </Link>
              </div>

              {/* Métricas mejoradas */}
              <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 max-w-md mx-auto lg:mx-0">
                <Metric label="Estudiantes beneficiados" value="8.000+" />
                <Metric label="Reducción de deserción" value="25%" />
                <Metric label="Instituciones participantes" value="12" />
              </div>
            </div>

            {/* Visual hero mejorado */}
            <div className="relative">
              <div className="relative aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-2 shadow-2xl shadow-black/30">
                <div className="h-full w-full rounded-2xl bg-gradient-to-b from-[#002029] to-[#00151b] relative overflow-hidden">
                  
                  {/* Elemento decorativo de patrón cultural */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#F8F0AF] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#AC4A00] rounded-full translate-y-1/2 -translate-x-1/2"></div>
                  </div>
                  
                  {/* Tarjeta de alerta predictiva */}
                  <div className="absolute left-6 top-6 right-6 rounded-xl border border-white/10 bg-gradient-to-r from-[#002930]/80 to-[#00343d]/80 p-4 backdrop-blur">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/80">Predicción de riesgo</span>
                      <span className="rounded-full bg-[#F8F0AF] px-2 py-1 text-[#002930] text-xs font-semibold">
                        Media (48%)
                      </span>
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF]" style={{ width: "48%" }} />
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-white/60">
                      <span>Bajo</span>
                      <span>Alto</span>
                    </div>
                  </div>

                  {/* Tarjeta de datos contextuales */}
                  <div className="absolute left-6 right-6 bottom-6 rounded-xl border border-white/10 bg-gradient-to-r from-[#002930]/80 to-[#00343d]/80 p-4 backdrop-blur">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/80">Indicadores clave</p>
                        <p className="text-xl font-semibold">3 alertas</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/80">Intervenciones</p>
                        <p className="text-xl font-semibold text-[#F8F0AF]">12 activas</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF]" 
                              style={{ width: `${25 + i * 15}%` }}
                            ></div>
                          </div>
                          <span className="mt-1 text-xs text-white/60">Ind.{i}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Elemento central - visualización de datos */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-40 h-40">
                      <div className="absolute inset-0 rounded-full border-2 border-[#F8F0AF]/20"></div>
                      <div className="absolute inset-4 rounded-full border-2 border-[#AC4A00]/20"></div>
                      <div className="absolute inset-8 rounded-full border-2 border-[#F8F0AF]/10"></div>
                      
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="text-2xl font-bold text-[#F8F0AF]">91%</div>
                        <div className="text-xs text-white/70 mt-1">Asistencia</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Elemento decorativo flotante */}
              <div className="absolute -bottom-5 -right-5 h-24 w-24 rotate-12 rounded-xl opacity-30">
                <div className="h-full w-full bg-[#F8F0AF] rounded-xl" style={{
                  mask: "radial-gradient(circle at center, black 40%, transparent 65%)",
                  WebkitMask: "radial-gradient(circle at center, black 40%, transparent 65%)"
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SECCIÓN CONTEXTO Y VULNERABILIDAD ====== */}
      <section className="relative py-20 bg-gradient-to-b from-[#002930] to-[#001c22] border-t border-white/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#002930] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#002930] to-transparent"></div>
        </div>
        
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Enfocados en contextos de <span className="text-[#F8F0AF]">vulnerabilidad</span>
            </h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Nuestra solución está diseñada específicamente para abordar los desafíos únicos que enfrentan los estudiantes en entornos con limitaciones socioeconómicas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContextCard 
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
              title="Factores socioeconómicos"
              description="Monitoreamos indicadores económicos familiares que pueden afectar la permanencia escolar."
            />
            
            <ContextCard 
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              title="Apoyo comunitario"
              description="Involucramos a las comunidades en el proceso de detección y prevención de la deserción."
            />
            
            <ContextCard 
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              }
              title="Identidad cultural"
              description="Respetamos y fortalecemos la identidad cultural afro en todos nuestros procesos."
            />
          </div>
        </div>
      </section>

      {/* ====== CÓMO FUNCIONA MEJORADO ====== */}
      <section id="como-funciona" className="relative py-20 bg-[#001c22] border-t border-white/5">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#F8F0AF] blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#AC4A00] blur-3xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Nuestro <span className="text-[#F8F0AF]">enfoque integral</span>
            </h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Combinamos tecnología avanzada con conocimiento local para crear una solución efectiva y culturalmente relevante.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Step
              number="01"
              title="Recolección de datos contextualizados"
              desc="Recolectamos información académica, socioeconómica y cultural con enfoque étnico para entender el contexto completo de cada estudiante."
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
            
            <Step
              number="02"
              title="Análisis predictivo con IA"
              desc="Utilizamos algoritmos de machine learning para identificar patrones de riesgo y predecir posibles casos de deserción escolar."
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
            
            <Step
              number="03"
              title="Intervenciones personalizadas"
              desc="Diseñamos estrategias de intervención específicas para cada estudiante, involucrando a familias, docentes y comunidad."
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* ====== SECCIÓN TECNOLOGÍA ====== */}
      <section id="tecnologia" className="relative py-20 bg-gradient-to-b from-[#001c22] to-[#002930] border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Tecnología <span className="text-[#F8F0AF]">avanzada</span> con enfoque humano
            </h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Nuestra plataforma utiliza lo último en inteligencia artificial adaptada al contexto etnoeducativo de Quibdó.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="space-y-6">
                <TechFeature
                  title="Algoritmos predictivos"
                  description="Modelos de machine learning entrenados con datos locales para identificar factores de riesgo específicos de la región."
                />
                <TechFeature
                  title="Dashboard interactivo"
                  description="Interfaz intuitiva que permite a educadores visualizar alertas y realizar seguimiento a las intervenciones."
                />
                <TechFeature
                  title="Privacidad y seguridad"
                  description="Protegemos los datos sensibles con cifrado de última generación y protocolos de seguridad robustos."
                />
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-3 shadow-2xl shadow-black/30">
                <div className="h-full w-full rounded-xl bg-[#002029] relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-20 h-20 bg-[#F8F0AF] rounded-full -translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-[#AC4A00] rounded-full translate-x-1/3 translate-y-1/3"></div>
                  </div>
                  
                  <div className="relative z-10 w-4/5">
                    <div className="bg-gradient-to-r from-[#00343d] to-[#002930] border border-white/10 rounded-xl p-4 mb-4 backdrop-blur">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-white/70">Predicción de riesgo</div>
                        <div className="text-xs px-2 py-1 bg-[#F8F0AF] text-[#002930] rounded-full font-semibold">Media</div>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-full" style={{width: '48%'}}></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-[#00343d] to-[#002930] border border-white/10 rounded-xl p-3 backdrop-blur">
                        <div className="text-xs text-white/70 mb-1">Asistencia</div>
                        <div className="text-lg font-bold text-[#F8F0AF]">91%</div>
                      </div>
                      <div className="bg-gradient-to-br from-[#00343d] to-[#002930] border border-white/10 rounded-xl p-3 backdrop-blur">
                        <div className="text-xs text-white/70 mb-1">Rendimiento</div>
                        <div className="text-lg font-bold text-[#F8F0AF]">78%</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-gradient-to-br from-[#00343d] to-[#002930] border border-white/10 rounded-xl p-3 backdrop-blur">
                      <div className="text-xs text-white/70 mb-2">Factores de riesgo detectados</div>
                      <div className="space-y-2">
                        {['Económico', 'Familiar', 'Académico'].map((factor, i) => (
                          <div key={i} className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-[#AC4A00] mr-2"></div>
                            <div className="text-sm text-white/90">{factor}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SECCIÓN IMPACTO ====== */}
      <section id="impacto" className="relative py-20 bg-[#002930] border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Impacto <span className="text-[#F8F0AF]">medible</span>
            </h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Nuestro objetivo es reducir la deserción escolar en un 25% entre 8.000 estudiantes de 10 a 18 años en Quibdó.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ImpactMetric value="8,000" label="Estudiantes beneficiados" />
            <ImpactMetric value="25%" label="Reducción de deserción" />
            <ImpactMetric value="12" label="Instituciones participantes" />
            <ImpactMetric value="100+" label="Docentes capacitados" />
          </div>

          <div className="mt-16 bg-gradient-to-r from-[#00343d] to-[#002029] rounded-2xl border border-white/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3">Proyección de impacto a 3 años</h3>
                <p className="text-white/80 mb-4">
                  Nuestro modelo predictivo estima un impacto significativo en la reducción de la deserción escolar en la región.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-[#F8F0AF] mr-3"></div>
                    <span>+2.000 estudiantes permaneciendo en el sistema educativo</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-[#F8F0AF] mr-3"></div>
                    <span>+15% en tasas de graduación</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-[#F8F0AF] mr-3"></div>
                    <span>+30% de participación familiar en el proceso educativo</span>
                  </li>
                </ul>
              </div>
              
              <div className="w-full md:w-96">
                <div className="bg-[#001c22] rounded-xl p-4 border border-white/10">
                  <div className="h-40 flex items-end gap-2">
                    {[40, 60, 75].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full rounded-t bg-gradient-to-t from-[#AC4A00] to-[#F8F0AF]"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs text-white/70 mt-2">Año {i + 1}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-white/70">
                    <span>Línea base</span>
                    <span>Proyección</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIOS MEJORADOS ====== */}
      <section id="testimonios" className="relative py-20 bg-gradient-to-b from-[#002930] to-[#001c22] border-t border-white/5">
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full bg-[#F8F0AF] blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-[#AC4A00] blur-3xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Voces de <span className="text-[#F8F0AF]">nuestra comunidad</span>
            </h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Escucha directamente de quienes están experimentando el impacto de SIEDES en Quibdó.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Testimonial
              name="María González"
              role="Madre de familia"
              quote="Gracias a SIEDES, pude recibir apoyo a tiempo para que mi hijo no abandonara la escuela. Las alertas me avisaron cuando empezó a tener dificultades."
            />
            <Testimonial
              name="Prof. Javier Rodríguez"
              role="Docente"
              quote="La plataforma me permite identificar estudiantes en riesgo antes de que sea demasiado tarde. Las intervenciones sugeridas son muy prácticas y contextualizadas."
            />
            <Testimonial
              name="Ana Lucía Moreno"
              role="Estudiante, 16 años"
              quote="Me gusta que la app entiende nuestra realidad. No es solo tecnología, siento que realmente quieren ayudarnos a seguir estudiando."
            />
          </div>
        </div>
      </section>

      {/* ====== CTA MEJORADO ====== */}
      <section id="cta" className="relative py-20 bg-gradient-to-r from-[#00343d] to-[#001c22] border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#F8F0AF] opacity-5"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#AC4A00] opacity-5"></div>
        </div>
        
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            ¿Necesitas <span className="text-[#F8F0AF]">apoyo</span> para prevenir la deserción escolar?
          </h2>
          <p className="mt-4 text-xl text-white/80">
            Únete a nuestra plataforma y accede a herramientas predictivas para mantener a tus estudiantes en el sistema educativo.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#D45A10] px-6 py-4 font-medium text-white shadow-lg shadow-[#AC4A00]/30 hover:shadow-xl hover:shadow-[#AC4A00]/40 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Solicitar ayuda
            </Link>
            
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-4 font-medium text-white/90 hover:text-[#F8F0AF] hover:border-[#F8F0AF]/40 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Más información
            </Link>
          </div>

          <p className="mt-8 text-sm text-white/60">
            Atención personalizada para instituciones educativas, docentes y familias.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ====== COMPONENTES AUXILIARES MEJORADOS ====== */

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors group">
      <dt className="text-white/70 text-sm">{label}</dt>
      <dd className="mt-1 text-2xl font-bold text-white group-hover:text-[#F8F0AF] transition-colors">{value}</dd>
    </div>
  );
}

function Step({ number, title, desc, icon }: { number: string; title: string; desc: string; icon: React.ReactNode }) {
  return (
    <li className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6 hover:from-[#00343d] hover:to-[#002029] transition-all duration-300 group">
      <div className="inline-flex items-center justify-center rounded-lg bg-[#F8F0AF] text-[#002930] px-3 py-2 text-xs font-bold mb-4 group-hover:scale-110 transition-transform">
        {number}
      </div>
      <div className="text-[#F8F0AF] mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-white/80">{desc}</p>
    </li>
  );
}

function ContextCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6 hover:from-[#00343d] hover:to-[#002029] transition-all duration-300 group">
      <div className="text-[#F8F0AF] mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
}

function TechFeature({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 mt-1">
        <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
      </div>
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

function Testimonial({ name, role, quote }: { name: string; role: string; quote: string }) {
  return (
    <figure className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6 hover:from-[#00343d] hover:to-[#002029] transition-all duration-300 group">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] flex items-center justify-center text-white font-bold">
          {name.charAt(0)}
        </div>
        <div className="ml-4">
          <p className="font-medium text-white">{name}</p>
          <p className="text-white/60 text-sm">{role}</p>
        </div>
      </div>
      <blockquote className="text-white/90">&ldquo;{quote}&rdquo;</blockquote>
    </figure>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ComoFuncionaPage() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#002930] text-white pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#F8F0AF]"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#AC4A00]"></div>
        </div>
        
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cómo funciona <span className="text-[#F8F0AF]">SIEDES</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Descubre nuestro proceso integral para identificar, predecir y prevenir la deserción escolar 
              mediante tecnología adaptada al contexto etnoeducativo de Quibdó.
            </p>
          </div>
        </div>
      </section>

      {/* Process Navigation */}
      <section className="py-10 bg-gradient-to-b from-[#002930] to-[#001c22] border-y border-white/5">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <button
                key={step}
                onClick={() => setActiveStep(step)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeStep === step
                    ? "bg-[#F8F0AF] text-[#002930] shadow-lg"
                    : "bg-white/5 text-white/80 hover:bg-white/10"
                }`}
              >
                Paso {step}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Process Explanation */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          {/* Step 1 */}
          {activeStep === 1 && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1 bg-[#F8F0AF] text-[#002930] rounded-full text-sm font-medium mb-4">
                  Paso 1
                </span>
                <h2 className="text-3xl font-bold mb-6">Recolección de datos contextualizados</h2>
                <p className="text-lg text-white/80 mb-6">
                  Recopilamos información académica, socioeconómica y cultural con enfoque étnico 
                  para comprender el contexto completo de cada estudiante.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Datos académicos: calificaciones, asistencia, rendimiento</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Indicadores socioeconómicos: situación familiar, recursos</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Factores culturales: identidad, participación comunitaria</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Variables contextuales: entorno, acceso a servicios</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#F8F0AF]/10 mb-6">
                      <svg className="w-10 h-10 text-[#F8F0AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Recolección de datos</h3>
                    <p className="text-white/70">Integramos múltiples fuentes de información con enfoque etnoeducativo</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2 */}
          {activeStep === 2 && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#F8F0AF]/10 mb-6">
                      <svg className="w-10 h-10 text-[#F8F0AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Análisis predictivo</h3>
                    <p className="text-white/70">Algoritmos entrenados con datos locales para máxima precisión</p>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <span className="inline-block px-4 py-1 bg-[#F8F0AF] text-[#002930] rounded-full text-sm font-medium mb-4">
                  Paso 2
                </span>
                <h2 className="text-3xl font-bold mb-6">Análisis predictivo con IA</h2>
                <p className="text-lg text-white/80 mb-6">
                  Utilizamos algoritmos de machine learning para identificar patrones de riesgo 
                  y predecir posibles casos de deserción escolar con antelación.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Modelos entrenados con datos locales para el contexto de Quibdó</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Identificación de patrones complejos invisibles al análisis manual</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Asignación de niveles de riesgo: bajo, medio y alto</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Actualización continua con nuevos datos para mejorar la precisión</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3 */}
          {activeStep === 3 && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1 bg-[#F8F0AF] text-[#002930] rounded-full text-sm font-medium mb-4">
                  Paso 3
                </span>
                <h2 className="text-3xl font-bold mb-6">Generación de alertas tempranas</h2>
                <p className="text-lg text-white/80 mb-6">
                  El sistema genera alertas automatizadas cuando identifica estudiantes en riesgo,
                  permitiendo una intervención oportuna y preventiva.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Notificaciones automáticas a docentes y coordinadores</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Clasificación por nivel de urgencia y tipo de riesgo</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Dashboard interactivo para visualizar el estado de alertas</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Seguimiento histórico de alertas y su resolución</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#F8F0AF]/10 mb-6">
                      <svg className="w-10 h-10 text-[#F8F0AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Alertas tempranas</h3>
                    <p className="text-white/70">Notificaciones proactivas para intervención oportuna</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4 */}
          {activeStep === 4 && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#F8F0AF]/10 mb-6">
                      <svg className="w-10 h-10 text-[#F8F0AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Intervenciones personalizadas</h3>
                    <p className="text-white/70">Acciones específicas según el contexto de cada estudiante</p>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <span className="inline-block px-4 py-1 bg-[#F8F0AF] text-[#002930] rounded-full text-sm font-medium mb-4">
                  Paso 4
                </span>
                <h2 className="text-3xl font-bold mb-6">Intervenciones personalizadas</h2>
                <p className="text-lg text-white/80 mb-6">
                  Diseñamos estrategias de intervención específicas para cada estudiante, 
                  involucrando a familias, docentes y comunidad con enfoque cultural.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Plan de acción individualizado según el perfil de riesgo</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Involucramiento de actores clave: familia, docentes, comunidad</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Estrategias culturalmente relevantes y contextualizadas</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Seguimiento continuo y ajuste de estrategias según resultados</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 5 */}
          {activeStep === 5 && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1 bg-[#F8F0AF] text-[#002930] rounded-full text-sm font-medium mb-4">
                  Paso 5
                </span>
                <h2 className="text-3xl font-bold mb-6">Monitoreo y mejora continua</h2>
                <p className="text-lg text-white/80 mb-6">
                  Evaluamos constantemente la efectividad de las intervenciones y ajustamos 
                  nuestros modelos predictivos para mejorar continuamente.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Seguimiento de indicadores de efectividad de las intervenciones</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Retroalimentación de usuarios para mejorar el sistema</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Actualización periódica de modelos predictivos con nuevos datos</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#F8F0AF]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F8F0AF]"></div>
                    </div>
                    <p className="ml-3">Reportes de impacto y resultados para stakeholders</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#F8F0AF]/10 mb-6">
                      <svg className="w-10 h-10 text-[#F8F0AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Mejora continua</h3>
                    <p className="text-white/70">Aprendizaje constante para optimizar resultados</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-[#001c22] to-[#002930] border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">
              Características <span className="text-[#F8F0AF]">clave</span> de SIEDES
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Nuestra plataforma incorpora elementos innovadores diseñados específicamente 
              para el contexto etnoeducativo de Quibdó y el Chocó.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#F8F0AF]/10 text-[#F8F0AF] mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Inteligencia artificial contextual</h3>
              <p className="text-white/80">
                Algoritmos entrenados con datos locales que consideran las particularidades 
                culturales y socioeconómicas de la región.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#F8F0AF]/10 text-[#F8F0AF] mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enfoque etnoeducativo</h3>
              <p className="text-white/80">
                Herramientas y procesos diseñados con y para comunidades afrocolombianas, 
                respetando su identidad cultural y saberes ancestrales.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#F8F0AF]/10 text-[#F8F0AF] mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Alertas tempranas</h3>
              <p className="text-white/80">
                Sistema de notificaciones proactivas que identifica estudiantes en riesgo 
                con suficiente antelación para implementar intervenciones efectivas.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#F8F0AF]/10 text-[#F8F0AF] mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Intervenciones comunitarias</h3>
              <p className="text-white/80">
                Estrategias que involucran a familias, líderes comunitarios y organizaciones 
                locales para abordar la deserción desde un enfoque integral.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#F8F0AF]/10 text-[#F8F0AF] mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Dashboard interactivo</h3>
              <p className="text-white/80">
                Visualización clara de datos e indicadores para facilitar la toma de decisiones 
                educativas basadas en evidencia.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#F8F0AF]/10 text-[#F8F0AF] mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Mejora continua</h3>
              <p className="text-white/80">
                Sistema de retroalimentación constante que aprende de cada intervención 
                para aumentar su efectividad con el tiempo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="rounded-3xl bg-gradient-to-r from-[#00343d] to-[#002029] border border-white/10 p-10">
            <h2 className="text-3xl font-bold mb-6">
              ¿Listo para implementar <span className="text-[#F8F0AF]">SIEDES</span> en tu institución?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Contáctanos para conocer cómo podemos adaptar nuestra solución 
              a las necesidades específicas de tu comunidad educativa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#D45A10] px-6 py-4 font-medium text-white shadow-lg shadow-[#AC4A00]/30 hover:shadow-xl hover:shadow-[#AC4A00]/40 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Solicitar demostración
              </Link>
              <Link
                href="/impacto"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-4 font-medium text-white/90 hover:text-[#F8F0AF] hover:border-[#F8F0AF]/40 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Conocer casos de éxito
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
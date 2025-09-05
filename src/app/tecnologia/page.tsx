"use client";

import { useState } from "react";
import Link from "next/link";

export default function TecnologiaPage() {
  const [activeTab, setActiveTab] = useState("ia");

  return (
    <div className="min-h-screen bg-[#002930] text-white pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-20 w-80 h-80 rounded-full bg-[#F8F0AF] opacity-5"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-[#AC4A00] opacity-5"></div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-[#F8F0AF] ring-1 ring-white/10 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#F8F0AF] animate-pulse"></span>
              Tecnología avanzada con propósito social
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Nuestra <span className="text-[#F8F0AF]">tecnología</span> predictiva
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Descubre cómo combinamos inteligencia artificial, análisis de datos y conocimiento local para prevenir la deserción escolar en contextos vulnerables.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs de Navegación */}
      <section className="py-8 border-y border-white/10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab("ia")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === "ia"
                  ? "bg-[#F8F0AF] text-[#002930]"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              Inteligencia Artificial
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === "dashboard"
                  ? "bg-[#F8F0AF] text-[#002930]"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("seguridad")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === "seguridad"
                  ? "bg-[#F8F0AF] text-[#002930]"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              Seguridad
            </button>
            <button
              onClick={() => setActiveTab("metodologia")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === "metodologia"
                  ? "bg-[#F8F0AF] text-[#002930]"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              Metodología
            </button>
          </div>
        </div>
      </section>

      {/* Contenido de Pestañas */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          {activeTab === "ia" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Inteligencia Artificial <span className="text-[#F8F0AF]">Predictiva</span>
                </h2>
                <p className="text-white/80 mb-6">
                  Nuestros algoritmos de machine learning están específicamente entrenados con datos locales para identificar patrones de riesgo de deserción escolar en el contexto afrocolombiano.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Modelos personalizados</h3>
                      <p className="text-white/70">Algoritmos entrenados con datos étnicos y culturales relevantes para la región del Chocó.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Predicción temprana</h3>
                      <p className="text-white/70">Identificamos estudiantes en riesgo hasta 6 meses antes de que abandonen el sistema educativo.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Análisis multivariable</h3>
                      <p className="text-white/70">Evaluamos más de 30 factores diferentes, desde rendimiento académico hasta contexto familiar.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square w-full rounded-3xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-4 shadow-2xl shadow-black/30">
                  <div className="h-full w-full rounded-2xl bg-gradient-to-b from-[#002029] to-[#00151b] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F8F0AF] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#AC4A00] rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                    
                    <div className="relative z-10 w-4/5">
                      <div className="text-center mb-8">
                        <div className="text-5xl font-bold text-[#F8F0AF]">87%</div>
                        <div className="text-white/70 mt-2">Precisión predictiva</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-[#00343d] to-[#002930] border border-white/10 rounded-xl p-3 text-center">
                          <div className="text-2xl font-bold text-white">30+</div>
                          <div className="text-xs text-white/70 mt-1">Variables analizadas</div>
                        </div>
                        <div className="bg-gradient-to-br from-[#00343d] to-[#002930] border border-white/10 rounded-xl p-3 text-center">
                          <div className="text-2xl font-bold text-white">6M</div>
                          <div className="text-xs text-white/70 mt-1">Anticipación</div>
                        </div>
                      </div>
                      
                      <div className="mt-6 bg-gradient-to-br from-[#00343d] to-[#002930] border border-white/10 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-sm text-white/70">Progreso del modelo</div>
                          <div className="text-xs text-[#F8F0AF]">Optimizando</div>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-2 rounded-full bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF]" style={{width: '76%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "dashboard" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Dashboard <span className="text-[#F8F0AF]">Interactivo</span>
                </h2>
                <p className="text-white/80 mb-6">
                  Nuestra interfaz está diseñada para educadores, permitiendo visualizar alertas, realizar seguimientos y planificar intervenciones de manera intuitiva.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Visualización clara</h3>
                      <p className="text-white/70">Gráficos y métricas comprensibles para toma de decisiones informadas.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Alertas en tiempo real</h3>
                      <p className="text-white/70">Notificaciones inmediatas cuando se detectan estudiantes en riesgo.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Seguimiento histórico</h3>
                      <p className="text-white/70">Registro completo de intervenciones y su efectividad a lo largo del tiempo.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2 relative">
                <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-4 shadow-2xl shadow-black/30">
                  <div className="h-full w-full rounded-2xl bg-gradient-to-b from-[#002029] to-[#00151b] relative overflow-hidden flex items-center justify-center p-6">
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F8F0AF] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#AC4A00] rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                    
                    <div className="relative z-10 w-full">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold">Panel de Control</h3>
                        <div className="text-xs px-2 py-1 bg-[#F8F0AF] text-[#002930] rounded-full">3 alertas nuevas</div>
                      </div>
                      
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-8 bg-gradient-to-br from-[#00343d] to-[#002930] border border-white/10 rounded-xl p-4">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-sm font-medium">Riesgo de deserción</h4>
                            <div className="text-xs text-white/60">Semanal</div>
                          </div>
                          <div className="h-32 bg-[#001c22] rounded-lg p-2">
                            <div className="h-full flex items-end gap-2">
                              {[40, 65, 30, 55, 75, 45, 60].map((height, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center">
                                  <div 
                                    className="w-full rounded-t bg-gradient-to-t from-[#AC4A00] to-[#F8F0AF]"
                                    style={{ height: `${height}%` }}
                                  ></div>
                                  <div className="text-[10px] text-white/50 mt-1">D{i+1}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-span-4 bg-gradient-to-br from-[#00343d] to-[#002930] border border-white/10 rounded-xl p-4">
                          <h4 className="text-sm font-medium mb-4">Estudiantes</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>En riesgo</span>
                                <span>12</span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-2 rounded-full bg-[#AC4A00]" style={{width: '30%'}}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Intervenidos</span>
                                <span>8</span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-2 rounded-full bg-[#F8F0AF]" style={{width: '20%'}}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Estables</span>
                                <span>20</span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-2 rounded-full bg-green-500" style={{width: '50%'}}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "seguridad" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Seguridad y <span className="text-[#F8F0AF]">Privacidad</span>
                </h2>
                <p className="text-white/80 mb-6">
                  Implementamos los más altos estándares de seguridad para proteger la información sensible de estudiantes, familias y educadores.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Cifrado de datos</h3>
                      <p className="text-white/70">Toda la información se transmite y almacena con cifrado de grado militar.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Acceso granular</h3>
                      <p className="text-white/70">Control detallado de permisos para garantizar que solo personal autorizado acceda a información sensible.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Cumplimiento normativo</h3>
                      <p className="text-white/70">Cumplimos con las regulaciones locales de protección de datos y privacidad.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square w-full rounded-3xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-4 shadow-2xl shadow-black/30">
                  <div className="h-full w-full rounded-2xl bg-gradient-to-b from-[#002029] to-[#00151b] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F8F0AF] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#AC4A00] rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                    
                    <div className="relative z-10 w-4/5 text-center">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#F8F0AF] to-[#AC4A00] flex items-center justify-center">
                        <svg className="w-10 h-10 text-[#002930]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4">Protección de datos</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-[#00343d] to-[#002930] border border-white/10 rounded-xl p-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-white/80">Datos personales</span>
                            <span className="text-xs px-2 py-1 bg-[#F8F0AF] text-[#002930] rounded-full">Cifrado</span>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-[#00343d] to-[#002930] border border-white/10 rounded-xl p-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-white/80">Comunicaciones</span>
                            <span className="text-xs px-2 py-1 bg-[#F8F0AF] text-[#002930] rounded-full">SSL/TLS</span>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-[#00343d] to-[#002930] border border-white/10 rounded-xl p-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-white/80">Almacenamiento</span>
                            <span className="text-xs px-2 py-1 bg-[#F8F0AF] text-[#002930] rounded-full">Seguro</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "metodologia" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Metodología <span className="text-[#F8F0AF]">Ciclica</span>
                </h2>
                <p className="text-white/80 mb-6">
                  Nuestro enfoque combina tecnología de punta con conocimiento local en un proceso continuo de mejora y adaptación.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF]">
                      <div className="font-bold">1</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Recolección contextualizada</h3>
                      <p className="text-white/70">Recolectamos datos académicos, socioeconómicos y culturales con enfoque étnico.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF]">
                      <div className="font-bold">2</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Análisis predictivo</h3>
                      <p className="text-white/70">Procesamos la información con algoritmos de IA para identificar patrones de riesgo.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF]">
                      <div className="font-bold">3</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Intervención personalizada</h3>
                      <p className="text-white/70">Diseñamos estrategias específicas para cada estudiante en riesgo.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF]">
                      <div className="font-bold">4</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Evaluación y mejora</h3>
                      <p className="text-white/70">Medimos resultados y refinamos continuamente nuestros modelos predictivos.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2 relative">
                <div className="aspect-square w-full rounded-3xl bg-gradient-to-br from-[#00343d] to-[#001e23] border border-white/10 p-4 shadow-2xl shadow-black/30">
                  <div className="h-full w-full rounded-2xl bg-gradient-to-b from-[#002029] to-[#00151b] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F8F0AF] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#AC4A00] rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                    
                    <div className="relative z-10 w-4/5">
                      <div className="relative h-64 w-64 mx-auto">
                        {/* Círculo del proceso */}
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#00343d" strokeWidth="2" />
                          
                          {/* Puntos del proceso */}
                          <g className="text-[#F8F0AF]">
                            <circle cx="50" cy="5" r="4" fill="currentColor" />
                            <circle cx="85" cy="50" r="4" fill="currentColor" />
                            <circle cx="50" cy="95" r="4" fill="currentColor" />
                            <circle cx="15" cy="50" r="4" fill="currentColor" />
                          </g>
                          
                          {/* Flechas del proceso */}
                          <path d="M50 10 A40 40 0 0 1 90 50" stroke="#F8F0AF" strokeWidth="1" fill="none" />
                          <path d="M90 50 A40 40 0 0 1 50 90" stroke="#F8F0AF" strokeWidth="1" fill="none" />
                          <path d="M50 90 A40 40 0 0 1 10 50" stroke="#F8F0AF" strokeWidth="1" fill="none" />
                          <path d="M10 50 A40 40 0 0 1 50 10" stroke="#F8F0AF" strokeWidth="1" fill="none" />
                          
                          {/* Texto del proceso */}
                          <text x="50" y="3" textAnchor="middle" fill="#F8F0AF" fontSize="5">Recolección</text>
                          <text x="93" y="50" textAnchor="start" fill="#F8F0AF" fontSize="5">Análisis</text>
                          <text x="50" y="98" textAnchor="middle" fill="#F8F0AF" fontSize="5">Intervención</text>
                          <text x="7" y="50" textAnchor="end" fill="#F8F0AF" fontSize="5">Evaluación</text>
                        </svg>
                        
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                          <div className="text-[#F8F0AF] font-bold text-lg">Ciclo Continuo</div>
                          <div className="text-white/70 text-xs">de Mejora</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sección de Arquitectura Técnica */}
      <section className="py-16 bg-gradient-to-b from-[#001c22] to-[#002930] border-t border-b border-white/5">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Arquitectura <span className="text-[#F8F0AF]">Técnica</span>
            </h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Diseñamos una infraestructura robusta y escalable para soportar el análisis predictivo en entornos con conectividad limitada.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ArchitectureFeature
              title="Frontend Adaptativo"
              description="Interfaz responsive que funciona en dispositivos móviles y desktop, optimizada para bajos recursos."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
            />
            
            <ArchitectureFeature
              title="Backend Escalable"
              description="API RESTful con microservicios que permiten escalamiento según la demanda y recursos disponibles."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              }
            />
            
            <ArchitectureFeature
              title="Almacenamiento Seguro"
              description="Base de datos relacional con replicación y backups automáticos para garantizar la integridad de los datos."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="rounded-3xl bg-gradient-to-r from-[#00343d] to-[#001c22] border border-white/10 p-10 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Quieres implementar nuestra <span className="text-[#F8F0AF]">tecnología</span>?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Contáctanos para conocer cómo podemos adaptar nuestra plataforma predictiva a las necesidades específicas de tu institución educativa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#D45A10] px-6 py-4 font-medium text-white shadow-lg shadow-[#AC4A00]/30 hover:shadow-xl hover:shadow-[#AC4A00]/40 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contactar ahora
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ArchitectureFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6 text-center group hover:from-[#00343d] hover:to-[#002029] transition-all duration-300">
      <div className="text-[#F8F0AF] mb-4 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-[#F8F0AF]/10 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
}
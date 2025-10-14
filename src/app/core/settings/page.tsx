"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    {
      id: "general", name: "General", icon: (<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>)
    },
    {
      id: "users", name: "Usuarios", icon: (<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>)
    },
    {
      id: "institutions", name: "Instituciones", icon: (<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>)
    },
    {
      id: "benefits", name: "Beneficios", icon: (<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>)
    },
    {
      id: "interventions", name: "Intervenciones", icon: (<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>)
    },
    {
      id: "analytics", name: "Analíticas", icon: (<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>)
    },
    {
      id: "security", name: "Seguridad", icon: (<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>)
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00161a] to-[#00303a] text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="pt-18 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] bg-clip-text text-transparent">
                Configuración del Sistema
              </h1>
              <p className="text-white/70 mt-2">
                Gestiona la configuración y preferencias del sistema SIEDES
              </p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button className="inline-flex items-center px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Recargar Datos
              </button>
              <button className="inline-flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium hover:opacity-90 transition-opacity">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Exportar Configuración
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all ${activeTab === tab.id
                        ? "bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-semibold"
                        : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white"
                      }`}
                  >
                    <span className="text-lg mr-3">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>

              {/* System Status */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-sm font-semibold text-white/60 mb-3">Estado del Sistema</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">Base de datos</span>
                    <span className="flex items-center text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      Conectada
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">API</span>
                    <span className="flex items-center text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      Activa
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">Versión</span>
                    <span className="text-sm text-white/70">v2.1.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-[#00232a]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              {/* General Settings */}
              {activeTab === "general" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Configuración General</h2>
                    <button className="px-4 py-2 bg-[#AC4A00] text-white rounded-xl hover:opacity-90 transition-opacity">
                      Guardar Cambios
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nombre del Sistema</label>
                        <input
                          type="text"
                          defaultValue="SIEDES - Sistema Integral"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email de Contacto</label>
                        <input
                          type="email"
                          defaultValue="contacto@siedes.edu.co"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Región por Defecto</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all">
                          <option>Chocó</option>
                          <option>Antioquia</option>
                          <option>Valle del Cauca</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Límite de Estudiantes</label>
                        <input
                          type="number"
                          defaultValue="1000"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Tema del Sistema</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all">
                          <option>Oscuro</option>
                          <option>Claro</option>
                          <option>Automático</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Idioma</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all">
                          <option>Español</option>
                          <option>Inglés</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold mb-4">Configuración de Alertas</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded bg-white/5 border-white/10 text-[#AC4A00] focus:ring-[#AC4A00]" />
                        <span className="ml-3 text-white/80">Alertas de riesgo alto</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded bg-white/5 border-white/10 text-[#AC4A00] focus:ring-[#AC4A00]" />
                        <span className="ml-3 text-white/80">Notificaciones de intervenciones vencidas</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded bg-white/5 border-white/10 text-[#AC4A00] focus:ring-[#AC4A00]" />
                        <span className="ml-3 text-white/80">Reportes semanales automáticos</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Users Management */}
              {activeTab === "users" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Gestión de Usuarios</h2>
                    <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium rounded-xl hover:opacity-90 transition-opacity">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Nuevo Usuario
                    </button>
                  </div>

                  <div className="bg-[#001a1f] rounded-xl border border-white/10 overflow-hidden">
                    <div className="grid grid-cols-4 p-4 border-b border-white/10 text-sm font-semibold text-white/60">
                      <div>Usuario</div>
                      <div>Rol</div>
                      <div>Estado</div>
                      <div>Acciones</div>
                    </div>

                    {[
                      { name: "María González", email: "maria@institucion.edu.co", role: "COORDINADOR", status: "Activo" },
                      { name: "Carlos Rodríguez", email: "carlos@institucion.edu.co", role: "DOCENTE", status: "Activo" },
                      { name: "Ana López", email: "ana@institucion.edu.co", role: "LIDER_COMUNITARIO", status: "Inactivo" },
                      { name: "Pedro Sánchez", email: "pedro@institucion.edu.co", role: "ADMIN", status: "Activo" },
                    ].map((user, index) => (
                      <div key={index} className="grid grid-cols-4 p-4 border-b border-white/5 last:border-b-0 items-center">
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-white/60">{user.email}</div>
                        </div>
                        <div>
                          <span className={`px-2 py-1 rounded-full text-xs ${user.role === "ADMIN" ? "bg-red-500/20 text-red-300" :
                              user.role === "COORDINADOR" ? "bg-purple-500/20 text-purple-300" :
                                "bg-blue-500/20 text-blue-300"
                            }`}>
                            {user.role}
                          </span>
                        </div>
                        <div>
                          <span className={`px-2 py-1 rounded-full text-xs ${user.status === "Activo" ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"
                            }`}>
                            {user.status}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" title="Editar">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition-colors" title="Eliminar">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Institutions Management */}
              {activeTab === "institutions" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Gestión de Instituciones</h2>
                    <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium rounded-xl hover:opacity-90 transition-opacity">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Nueva Institución
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { name: "Colegio San José", students: 245, city: "Quibdó", type: "SECUNDARIA" },
                      { name: "Institución Educativa Rural", students: 89, city: "Istmina", type: "PRIMARIA" },
                      { name: "Centro Educativo Comunitario", students: 156, city: "Nuquí", type: "MEDIA" },
                    ].map((institution, index) => (
                      <div key={index} className="bg-[#001a1f] rounded-xl border border-white/10 p-4 hover:border-[#F8F0AF]/30 transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-lg">{institution.name}</h3>
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                            {institution.type}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm text-white/60">
                          <div className="flex justify-between">
                            <span>Estudiantes:</span>
                            <span className="text-white">{institution.students}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Ciudad:</span>
                            <span className="text-white">{institution.city}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Código DANE:</span>
                            <span className="text-white">127001</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4 pt-4 border-t border-white/10">
                          <button className="flex-1 py-2 bg-white/5 rounded-lg text-center hover:bg-white/10 transition-colors">
                            Editar
                          </button>
                          <button className="flex-1 py-2 bg-white/5 rounded-lg text-center hover:bg-red-500/20 transition-colors">
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits Management */}
              {activeTab === "benefits" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Gestión de Beneficios</h2>
                    <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-medium rounded-xl hover:opacity-90 transition-opacity">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Nuevo Beneficio
                    </button>
                  </div>

                  <div className="bg-[#001a1f] rounded-xl border border-white/10 overflow-hidden">
                    <div className="grid grid-cols-5 p-4 border-b border-white/10 text-sm font-semibold text-white/60">
                      <div>Beneficio</div>
                      <div>Tipo</div>
                      <div>Estado</div>
                      <div>Asignaciones</div>
                      <div>Acciones</div>
                    </div>

                    {[
                      { name: "Beca Alimentaria", type: "ALIMENTACION", status: "Activo", assignments: 45 },
                      { name: "Transporte Escolar", type: "TRANSPORTE", status: "Activo", assignments: 32 },
                      { name: "Útiles Escolares", type: "UTILES", status: "Inactivo", assignments: 0 },
                      { name: "Apoyo Psicológico", type: "PSICOLOGICA", status: "Activo", assignments: 28 },
                    ].map((benefit, index) => (
                      <div key={index} className="grid grid-cols-5 p-4 border-b border-white/5 last:border-b-0 items-center">
                        <div className="font-medium">{benefit.name}</div>
                        <div>
                          <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300">
                            {benefit.type}
                          </span>
                        </div>
                        <div>
                          <span className={`px-2 py-1 rounded-full text-xs ${benefit.status === "Activo" ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"
                            }`}>
                            {benefit.status}
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="text-lg font-semibold">{benefit.assignments}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" title="Editar">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition-colors" title="Eliminar">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Configuración de Seguridad</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Contraseña Actual</label>
                        <input
                          type="password"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Nueva Contraseña</label>
                        <input
                          type="password"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Confirmar Contraseña</label>
                        <input
                          type="password"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF]/30 focus:border-[#F8F0AF]/30 transition-all"
                        />
                      </div>
                      <button className="w-full py-3 bg-[#AC4A00] text-white rounded-xl hover:opacity-90 transition-opacity font-medium">
                        Cambiar Contraseña
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-[#001a1f] rounded-xl border border-white/10 p-4">
                        <h3 className="font-semibold mb-3">Autenticación de Dos Factores</h3>
                        <p className="text-sm text-white/60 mb-4">
                          Añade una capa extra de seguridad a tu cuenta
                        </p>
                        <button className="w-full py-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                          Activar 2FA
                        </button>
                      </div>

                      <div className="bg-[#001a1f] rounded-xl border border-white/10 p-4">
                        <h3 className="font-semibold mb-3">Sesiones Activas</h3>
                        <p className="text-sm text-white/60 mb-2">
                          Dispositivo actual • Hace 2 horas
                        </p>
                        <button className="w-full py-2 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-colors">
                          Cerrar Otras Sesiones
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Placeholder for other tabs */}
              {(activeTab === "interventions" || activeTab === "analytics") && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Configuración en Desarrollo</h3>
                  <p className="text-white/60">
                    Esta sección de configuración estará disponible en la próxima actualización.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
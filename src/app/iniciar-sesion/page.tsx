"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [particleCount, setParticleCount] = useState(30);
  const router = useRouter();

  // Efecto para partículas responsivas
  useEffect(() => {
    const updateParticleCount = () => {
      if (window.innerWidth < 768) {
        setParticleCount(15);
      } else {
        setParticleCount(30);
      }
    };

    updateParticleCount();
    window.addEventListener('resize', updateParticleCount);
    return () => window.removeEventListener('resize', updateParticleCount);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulación de login exitoso
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push("/core/students");
    } catch (err: any) {
      setError("Credenciales incorrectas. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Generar partículas con diferentes formas y comportamientos
  const generateParticles = () => {
    const particles = [];
    const shapes = ['circle', 'triangle', 'square', 'line'];
    
    for (let i = 0; i < particleCount; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.random() * 12 + 3;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 10;
      const colorType = Math.floor(Math.random() * 3);
      
      let color;
      switch (colorType) {
        case 0: color = '248, 240, 175'; break; // Dorado
        case 1: color = '172, 74, 0'; break;    // Naranja
        default: color = '255, 255, 255';       // Blanco
      }

      particles.push(
        <div
          key={i}
          className={`absolute ${getShapeClass(shape)} animate-float`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            background: `rgba(${color}, ${Math.random() * 0.3 + 0.1})`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      );
    }
    return particles;
  };

  const getShapeClass = (shape: string) => {
    switch (shape) {
      case 'triangle': return 'triangle-shape';
      case 'square': return 'rounded-[4px]';
      case 'line': return 'line-shape';
      default: return 'rounded-full';
    }
  };

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-[#00161a] via-[#00232a] to-[#00303a] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo animado con gradiente dinámico */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00161a] via-[#00232a] to-[#00303a] animate-gradient-slow"></div>
      
      {/* Efecto de partículas avanzado */}
      <div className="absolute inset-0 z-0">
        {generateParticles()}
      </div>

      {/* Olas animadas en el fondo */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F0AF]/10 to-transparent"></div>
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      {/* Contenido principal */}
      <div className="w-full max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Sección izquierda - Mensaje inspirador */}
          <div className="text-center lg:text-left space-y-8 transform hover:scale-[1.02] transition-transform duration-700">
            <div className="relative">
              {/* Logo animado */}
              <div className="relative w-32 h-32 mx-auto lg:mx-0 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-3xl animate-pulse-slow"></div>
                <div className="absolute inset-2 bg-[#00232a] rounded-2xl flex items-center justify-center">
                  <Image 
                    src="/android-chrome-192x192.png" 
                    alt="SIEDES" 
                    width={80} 
                    height={80}
                    className="drop-shadow-lg"
                  />
                </div>
                {/* Anillo giratorio */}
                <div className="absolute -inset-4 border-2 border-[#F8F0AF]/30 rounded-3xl animate-spin-slow"></div>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#F8F0AF] via-[#AC4A00] to-[#F8F0AF] bg-clip-text text-transparent animate-gradient-x mb-4">
                SIEDES
              </h1>
              
              <div className="text-xl lg:text-2xl text-white/80 mb-6 leading-relaxed">
                <span className="bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] bg-clip-text text-transparent font-semibold">
                  Tecnología con propósito social
                </span>
                <br />
                para Quibdó y Colombia
              </div>
            </div>

            {/* Tarjeta de impacto social */}
            <div className="bg-[#00232a]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-[#F8F0AF]/20">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-[#F8F0AF] animate-pulse"></div>
                  <h3 className="text-lg font-semibold text-[#F8F0AF]">Impacto Social Real</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Combinamos <span className="text-[#F8F0AF] font-medium">inteligencia artificial predictiva</span> con 
                  <span className="text-[#F8F0AF] font-medium"> enfoque etnoeducativo</span> para transformar 
                  la educación en contextos vulnerables.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#F8F0AF]">
                      <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-xs text-white/60">Predictiva</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#AC4A00]">
                      <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <div className="text-xs text-white/60">Etnoeducación</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="text-xs text-white/60">Prevención</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas animadas */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: "98%", label: "Precisión", icon: "📊" },
                { number: "500+", label: "Estudiantes", icon: "👥" },
                { number: "15", label: "Instituciones", icon: "🏫" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/5 rounded-2xl p-4 text-center transform hover:scale-110 transition-all duration-300 hover:bg-white/10"
                >
                  <div className="text-lg font-bold text-[#F8F0AF]">{stat.number}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sección derecha - Formulario */}
          <div className="relative">
            {/* Efecto de brillo detrás del formulario */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#AC4A00]/20 to-[#F8F0AF]/20 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
            
            <div className="relative bg-[#00232a]/90 backdrop-blur-2xl rounded-2xl border border-white/20 p-8 transform hover:shadow-2xl hover:shadow-[#F8F0AF]/30 transition-all duration-500">
              
              {/* Header del formulario */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Bienvenido de vuelta
                </h2>
                <p className="text-white/60">
                  Accede a tu cuenta para continuar transformando vidas
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 backdrop-blur-sm animate-shake">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                {/* Campo Email */}
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${activeInput === 'email' ? 'opacity-75' : ''}`}></div>
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className={`h-5 w-5 transition-colors duration-300 ${activeInput === 'email' ? 'text-[#F8F0AF]' : 'text-white/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setActiveInput('email')}
                        onBlur={() => setActiveInput(null)}
                        className="w-full bg-[#001a20] border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
                        placeholder="usuario@ejemplo.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Campo Contraseña */}
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${activeInput === 'password' ? 'opacity-75' : ''}`}></div>
                  <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-2">
                      Contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className={`h-5 w-5 transition-colors duration-300 ${activeInput === 'password' ? 'text-[#F8F0AF]' : 'text-white/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setActiveInput('password')}
                        onBlur={() => setActiveInput(null)}
                        className="w-full bg-[#001a20] border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                {/* Opciones adicionales */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 bg-[#001a20] border border-white/10 rounded focus:ring-[#F8F0AF] text-[#AC4A00] transition-colors duration-300"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70 hover:text-white transition-colors duration-300">
                      Recordar sesión
                    </label>
                  </div>

                  <Link href="/forgot-password" className="text-sm text-[#F8F0AF] hover:text-[#AC4A00] transition-colors duration-300 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {/* Botón de login */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-semibold transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#F8F0AF]/40 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  {/* Efecto de brillo en el botón */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m8-10h-4M6 12H2m15.364-7.364l-2.828 2.828M7.464 17.536l-2.828 2.828m12.728 0l-2.828-2.828M7.464 6.464L4.636 3.636" />
                      </svg>
                      Iniciando sesión...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      Iniciar sesión
                    </div>
                  )}
                </button>
              </form>

              {/* Información adicional */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-center">
                  <p className="text-sm text-white/60">
                    ¿No tienes una cuenta?{" "}
                    <Link href="/crear-cuenta" className="text-[#F8F0AF] hover:text-[#AC4A00] transition-colors duration-300 font-semibold hover:underline">
                      Solicitar acceso
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer informativo */}
        <div className="mt-12 text-center">
          <p className="text-sm text-white/40">
            Sistema Integrado de Alertas Tempranas para la Deserción Escolar
          </p>
          <p className="text-xs text-white/30 mt-2">
            Protegiendo el futuro educativo de Quibdó y Colombia • {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Estilos para animaciones personalizadas */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          33% {
            transform: translateY(-20px) rotate(5deg) scale(1.1);
          }
          66% {
            transform: translateY(10px) rotate(-5deg) scale(0.9);
          }
        }

        @keyframes gradient-slow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes wave {
          0% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(-25%) scaleY(0.8); }
          100% { transform: translateX(-50%) scaleY(1); }
        }

        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient-slow 15s ease infinite;
        }

        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .triangle-shape {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .line-shape {
          transform: rotate(45deg);
          border-radius: 1px;
        }

        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(248, 240, 175, 0.1), transparent);
          animation: wave 10s linear infinite;
        }

        .wave1 {
          animation-duration: 15s;
          opacity: 0.3;
        }

        .wave2 {
          animation-duration: 12s;
          opacity: 0.2;
          animation-delay: -5s;
        }

        .wave3 {
          animation-duration: 18s;
          opacity: 0.1;
          animation-delay: -2s;
        }
      `}</style>
    </div>
  );
}

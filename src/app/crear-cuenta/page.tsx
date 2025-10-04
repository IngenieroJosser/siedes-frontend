"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    // Datos de Usuario (todos los roles)
    nombre: "",
    apellido: "",
    email: "",
    identificacion: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    rol: "ESTUDIANTE" as const,
    
    // Datos de Estudiante (solo para estudiantes)
    edad: "",
    genero: "",
    etnia: "NINGUNA" as const,
    grado: "",
    institucionId: "",
    
    // Datos de Contexto (solo para estudiantes)
    distanciaEscuela: "",
    tiempoDesplazamiento: "",
    trabaja: false,
    horasTrabajo: "",
    ingresosFamiliares: "",
    personasHogar: "",
    apoyoFamiliar: true,
    accesoInternet: false,
    dispositivoElectronico: false,
    participacionComunitaria: false,
    conocimientosAncestrales: false,
    situacionesEspeciales: "",
    necesidadesEspeciales: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [particleCount, setParticleCount] = useState(30);
  const [currentStep, setCurrentStep] = useState(1);
  const [institutions, setInstitutions] = useState<any[]>([]);
  const router = useRouter();

  // Calcular total de pasos según el rol
  const totalSteps = formData.rol === "ESTUDIANTE" ? 3 : 2;

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
    
    // Simular carga de instituciones
    setInstitutions([
      { id: "1", nombre: "Institución Educativa 1", ciudad: "QUIBDO" },
      { id: "2", nombre: "Institución Educativa 2", ciudad: "QUIBDO" },
      { id: "3", nombre: "Institución Educativa 3", ciudad: "OTRA_CIUDAD" }
    ]);

    return () => window.removeEventListener('resize', updateParticleCount);
  }, []);

  // Efecto para ajustar el paso cuando cambia el rol
  useEffect(() => {
    if (formData.rol !== "ESTUDIANTE" && currentStep > 2) {
      setCurrentStep(2);
    }
  }, [formData.rol, currentStep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    try {
      // Simulación de registro exitoso
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push("/iniciar-sesion");
    } catch (err) {
      setError("Error al crear la cuenta. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Generar partículas (mismo código del login)
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
        case 0: color = '248, 240, 175'; break;
        case 1: color = '172, 74, 0'; break;
        default: color = '255, 255, 255';
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

  // Paso 1: Información Personal (para todos los roles)
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative group">
          <div className={`absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${activeInput === 'nombre' ? 'opacity-75' : ''}`}></div>
          <div className="relative">
            <label htmlFor="nombre" className="block text-sm font-medium text-white/70 mb-2">
              Nombre *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className={`h-5 w-5 transition-colors duration-300 ${activeInput === 'nombre' ? 'text-[#F8F0AF]' : 'text-white/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                value={formData.nombre}
                onChange={handleInputChange}
                onFocus={() => setActiveInput('nombre')}
                onBlur={() => setActiveInput(null)}
                className="w-full bg-[#001a20] border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
                placeholder="Tu nombre"
              />
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className={`absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${activeInput === 'apellido' ? 'opacity-75' : ''}`}></div>
          <div className="relative">
            <label htmlFor="apellido" className="block text-sm font-medium text-white/70 mb-2">
              Apellido *
            </label>
            <input
              id="apellido"
              name="apellido"
              type="text"
              required
              value={formData.apellido}
              onChange={handleInputChange}
              onFocus={() => setActiveInput('apellido')}
              onBlur={() => setActiveInput(null)}
              className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
              placeholder="Tu apellido"
            />
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className={`absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${activeInput === 'email' ? 'opacity-75' : ''}`}></div>
        <div className="relative">
          <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
            Correo electrónico *
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
              required
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setActiveInput('email')}
              onBlur={() => setActiveInput(null)}
              className="w-full bg-[#001a20] border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
              placeholder="usuario@ejemplo.com"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative group">
          <div className={`absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${activeInput === 'identificacion' ? 'opacity-75' : ''}`}></div>
          <div className="relative">
            <label htmlFor="identificacion" className="block text-sm font-medium text-white/70 mb-2">
              Identificación
            </label>
            <input
              id="identificacion"
              name="identificacion"
              type="text"
              value={formData.identificacion}
              onChange={handleInputChange}
              onFocus={() => setActiveInput('identificacion')}
              onBlur={() => setActiveInput(null)}
              className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
              placeholder="Número de identificación"
            />
          </div>
        </div>

        <div className="relative group">
          <div className={`absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${activeInput === 'telefono' ? 'opacity-75' : ''}`}></div>
          <div className="relative">
            <label htmlFor="telefono" className="block text-sm font-medium text-white/70 mb-2">
              Teléfono
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              value={formData.telefono}
              onChange={handleInputChange}
              onFocus={() => setActiveInput('telefono')}
              onBlur={() => setActiveInput(null)}
              className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
              placeholder="Número de teléfono"
            />
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className={`absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${activeInput === 'rol' ? 'opacity-75' : ''}`}></div>
        <div className="relative">
          <label htmlFor="rol" className="block text-sm font-medium text-white/70 mb-2">
            Rol en el sistema *
          </label>
          <select
            id="rol"
            name="rol"
            required
            value={formData.rol}
            onChange={handleInputChange}
            onFocus={() => setActiveInput('rol')}
            onBlur={() => setActiveInput(null)}
            className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
          >
            <option value="ESTUDIANTE">Estudiante</option>
            <option value="DOCENTE">Docente</option>
            <option value="PADRE">Padre/Madre de Familia</option>
            <option value="COORDINADOR">Coordinador</option>
            <option value="LIDER_COMUNITARIO">Líder Comunitario</option>
          </select>
        </div>
      </div>

      {/* Información específica por rol */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-[#F8F0AF] mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Información del Rol
        </h3>
        <div className="text-sm text-white/70">
          {formData.rol === "ESTUDIANTE" && (
            <p>Como estudiante, podrás acceder a seguimiento académico, alertas tempranas y beneficios educativos.</p>
          )}
          {formData.rol === "DOCENTE" && (
            <p>Como docente, tendrás acceso al sistema de alertas tempranas y seguimiento de tus estudiantes.</p>
          )}
          {formData.rol === "PADRE" && (
            <p>Como padre/madre, podrás monitorear el progreso académico y recibir alertas sobre tus hijos.</p>
          )}
          {formData.rol === "COORDINADOR" && (
            <p>Como coordinador, tendrás acceso a reportes institucionales y gestión de alertas.</p>
          )}
          {formData.rol === "LIDER_COMUNITARIO" && (
            <p>Como líder comunitario, podrás participar en programas de prevención y apoyo estudiantil.</p>
          )}
        </div>
      </div>
    </div>
  );

  // Paso 2: Información Académica (solo para estudiantes)
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-[#F8F0AF]/10 rounded-2xl p-6 border border-[#F8F0AF]/20">
        <h3 className="text-lg font-semibold text-[#F8F0AF] mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          Información Académica
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${activeInput === 'edad' ? 'opacity-75' : ''}`}></div>
            <div className="relative">
              <label htmlFor="edad" className="block text-sm font-medium text-white/70 mb-2">
                Edad *
              </label>
              <input
                id="edad"
                name="edad"
                type="number"
                required
                value={formData.edad}
                onChange={handleInputChange}
                onFocus={() => setActiveInput('edad')}
                onBlur={() => setActiveInput(null)}
                className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
                placeholder="Tu edad"
                min="5"
                max="30"
              />
            </div>
          </div>

          <div className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${activeInput === 'genero' ? 'opacity-75' : ''}`}></div>
            <div className="relative">
              <label htmlFor="genero" className="block text-sm font-medium text-white/70 mb-2">
                Género *
              </label>
              <select
                id="genero"
                name="genero"
                required
                value={formData.genero}
                onChange={handleInputChange}
                onFocus={() => setActiveInput('genero')}
                onBlur={() => setActiveInput(null)}
                className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
              >
                <option value="">Seleccionar género</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMENINO">Femenino</option>
                <option value="OTRO">Otro</option>
                <option value="PREFIERO_NO_DECIR">Prefiero no decir</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${activeInput === 'etnia' ? 'opacity-75' : ''}`}></div>
            <div className="relative">
              <label htmlFor="etnia" className="block text-sm font-medium text-white/70 mb-2">
                Etnia
              </label>
              <select
                id="etnia"
                name="etnia"
                value={formData.etnia}
                onChange={handleInputChange}
                onFocus={() => setActiveInput('etnia')}
                onBlur={() => setActiveInput(null)}
                className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
              >
                <option value="NINGUNA">No me identifico</option>
                <option value="AFRODESCENDIENTE">Afrodescendiente</option>
                <option value="INDIGENA">Indígena</option>
                <option value="ROM">Pueblo Gitano (ROM)</option>
                <option value="RAIZAL">Raizal</option>
                <option value="PALENQUERO">Palenquero</option>
              </select>
            </div>
          </div>

          <div className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${activeInput === 'grado' ? 'opacity-75' : ''}`}></div>
            <div className="relative">
              <label htmlFor="grado" className="block text-sm font-medium text-white/70 mb-2">
                Grado Académico *
              </label>
              <select
                id="grado"
                name="grado"
                required
                value={formData.grado}
                onChange={handleInputChange}
                onFocus={() => setActiveInput('grado')}
                onBlur={() => setActiveInput(null)}
                className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
              >
                <option value="">Seleccionar grado</option>
                <option value="6">6° Grado</option>
                <option value="7">7° Grado</option>
                <option value="8">8° Grado</option>
                <option value="9">9° Grado</option>
                <option value="10">10° Grado</option>
                <option value="11">11° Grado</option>
                <option value="UNIVERSIDAD">Universidad</option>
              </select>
            </div>
          </div>
        </div>

        <div className="relative group mt-4">
          <div className={`absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${activeInput === 'institucionId' ? 'opacity-75' : ''}`}></div>
          <div className="relative">
            <label htmlFor="institucionId" className="block text-sm font-medium text-white/70 mb-2">
              Institución Educativa *
            </label>
            <select
              id="institucionId"
              name="institucionId"
              required
              value={formData.institucionId}
              onChange={handleInputChange}
              onFocus={() => setActiveInput('institucionId')}
              onBlur={() => setActiveInput(null)}
              className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
            >
              <option value="">Seleccionar institución</option>
              {institutions.map((institution) => (
                <option key={institution.id} value={institution.id}>
                  {institution.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  // Paso 3: Seguridad y Contexto (contexto solo para estudiantes)
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative group">
          <div className={`absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${activeInput === 'password' ? 'opacity-75' : ''}`}></div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-2">
              Contraseña *
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
                required
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setActiveInput('password')}
                onBlur={() => setActiveInput(null)}
                className="w-full bg-[#001a20] border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className={`absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${activeInput === 'confirmPassword' ? 'opacity-75' : ''}`}></div>
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/70 mb-2">
              Confirmar Contraseña *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className={`h-5 w-5 transition-colors duration-300 ${activeInput === 'confirmPassword' ? 'text-[#F8F0AF]' : 'text-white/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onFocus={() => setActiveInput('confirmPassword')}
                onBlur={() => setActiveInput(null)}
                className="w-full bg-[#001a20] border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
                placeholder="Repite tu contraseña"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Información contextual opcional - Solo para estudiantes */}
      {formData.rol === "ESTUDIANTE" && (
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-[#F8F0AF] mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Información Contextual (Opcional)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <label htmlFor="distanciaEscuela" className="block text-sm font-medium text-white/70 mb-2">
                Distancia a la escuela (km)
              </label>
              <input
                id="distanciaEscuela"
                name="distanciaEscuela"
                type="number"
                step="0.1"
                value={formData.distanciaEscuela}
                onChange={handleInputChange}
                className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
                placeholder="Ej: 2.5"
              />
            </div>

            <div className="relative group">
              <label htmlFor="tiempoDesplazamiento" className="block text-sm font-medium text-white/70 mb-2">
                Tiempo de desplazamiento (min)
              </label>
              <input
                id="tiempoDesplazamiento"
                name="tiempoDesplazamiento"
                type="number"
                value={formData.tiempoDesplazamiento}
                onChange={handleInputChange}
                className="w-full bg-[#001a20] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F8F0AF] focus:border-transparent transition-all duration-300"
                placeholder="Ej: 30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <input
                id="trabaja"
                name="trabaja"
                type="checkbox"
                checked={formData.trabaja}
                onChange={handleInputChange}
                className="h-4 w-4 bg-[#001a20] border border-white/10 rounded focus:ring-[#F8F0AF] text-[#AC4A00] transition-colors duration-300"
              />
              <label htmlFor="trabaja" className="text-sm text-white/70">
                ¿Trabaja actualmente?
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="accesoInternet"
                name="accesoInternet"
                type="checkbox"
                checked={formData.accesoInternet}
                onChange={handleInputChange}
                className="h-4 w-4 bg-[#001a20] border border-white/10 rounded focus:ring-[#F8F0AF] text-[#AC4A00] transition-colors duration-300"
              />
              <label htmlFor="accesoInternet" className="text-sm text-white/70">
                ¿Tiene acceso a internet?
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: 
        return formData.rol === "ESTUDIANTE" ? renderStep2() : renderStep3();
      case 3: return renderStep3();
      default: return renderStep1();
    }
  };

  // Obtener descripción del paso actual
  const getStepDescription = () => {
    if (currentStep === 1) return "Datos básicos de identificación";
    if (currentStep === 2) {
      return formData.rol === "ESTUDIANTE" 
        ? "Datos educativos y contexto académico" 
        : "Configuración de seguridad";
    }
    if (currentStep === 3) return "Contraseña y confirmación";
    return "";
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-[#00161a] via-[#00232a] to-[#00303a] text-white flex items-center justify-center p-4 relative overflow-hidden">
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
      <div className="w-full max-w-4xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Sección izquierda - Información */}
          <div className="lg:col-span-2 text-center lg:text-left space-y-6">
            <div className="relative">
              {/* Logo animado */}
              <div className="relative w-24 h-24 mx-auto lg:mx-0 mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] rounded-2xl animate-pulse-slow"></div>
                <div className="absolute inset-2 bg-[#00232a] rounded-xl flex items-center justify-center">
                  <Image 
                    src="/android-chrome-192x192.png" 
                    alt="SIEDES" 
                    width={48} 
                    height={48}
                    className="drop-shadow-lg"
                  />
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#F8F0AF] via-[#AC4A00] to-[#F8F0AF] bg-clip-text text-transparent animate-gradient-x mb-3">
                Únete a SIEDES
              </h1>
              
              <div className="text-lg text-white/80 leading-relaxed">
                Comienza tu camino hacia una educación 
                <span className="text-[#F8F0AF] font-semibold"> protegida y apoyada</span>
              </div>
            </div>

            {/* Progreso */}
            <div className="bg-[#00232a]/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-[#F8F0AF] mb-4">Progreso del Registro</h3>
              
              <div className="space-y-4">
                {[
                  { step: 1, title: "Información Personal", description: "Datos básicos de identificación" },
                  ...(formData.rol === "ESTUDIANTE" 
                    ? [{ step: 2, title: "Información Académica", description: "Datos educativos y contexto" }]
                    : []),
                  { step: totalSteps, title: "Seguridad", description: "Contraseña y confirmación" }
                ].map((item) => (
                  <div 
                    key={item.step}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                      currentStep >= item.step 
                        ? 'bg-[#F8F0AF]/10 border border-[#F8F0AF]/20' 
                        : 'bg-white/5 border border-white/5'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      currentStep >= item.step
                        ? 'bg-[#F8F0AF] text-[#002930]'
                        : 'bg-white/10 text-white/40'
                    }`}>
                      {item.step}
                    </div>
                    <div>
                      <div className={`font-medium transition-colors duration-300 ${
                        currentStep >= item.step ? 'text-[#F8F0AF]' : 'text-white/60'
                      }`}>
                        {item.title}
                      </div>
                      <div className="text-xs text-white/40">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Beneficios según rol */}
            <div className="bg-[#00232a]/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-[#F8F0AF] mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {formData.rol === "ESTUDIANTE" ? "Beneficios para Estudiantes" : 
                 formData.rol === "DOCENTE" ? "Beneficios para Docentes" :
                 formData.rol === "PADRE" ? "Beneficios para Padres" :
                 formData.rol === "COORDINADOR" ? "Beneficios para Coordinadores" :
                 "Beneficios para Líderes Comunitarios"}
              </h3>
              <ul className="space-y-2 text-sm text-white/70">
                {formData.rol === "ESTUDIANTE" && (
                  <>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-[#F8F0AF] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Alertas tempranas de deserción
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-[#F8F0AF] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Apoyo educativo personalizado
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-[#F8F0AF] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Acceso a beneficios estudiantiles
                    </li>
                  </>
                )}
                {formData.rol === "DOCENTE" && (
                  <>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-[#F8F0AF] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Monitoreo de estudiantes en riesgo
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-[#F8F0AF] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Reportes académicos automatizados
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-[#F8F0AF] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Comunicación con coordinadores
                    </li>
                  </>
                )}
                {formData.rol === "PADRE" && (
                  <>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-[#F8F0AF] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Seguimiento del rendimiento académico
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-[#F8F0AF] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Alertas sobre posibles problemas
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-[#F8F0AF] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Comunicación con la institución
                    </li>
                  </>
                )}
                {(formData.rol === "COORDINADOR" || formData.rol === "LIDER_COMUNITARIO") && (
                  <>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-[#F8F0AF] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Dashboard de métricas institucionales
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-[#F8F0AF] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Gestión de alertas y casos
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-[#F8F0AF] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Reportes detallados de progreso
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Sección derecha - Formulario */}
          <div className="lg:col-span-3 relative">
            {/* Efecto de brillo detrás del formulario */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#AC4A00]/20 to-[#F8F0AF]/20 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
            
            <div className="relative bg-[#00232a]/90 backdrop-blur-2xl rounded-2xl border border-white/20 p-8 transform hover:shadow-2xl hover:shadow-[#F8F0AF]/30 transition-all duration-500">
              
              {/* Header del formulario */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Crear Cuenta - {formData.rol}
                </h2>
                <p className="text-white/60">
                  Paso {currentStep} de {totalSteps} - {getStepDescription()}
                </p>
                
                {/* Indicador de progreso */}
                <div className="w-full bg-white/10 rounded-full h-2 mt-4">
                  <div 
                    className="bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 backdrop-blur-sm animate-shake mb-6">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                {renderCurrentStep()}

                {/* Navegación entre pasos */}
                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20 transform hover:scale-105"
                    >
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Anterior
                      </div>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#F8F0AF]/30"
                    >
                      <div className="flex items-center">
                        Siguiente
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-[#002930] font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#F8F0AF]/40 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                      {/* Efecto de brillo en el botón */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m8-10h-4M6 12H2m15.364-7.364l-2.828 2.828M7.464 17.536l-2.828 2.828m12.728 0l-2.828-2.828M7.464 6.464L4.636 3.636" />
                          </svg>
                          Creando cuenta...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Completar Registro
                        </div>
                      )}
                    </button>
                  )}
                </div>
              </form>

              {/* Información adicional */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-center">
                  <p className="text-sm text-white/60">
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/iniciar-sesion" className="text-[#F8F0AF] hover:text-[#AC4A00] transition-colors duration-300 font-semibold hover:underline">
                      Iniciar sesión
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

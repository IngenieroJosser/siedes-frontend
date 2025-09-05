"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#002930] text-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-20 w-80 h-80 rounded-full bg-[#F8F0AF] opacity-5"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-[#AC4A00] opacity-5"></div>
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-72 bg-[#F8F0AF] opacity-3 blur-3xl"></div>
      </div>

      <div className="py-36 relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Elemento decorativo central */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-[#F8F0AF]/20 animate-pulse"></div>
              <div className="absolute inset-8 rounded-full border-4 border-[#AC4A00]/20 animate-ping"></div>
              <div className="absolute inset-16 rounded-full border-4 border-[#F8F0AF]/10"></div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-7xl font-bold text-[#F8F0AF]">404</div>
              </div>
            </div>
          </div>
          <svg 
            className="w-64 h-64 mx-auto opacity-70" 
            viewBox="0 0 200 200" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#F8F0AF"
              d="M44.7,-76.2C58.1,-69.6,69.1,-58.4,77.2,-44.8C85.3,-31.2,90.5,-15.6,89.9,-0.3C89.3,15,82.9,30,73.1,42.2C63.3,54.4,50.2,63.8,35.8,70.6C21.4,77.4,5.7,81.6,-8.9,80.7C-23.5,79.8,-36.9,73.8,-48.3,64.4C-59.7,55,-69,42.2,-74.6,27.8C-80.2,13.4,-82.1,-2.7,-79.3,-17.9C-76.6,-33.1,-69.2,-47.5,-58.3,-55.8C-47.5,-64.1,-33.2,-66.4,-19.1,-72.5C-5,-78.6,8.9,-88.6,22.8,-87.9C36.7,-87.2,50.6,-75.8,61.3,-62.1L50,-50L44.7,-76.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Página no encontrada
        </h1>
        
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
          Lo sentimos, no pudimos encontrar la página que estás buscando. 
          Puede que haya sido movida, eliminada o quizás la dirección contiene un error.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#AC4A00] to-[#D45A10] px-6 py-4 text-base font-medium text-white shadow-lg shadow-[#AC4A00]/30 hover:shadow-xl hover:shadow-[#AC4A00]/40 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Volver al inicio
          </Link>
          
          <Link
            href="#contacto"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-4 text-base font-medium text-white/90 hover:text-[#F8F0AF] hover:border-[#F8F0AF]/40 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contactar soporte
          </Link>
        </div>

        {/* Información adicional */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6 hover:from-[#00343d] hover:to-[#002029] transition-all duration-300">
            <h3 className="font-semibold text-[#F8F0AF] mb-2">Enlaces útiles</h3>
            <ul className="space-y-2 text-white/80">
              <li><Link href="/" className="hover:text-[#F8F0AF] transition-colors">Inicio</Link></li>
              <li><Link href="#tecnologia" className="hover:text-[#F8F0AF] transition-colors">Tecnología</Link></li>
              <li><Link href="#impacto" className="hover:text-[#F8F0AF] transition-colors">Impacto</Link></li>
              <li><Link href="#testimonios" className="hover:text-[#F8F0AF] transition-colors">Testimonios</Link></li>
            </ul>
          </div>
          
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6 hover:from-[#00343d] hover:to-[#002029] transition-all duration-300">
            <h3 className="font-semibold text-[#F8F0AF] mb-2">¿Necesitas ayuda?</h3>
            <p className="text-white/80 mb-4">
              Nuestro equipo está disponible para asistirte con cualquier duda o problema que tengas.
            </p>
            <Link 
              href="#contacto" 
              className="inline-flex items-center text-sm text-[#F8F0AF] hover:underline"
            >
              Contactar al equipo de soporte
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#002930] to-[#001c22] p-6 hover:from-[#00343d] hover:to-[#002029] transition-all duration-300">
            <h3 className="font-semibold text-[#F8F0AF] mb-2">Síguenos</h3>
            <p className="text-white/80 mb-4">
              Mantente conectado con nosotros a través de nuestras redes sociales.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram'].map((network) => (
                <div key={network} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F8F0AF] hover:text-[#002930] transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

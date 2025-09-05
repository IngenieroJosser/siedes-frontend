"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Send,
  Mail,
  User,
  MessageSquare,
  Phone,
  MapPin,
  CheckCircle2,
  Loader2,
  ArrowLeft
} from "lucide-react";

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    // Simulación de envío
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
      setForm({ nombre: "", email: "", mensaje: "" });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#002930] text-white pt-20">
      {/* Elementos decorativos de fondo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-20 w-80 h-80 rounded-full bg-[#F8F0AF] opacity-5"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-[#AC4A00] opacity-5"></div>
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-72 bg-[#F8F0AF] opacity-3 blur-3xl"></div>
      </div>

      {/* Botón de volver */}
      <div className="container mx-auto px-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#F8F0AF] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Encabezado */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-[#F8F0AF] ring-1 ring-white/10 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#F8F0AF] animate-pulse"></span>
              Contacto directo
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hablemos sobre <span className="text-[#F8F0AF]">SIEDES</span>
            </h1>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Estamos aquí para responder tus preguntas, recibir tus comentarios y explorar cómo podemos colaborar para reducir la deserción escolar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#F8F0AF]">Nuestros canales</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF] flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Correo electrónico</h3>
                    <p className="text-white/80">info@siedes.org</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF] flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Teléfono</h3>
                    <p className="text-white/80">+57 (604) 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#F8F0AF]/10 flex items-center justify-center text-[#F8F0AF] flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Ubicación</h3>
                    <p className="text-white/80">Quibdó, Chocó, Colombia</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-[#00343d] to-[#001c22] border border-white/10">
                <h3 className="font-bold text-lg mb-3 text-[#F8F0AF]">Horario de atención</h3>
                <p className="text-white/80 mb-1">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                <p className="text-white/80">Sábados: 9:00 AM - 1:00 PM</p>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="bg-gradient-to-b from-[#00343d] to-[#002029] rounded-2xl border border-white/10 p-6 md:p-8">
              {!enviado ? (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-[#F8F0AF]">Envíanos un mensaje</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nombre */}
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F8F0AF]" />
                      <input
                        type="text"
                        name="nombre"
                        placeholder="Tu nombre completo"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-[#F8F0AF] focus:ring-2 focus:ring-[#F8F0AF]/20 focus:bg-white/10 transition"
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F8F0AF]" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Tu correo electrónico"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-[#F8F0AF] focus:ring-2 focus:ring-[#F8F0AF]/20 focus:bg-white/10 transition"
                      />
                    </div>

                    {/* Mensaje */}
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 text-[#F8F0AF]" />
                      <textarea
                        name="mensaje"
                        placeholder="Escribe tu mensaje aquí..."
                        value={form.mensaje}
                        onChange={handleChange}
                        rows={5}
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-[#F8F0AF] focus:ring-2 focus:ring-[#F8F0AF]/20 focus:bg-white/10 transition resize-none"
                      ></textarea>
                    </div>

                    {/* Botón */}
                    <motion.button
                      whileHover={{ scale: enviando ? 1 : 1.02 }}
                      whileTap={{ scale: enviando ? 1 : 0.98 }}
                      type="submit"
                      disabled={enviando}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#AC4A00] to-[#D45A10] text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-[#AC4A00]/30 hover:shadow-xl hover:shadow-[#AC4A00]/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {enviando ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Enviar mensaje
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center space-y-6 text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-[#F8F0AF]/10 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-[#F8F0AF]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    ¡Mensaje enviado con éxito!
                  </h2>
                  <p className="text-white/80">
                    Gracias por contactarnos. Nuestro equipo se pondrá en comunicación contigo pronto.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEnviado(false)}
                    className="mt-4 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] text-[#002930] font-semibold rounded-xl shadow-md hover:shadow-xl transition-all"
                  >
                    <Send className="w-5 h-5" />
                    Enviar otro mensaje
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

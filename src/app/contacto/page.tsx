"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  MailCheck,
  UserRound,
  FileText,
  CheckCircle2,
  Loader2,
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
    <div className="min-h-screen bg-gradient-to-b from-[#002930] to-black flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-3xl backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10"
      >
        {!enviado ? (
          <>
            <h1 className="text-4xl font-extrabold text-white text-center mb-4">
              Hablemos
            </h1>
            <p className="text-[#F8F0AF] text-center mb-10 max-w-xl mx-auto">
              Tu voz es importante. Cuéntanos tus dudas, ideas o comentarios.
              Juntos construimos un futuro sin deserción escolar.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F8F0AF]" />
                <input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-[#AC4A00] focus:ring-2 focus:ring-[#AC4A00] focus:bg-white/10 transition"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <MailCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F8F0AF]" />
                <input
                  type="email"
                  name="email"
                  placeholder="Tu correo electrónico"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-[#AC4A00] focus:ring-2 focus:ring-[#AC4A00] focus:bg-white/10 transition"
                />
              </div>

              {/* Mensaje */}
              <div className="relative">
                <FileText className="absolute left-3 top-4 text-[#F8F0AF]" />
                <textarea
                  name="mensaje"
                  placeholder="Escribe tu mensaje aquí..."
                  value={form.mensaje}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-[#AC4A00] focus:ring-2 focus:ring-[#AC4A00] focus:bg-white/10 transition"
                ></textarea>
              </div>

              {/* Botón */}
              <motion.button
                whileHover={{ scale: enviando ? 1 : 1.05 }}
                whileTap={{ scale: enviando ? 1 : 0.95 }}
                type="submit"
                disabled={enviando}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-black font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center space-y-6 text-center"
          >
            <CheckCircle2 className="w-16 h-16 text-green-400" />
            <h2 className="text-2xl font-bold text-white">
              ¡Mensaje enviado con éxito!
            </h2>
            <p className="text-gray-300 max-w-md">
              Gracias por contactarnos 🙌. Muy pronto nuestro equipo se pondrá en
              comunicación contigo.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEnviado(false)}
              className="mt-4 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] text-black font-semibold rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <Send className="w-5 h-5" />
              Enviar otro mensaje
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

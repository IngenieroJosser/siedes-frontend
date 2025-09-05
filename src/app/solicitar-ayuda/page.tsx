"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function SolicitarAyudaPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#012a2f] via-[#024950] to-[#000000] flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl grid md:grid-cols-2 gap-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10"
      >
        {/* Lado izquierdo */}
        <div className="flex flex-col justify-center text-center md:text-left space-y-6">
          <HeartHandshake className="w-16 h-16 text-[#F8F0AF] mx-auto md:mx-0" />
          <h1 className="text-4xl font-extrabold text-white leading-tight">
            Solicita Ayuda 
          </h1>
          <p className="text-[#F8F0AF] text-lg">
            Cuéntanos tu situación. Nuestro equipo está aquí para apoyarte de la
            mejor manera posible.  
            <code className="block mt-2 text-gray-300 text-sm">
              También puedes escribirnos directamente:
              <br />  ayuda@tuplataforma.com
              <br />  WhatsApp: +57 300 123 4567
            </code>
          </p>
        </div>

        {/* Lado derecho */}
        <div>
          {enviado ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ rotate: -20 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <Sparkles className="w-20 h-20 text-yellow-300 drop-shadow-glow" />
              </motion.div>
              <h2 className="text-2xl font-bold text-green-400">
                ¡Tu solicitud fue enviada con éxito!
              </h2>
              <p className="text-gray-300">
                Pronto nos pondremos en contacto contigo. 🌿  
                Gracias por confiar en nosotros.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEnviado(false)}
                className="px-6 py-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-black font-semibold rounded-lg shadow-lg"
              >
                Enviar otra solicitud
              </motion.button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F8F0AF] group-hover:scale-110 transition" />
                <input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre completo"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#AC4A00] focus:ring-2 focus:ring-[#AC4A00] transition"
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F8F0AF] group-hover:scale-110 transition" />
                <input
                  type="email"
                  name="email"
                  placeholder="Tu correo electrónico"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#AC4A00] focus:ring-2 focus:ring-[#AC4A00] transition"
                />
              </div>

              {/* Teléfono */}
              <div className="relative group">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F8F0AF] group-hover:scale-110 transition" />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Tu número de teléfono (opcional)"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#AC4A00] focus:ring-2 focus:ring-[#AC4A00] transition"
                />
              </div>

              {/* Mensaje */}
              <div className="relative group">
                <MessageSquare className="absolute left-3 top-4 text-[#F8F0AF] group-hover:scale-110 transition" />
                <textarea
                  name="mensaje"
                  placeholder="Cuéntanos tu situación..."
                  value={form.mensaje}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#AC4A00] focus:ring-2 focus:ring-[#AC4A00] transition"
                ></textarea>
              </div>

              {/* Botón */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px #F8F0AF" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#AC4A00] to-[#F8F0AF] text-black font-bold py-3 px-4 rounded-lg shadow-lg transition-all"
              >
                <Send className="w-5 h-5" />
                Enviar solicitud
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

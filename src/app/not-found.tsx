"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#002930] text-white text-center p-6">
      {/* Ícono animado */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="bg-[#F8F0AF] rounded-full p-8 shadow-lg"
      >
        <Search className="text-[#002930]" size={80} />
      </motion.div>

      {/* Texto principal */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-6xl font-extrabold text-[#F8F0AF]"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-lg max-w-xl text-gray-200"
      >
        Página no encontrada.  
        Pero seguimos buscando soluciones para <strong>prevenir la deserción escolar</strong> en entornos educativos.
      </motion.p>

      {/* Botón */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-8"
      >
        <Link
          href="/"
          className="px-6 py-3 rounded-xl font-semibold text-white bg-[#AC4A00] hover:bg-[#F8F0AF] hover:text-[#002930] transition-all duration-300 shadow-lg"
        >
          Volver a la página principal
        </Link>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 text-sm text-gray-400"
      >
        SIEDES © 2025 – Sistema Inteligente para la Detección y Prevención de la Deserción Escolar
      </motion.footer>
    </div>
  );
}

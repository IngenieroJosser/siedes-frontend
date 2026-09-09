"use client";

import { useState } from "react";
import {
  ArrowRight,
  Mail,
  MessageSquareText,
  UserRound,
} from "lucide-react";

const inputClass =
  "min-h-12 w-full border border-[#002930]/18 bg-transparent px-4 py-3 text-sm text-[#002930] outline-none transition placeholder:text-[#002930]/30 focus:border-[#002930]";

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Contacto SIEDES · ${form.nombre.trim() || "Consulta general"}`
    );

    const body = encodeURIComponent(
      [
        `Nombre: ${form.nombre.trim()}`,
        `Correo de contacto: ${form.email.trim()}`,
        "",
        "Mensaje:",
        form.mensaje.trim(),
      ].join("\n")
    );

    window.location.href =
      `mailto:siedes.uib@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5">
        <div>
          <label
            htmlFor="nombre"
            className="text-[10px] uppercase tracking-[0.16em] text-[#002930]/48"
          >
            Nombre completo
          </label>
          <div className="relative mt-2">
            <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#002930]/32" />
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              required
              value={form.nombre}
              onChange={handleChange}
              className={inputClass + " pl-11"}
              placeholder="Tu nombre"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-[10px] uppercase tracking-[0.16em] text-[#002930]/48"
          >
            Correo electrónico
          </label>
          <div className="relative mt-2">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#002930]/32" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              className={inputClass + " pl-11"}
              placeholder="nombre@correo.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="mensaje"
            className="text-[10px] uppercase tracking-[0.16em] text-[#002930]/48"
          >
            Mensaje
          </label>
          <div className="relative mt-2">
            <MessageSquareText className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-[#002930]/32" />
            <textarea
              id="mensaje"
              name="mensaje"
              required
              rows={7}
              value={form.mensaje}
              onChange={handleChange}
              className={inputClass + " resize-y pl-11"}
              placeholder="Cuéntanos qué necesitas saber sobre SIEDES."
            />
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-[#002930]/14 pt-5">
        <button
          type="submit"
          className="group inline-flex min-h-12 w-full items-center justify-between gap-8 bg-[#AC4A00] px-5 text-sm font-medium text-white transition hover:bg-[#D45A10]"
        >
          Preparar correo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="mt-3 text-xs leading-5 text-[#002930]/42">
          Este botón abre tu aplicación de correo con el mensaje preparado.
          SIEDES todavía no expone un endpoint de contacto general desde el
          frontend.
        </p>
      </div>
    </form>
  );
}

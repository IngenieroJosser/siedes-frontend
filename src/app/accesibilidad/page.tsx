import type { Metadata } from "next";
import LegalShell, { type LegalSection } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Accesibilidad | SIEDES",
  description:
    "Principios y estado de accesibilidad del proyecto SIEDES.",
};

const sections: LegalSection[] = [
  {
    number: "01",
    id: "objetivo",
    title: "Objetivo de accesibilidad",
    content: (
      <>
        <p>
          SIEDES busca que sus interfaces puedan ser utilizadas por estudiantes,
          familias, docentes y personal institucional con diferentes capacidades,
          dispositivos y condiciones de conectividad.
        </p>
        <p>
          Este objetivo forma parte del diseño del producto, pero no se presenta como
          una certificación formal de conformidad con WCAG ni con otro estándar mientras
          no se complete una auditoría específica de accesibilidad.
        </p>
      </>
    ),
  },
  {
    number: "02",
    id: "estructura",
    title: "Estructura y navegación",
    content: (
      <>
        <p>
          Las superficies rediseñadas utilizan jerarquías de encabezados, enlaces
          identificables, navegación principal y secciones con estructura semántica para
          facilitar el recorrido de la interfaz.
        </p>
        <p>
          La navegación debe poder comprenderse sin depender únicamente de efectos
          visuales, animaciones o posición en pantalla.
        </p>
      </>
    ),
  },
  {
    number: "03",
    id: "teclado",
    title: "Uso con teclado",
    content: (
      <>
        <p>
          Los controles interactivos deben permanecer alcanzables mediante teclado,
          conservar un orden lógico de foco y ofrecer una indicación visible cuando
          reciben foco.
        </p>
        <p>
          Componentes como menús, formularios, botones y enlaces deben evitar
          comportamientos que obliguen a utilizar exclusivamente un mouse o una pantalla
          táctil.
        </p>
      </>
    ),
  },
  {
    number: "04",
    id: "formularios",
    title: "Formularios y mensajes de error",
    content: (
      <>
        <p>
          Los formularios rediseñados incorporan etiquetas asociadas a sus controles,
          campos obligatorios identificables y mensajes de error visibles.
        </p>
        <p>
          El objetivo es que el usuario pueda comprender qué información se solicita,
          qué ocurrió cuando existe un error y qué acción debe realizar para continuar.
        </p>
      </>
    ),
  },
  {
    number: "05",
    id: "visual",
    title: "Contraste, legibilidad y color",
    content: (
      <>
        <p>
          El sistema visual actual utiliza fondos profundos, crema de alto contraste y
          acentos naranjas para separar niveles de información y acciones.
        </p>
        <p>
          El color no debería ser el único mecanismo para transmitir estado, prioridad o
          error. Cuando corresponda, debe combinarse con texto, iconografía, etiquetas o
          estructura adicional.
        </p>
      </>
    ),
  },
  {
    number: "06",
    id: "responsive",
    title: "Dispositivos y escalado",
    content: (
      <>
        <p>
          Las páginas rediseñadas se adaptan a tamaños de pantalla móviles, tabletas y
          escritorio mediante layouts responsive.
        </p>
        <p>
          La revisión de accesibilidad debe incluir zoom, tamaños de texto ampliados,
          orientación de pantalla y dispositivos con espacio reducido para verificar que
          el contenido siga siendo operable y legible.
        </p>
      </>
    ),
  },
  {
    number: "07",
    id: "movimiento",
    title: "Movimiento y efectos visuales",
    content: (
      <>
        <p>
          El rediseño reduce animaciones decorativas, partículas y efectos intensos que
          existían en varias pantallas anteriores.
        </p>
        <p>
          Aun así, antes de declarar cumplimiento de accesibilidad debe revisarse de
          forma global el soporte a preferencias como reducción de movimiento y
          cualquier animación restante en rutas heredadas.
        </p>
      </>
    ),
  },
  {
    number: "08",
    id: "pendientes",
    title: "Auditoría y mejoras pendientes",
    content: (
      <>
        <p>
          La accesibilidad debe verificarse sobre toda la plataforma, incluyendo rutas
          internas que todavía conservan interfaces anteriores al rediseño.
        </p>
        <p>Una evaluación completa debería incluir, como mínimo:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Navegación completa solo con teclado.</li>
          <li>Pruebas con lector de pantalla.</li>
          <li>Contraste de texto y controles interactivos.</li>
          <li>Estados de foco y orden de tabulación.</li>
          <li>Etiquetas, nombres accesibles y mensajes de error.</li>
          <li>Zoom y reflow en pantallas pequeñas.</li>
          <li>Preferencias de reducción de movimiento.</li>
        </ul>
      </>
    ),
  },
  {
    number: "09",
    id: "reportar",
    title: "Reportar una barrera",
    content: (
      <>
        <p>
          Si una persona encuentra una barrera de navegación, lectura, contraste,
          formulario o interacción, puede comunicarla al equipo indicando la página, el
          dispositivo utilizado y una descripción concreta del problema.
        </p>
        <p>
          El canal actualmente publicado por el proyecto para este tipo de contacto es
          <a
            href="mailto:siedes.uib@gmail.com"
            className="ml-1 font-medium text-[#AC4A00] underline decoration-[#AC4A00]/30 underline-offset-4"
          >
            siedes.uib@gmail.com
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function AccesibilidadPage() {
  return (
    <LegalShell
      eyebrow="Accesibilidad"
      title={
        <>
          Diseñar para que
          <span className="block text-[#F8F0AF]">más personas puedan participar.</span>
        </>
      }
      description="La accesibilidad en SIEDES se aborda como un requisito de producto: la información educativa pierde valor si las personas que deben usarla encuentran barreras para acceder, comprender o interactuar con ella."
      statusLabel="Compromiso de mejora"
      notice={
        <p>
          El proyecto todavía no cuenta con una auditoría formal que permita declarar
          conformidad integral con WCAG. Esta página diferencia entre prácticas ya
          aplicadas en las superficies rediseñadas y verificaciones que siguen
          pendientes.
        </p>
      }
      sections={sections}
    />
  );
}

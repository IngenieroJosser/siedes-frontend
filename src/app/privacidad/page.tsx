import type { Metadata } from "next";
import LegalShell, { type LegalSection } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Privacidad | SIEDES",
  description:
    "Información sobre el tratamiento de datos y los principios de privacidad aplicables al proyecto SIEDES.",
};

const sections: LegalSection[] = [
  {
    number: "01",
    id: "alcance",
    title: "Alcance de esta información",
    content: (
      <>
        <p>
          Esta página describe, de forma transparente, qué información maneja actualmente
          el frontend de SIEDES y con qué propósito funcional se utiliza dentro del
          proyecto.
        </p>
        <p>
          SIEDES trabaja con información educativa y contextual que puede ser sensible.
          Por esa razón, la versión de producción deberá formalizar responsable del
          tratamiento, bases jurídicas aplicables, plazos de conservación, canales de
          ejercicio de derechos y demás obligaciones institucionales que correspondan.
        </p>
      </>
    ),
  },
  {
    number: "02",
    id: "datos",
    title: "Información que puede tratar SIEDES",
    content: (
      <>
        <p>Los flujos actuales del proyecto contemplan categorías como:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Datos de identificación y contacto: nombre, apellido, correo, teléfono e identificación.</li>
          <li>Rol dentro del sistema: estudiante, docente, familiar, coordinador o líder comunitario.</li>
          <li>Información académica: edad, género, grado e institución educativa.</li>
          <li>Información contextual opcional: distancia a la institución, tiempo de desplazamiento, trabajo, personas del hogar, apoyo familiar, acceso a internet, dispositivo electrónico y participación comunitaria.</li>
          <li>Información de pertenencia étnica y conocimientos o prácticas ancestrales cuando el usuario decide suministrarla.</li>
          <li>Situaciones o necesidades especiales que puedan ser relevantes para comprender el contexto educativo.</li>
          <li>Información asociada a solicitudes de apoyo: estudiante, motivo, descripción y datos de contacto del solicitante.</li>
        </ul>
      </>
    ),
  },
  {
    number: "03",
    id: "finalidades",
    title: "Finalidades funcionales",
    content: (
      <>
        <p>La información se utiliza dentro de los flujos actuales para:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Crear y administrar cuentas de usuario según su rol.</li>
          <li>Relacionar estudiantes con su institución educativa.</li>
          <li>Registrar información académica y contextual relevante para el análisis.</li>
          <li>Generar, revisar y dar seguimiento a alertas o intervenciones dentro del sistema.</li>
          <li>Registrar solicitudes de apoyo y asociarlas con un estudiante existente.</li>
          <li>Permitir autenticación y acceso a funciones restringidas de la plataforma.</li>
        </ul>
        <p>
          Cualquier uso adicional deberá definirse y comunicarse antes de incorporarse al
          tratamiento real de datos.
        </p>
      </>
    ),
  },
  {
    number: "04",
    id: "ia",
    title: "Datos, IA y riesgo escolar",
    content: (
      <>
        <p>
          El análisis predictivo de SIEDES está concebido como una herramienta de apoyo.
          Una señal o estimación de riesgo no debe interpretarse como una sentencia sobre
          el estudiante ni como una decisión automática.
        </p>
        <p>
          Los resultados deben ser revisados por personas responsables, contrastados con
          el contexto disponible y utilizados dentro de procesos de acompañamiento
          pedagógico e institucional.
        </p>
      </>
    ),
  },
  {
    number: "05",
    id: "minimizacion",
    title: "Minimización y datos contextuales",
    content: (
      <>
        <p>
          SIEDES debería solicitar únicamente los datos necesarios para cumplir el
          propósito educativo del flujo correspondiente.
        </p>
        <p>
          Los campos contextuales del registro de estudiantes se presentan como
          opcionales cuando su ausencia no impide el funcionamiento esencial. La
          información étnica, familiar, económica o asociada a necesidades especiales
          requiere especial cuidado y no debe utilizarse de forma aislada para inferir
          riesgo o tomar decisiones adversas.
        </p>
      </>
    ),
  },
  {
    number: "06",
    id: "seguridad",
    title: "Seguridad y acceso",
    content: (
      <>
        <p>
          La capa de API del frontend contempla autenticación mediante token cuando
          existe una sesión válida. La versión de producción debe reforzar controles
          como expiración de sesión, revocación, protección frente a acceso no
          autorizado y revisión del mecanismo de almacenamiento de credenciales o
          tokens.
        </p>
        <p>
          El acceso a información educativa debe mantenerse restringido a los roles y
          personas que realmente necesiten consultarla para cumplir su función.
        </p>
      </>
    ),
  },
  {
    number: "07",
    id: "pendientes",
    title: "Aspectos que deben formalizarse antes de producción",
    content: (
      <>
        <p>
          El repositorio actual no permite afirmar todavía elementos como plazos
          definitivos de conservación, mecanismos de eliminación, transferencias a
          terceros, responsable jurídico del tratamiento o procedimiento formal para
          ejercer derechos sobre los datos.
        </p>
        <p>
          Esos elementos deben documentarse antes de un despliegue institucional real y
          reflejar exactamente la arquitectura, los proveedores y las políticas
          aprobadas por la entidad responsable.
        </p>
      </>
    ),
  },
];

export default function PrivacidadPage() {
  return (
    <LegalShell
      eyebrow="Privacidad"
      title={
        <>
          Datos educativos con
          <span className="block text-[#F8F0AF]">responsabilidad y contexto.</span>
        </>
      }
      description="La privacidad en SIEDES no es un detalle administrativo: forma parte del diseño de una plataforma que trabaja con información de estudiantes, familias e instituciones."
      statusLabel="Información del proyecto"
      notice={
        <p>
          Esta página no sustituye una política de tratamiento de datos formal aprobada
          por la institución responsable. Antes de producción deben definirse y revisar
          los elementos jurídicos y operativos que todavía no están documentados en el
          proyecto.
        </p>
      }
      sections={sections}
    />
  );
}

import type { Metadata } from "next";
import LegalShell, { type LegalSection } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Términos | SIEDES",
  description:
    "Condiciones generales de uso y límites funcionales del proyecto SIEDES.",
};

const sections: LegalSection[] = [
  {
    number: "01",
    id: "naturaleza",
    title: "Naturaleza del servicio",
    content: (
      <>
        <p>
          SIEDES es una plataforma orientada a apoyar la identificación y prevención de
          la deserción escolar mediante información educativa, análisis predictivo y
          seguimiento de casos.
        </p>
        <p>
          El sistema se encuentra en contexto de proyecto y piloto. Las funciones,
          alcances y responsabilidades institucionales deben ajustarse a la versión
          efectivamente desplegada y a los acuerdos que se formalicen antes de una
          operación productiva.
        </p>
      </>
    ),
  },
  {
    number: "02",
    id: "cuentas",
    title: "Cuentas y roles de acceso",
    content: (
      <>
        <p>
          El acceso a funciones internas de SIEDES depende del rol asignado al usuario.
          El proyecto contempla perfiles como estudiante, docente, padre o madre,
          coordinador y líder comunitario.
        </p>
        <p>
          Cada usuario debe utilizar credenciales propias, mantenerlas bajo su control y
          evitar compartir accesos con personas no autorizadas.
        </p>
      </>
    ),
  },
  {
    number: "03",
    id: "uso",
    title: "Uso adecuado de la plataforma",
    content: (
      <>
        <p>El uso de SIEDES debe orientarse al propósito educativo del sistema. No debe utilizarse para:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Consultar información de estudiantes sin una necesidad legítima dentro del rol asignado.</li>
          <li>Alterar, ocultar o registrar deliberadamente información falsa.</li>
          <li>Usar alertas o puntuaciones para estigmatizar, discriminar o sancionar automáticamente a un estudiante.</li>
          <li>Intentar eludir controles de autenticación o acceder a funciones no autorizadas.</li>
          <li>Extraer, redistribuir o publicar información educativa sensible fuera de los canales autorizados.</li>
        </ul>
      </>
    ),
  },
  {
    number: "04",
    id: "ia",
    title: "Límites del análisis predictivo",
    content: (
      <>
        <p>
          Las salidas analíticas de SIEDES deben entenderse como señales para revisión.
          No constituyen diagnóstico, sentencia académica ni decisión automática.
        </p>
        <p>
          El criterio de docentes, orientación, coordinación y demás responsables sigue
          siendo necesario para interpretar el contexto y definir cualquier acción de
          acompañamiento.
        </p>
      </>
    ),
  },
  {
    number: "05",
    id: "informacion",
    title: "Calidad de la información",
    content: (
      <>
        <p>
          La utilidad de la plataforma depende de la calidad, actualidad y pertinencia de
          los datos registrados. Los usuarios con responsabilidad de carga o seguimiento
          deben procurar que la información sea correcta y suficiente para el propósito
          correspondiente.
        </p>
        <p>
          Una alerta generada a partir de datos incompletos o desactualizados debe ser
          revisada antes de utilizarse para orientar decisiones.
        </p>
      </>
    ),
  },
  {
    number: "06",
    id: "disponibilidad",
    title: "Disponibilidad y cambios",
    content: (
      <>
        <p>
          Durante la fase de proyecto pueden existir cambios de interfaz, funcionalidades,
          rutas, modelos o integraciones. No se garantiza disponibilidad ininterrumpida
          mientras el sistema se encuentre en desarrollo o piloto.
        </p>
        <p>
          Las versiones productivas deberán definir niveles de servicio, soporte,
          mantenimiento y gestión de incidentes de acuerdo con la institución
          responsable.
        </p>
      </>
    ),
  },
  {
    number: "07",
    id: "propiedad",
    title: "Contenido y propiedad intelectual",
    content: (
      <>
        <p>
          El código, la identidad visual, los contenidos, modelos, documentos y demás
          componentes del proyecto deben utilizarse de acuerdo con los derechos,
          licencias y autorizaciones que correspondan a sus respectivos titulares.
        </p>
        <p>
          Esta página no pretende definir por sí sola la titularidad jurídica de cada
          activo del proyecto.
        </p>
      </>
    ),
  },
  {
    number: "08",
    id: "formalizacion",
    title: "Formalización pendiente",
    content: (
      <>
        <p>
          Antes de una operación institucional real deberán definirse de forma expresa
          aspectos como entidad responsable, jurisdicción aplicable, tratamiento de
          menores de edad, reglas de consentimiento o representación, responsabilidades
          de cada actor, soporte y mecanismos de reclamación.
        </p>
        <p>
          Estos términos deben revisarse jurídicamente antes de utilizarse como acuerdo
          contractual definitivo.
        </p>
      </>
    ),
  },
];

export default function TerminosPage() {
  return (
    <LegalShell
      eyebrow="Términos"
      title={
        <>
          Tecnología de apoyo.
          <span className="block text-[#F8F0AF]">Responsabilidad humana.</span>
        </>
      }
      description="Estas condiciones explican cómo debe utilizarse SIEDES durante su evolución como plataforma educativa y qué límites deben respetarse al trabajar con información y señales predictivas."
      statusLabel="Condiciones del proyecto"
      notice={
        <p>
          Este contenido funciona como base informativa del proyecto. No debe
          considerarse todavía un contrato definitivo ni reemplazar la revisión jurídica
          requerida para un despliegue institucional.
        </p>
      }
      sections={sections}
    />
  );
}

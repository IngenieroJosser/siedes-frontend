export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
  details?: Record<string, unknown> | string | unknown[];
}

export type Etnia =
  | "NINGUNA"
  | "AFRODESCENDIENTE"
  | "INDIGENA"
  | "ROM"
  | "RAIZAL"
  | "PALENQUERO";

export interface ICreateStudent {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  password: string;
  usuarioId?: string;
  edad: number;
  genero: string;
  etnia: Etnia;
  grado: string;
  riesgoDesercion?: number;
  institucionId: string;
  distanciaEscuela: number;
  tiempoDesplazamiento: number;
  trabaja: boolean;
  horasTrabajo?: number;
  ingresosFamiliares?: number;
  personasHogar: number;
  apoyoFamiliar: boolean;
  accesoInternet: boolean;
  dispositivoElectronico: boolean;
  participacionComunitaria: boolean;
  conocimientosAncestrales: boolean;
  situacionesEspeciales?: string;
  necesidadesEspeciales?: string;
}

export interface GenericMessageResponse<T = Record<string, unknown>> {
  message: string;
  success: boolean;
  data?: T;
}

export interface Institution {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: CiudadesUIUB;
  departamento: Departamento;
  tipo: TipoInstitucion;
  codigoDANE?: string;
}

export interface ApiRestResponse<T = Record<string, unknown>> {
  data: T;
  message: string;
  success: boolean;
}

export enum TipoInstitucion {
  PREESCOLAR,
  PRIMARIA,
  SECUNDARIA,
  MEDIA,
  TECNICA,
  TECNOLOGICA,
  UNIVERSIDAD,
  INSTITUTO,
  OTRO,
}

export enum Departamento {
  AMAZONAS,
  ANTIOQUIA,
  ARAUCA,
  ATLANTICO,
  BOLIVAR,
  BOYACA,
  CALDAS,
  CAQUETA,
  CASANARE,
  CAUCA,
  CESAR,
  CHOCÓ,
  CORDOBA,
  CUNDINAMARCA,
  GUAINIA,
  GUAJIRA,
  GUAVIARE,
  HUILA,
  MAGDALENA,
  META,
  NARIÑO,
  NORTE_DE_SANTANDER,
  PUTUMAYO,
  QUINDIO,
  RISARALDA,
  SAN_ANDRES,
  SANTANDER,
  SUCRE,
  TOLIMA,
  VALLE_DEL_CAUCA,
  VAUPES,
  VICHADA,
  OTRO,
}

export enum CiudadesUIUB {
  ACANDI,
  ALTO_BAUDO,
  ATRATO,
  BAGADO,
  BAHIA_SOLANO,
  BAJO_BAUDO,
  BOJAYA,
  CANTON_DE_SAN_PABLO,
  CARMEN_DEL_DARIEN,
  CERTEGUI,
  CONDOTO,
  EL_CARMEN_DE_ATRATO,
  ISTMINA,
  JURADO,
  LLORO,
  MEDIO_ATRATO,
  MEDIO_BAUDO,
  MEDIO_SAN_JUAN,
  NOVITA,
  NUQUI,
  QUIBDO,
  RIO_IRE,
  RIO_QUITO,
  RIODOCES,
  SAN_JOSE_DEL_PALMAR,
  SIPI,
  TADO,
  UNGUIA,
  UNION_PANAMERICANA,
  OTRA_CIUDAD,
}

export enum MotivoSolicitud {
  BAJO_RENDIMIENTO,     // Bajo rendimiento académico
  INASISTENCIA,         // Inasistencia frecuente
  PROBLEMAS_FAMILIARES, // Problemas familiares
  PROBLEMAS_ECONOMICOS, // Problemas económicos
  ACOSO_ESCOLAR,        // Acoso escolar
  OTROS,                // Otros motivos
}

export enum TipoSolicitante {
  FAMILIAR,
  ESTUDIANTE,
  DOCENTE,
  INSTITUCION,
}

export interface CreateInstitutionData {
  nombre: string;
  direccion: string;
  ciudad: CiudadesUIUB;
  departamento: Departamento;
  tipo: TipoInstitucion;
  codigoDANE?: string;
}

export interface Student {
  id: string;
  nombre: string;
  apellido: string;
  grado?: string;
  identificacion?: string;
}

export interface QuickHelpRequest {
  estudianteId: string;
  motivo: MotivoSolicitud; // Asumiendo que el backend espera el enum numérico
  descripcion: string;
  solicitante: TipoSolicitante; // Asumiendo que el backend espera el enum numérico
  informacionContacto?: {
    nombre: string;
    email: string;
    telefono?: string;
  };
}

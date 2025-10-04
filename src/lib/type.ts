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

export interface Alerta {
  id: string;
  estudianteId: string;
  motivo: MotivoSolicitud;
  descripcion: string;
  solicitante: TipoSolicitante;
  informacionContacto?: {
    nombre: string;
    email: string;
    telefono?: string;
  };
  revisada?: boolean;
  creadaEn?: string;
  actualizadaEn?: string;
  tipo?: string;
  severidad?: string;
}

export interface RegistroAcademico {
  id: string;
  estudianteId: string;
  periodo: string;
  promedio: number;
  materiasAprobadas: number;
  materiasReprobadas: number;
  inasistencias: number;
  comportamiento: number;
  observaciones: string;
  creadoEn: string;
  actualizadoEn: string;
}

export interface Intervencion {
  id: string;
  estudianteId: string;
  tipo: string;
  descripcion: string;
  creadoEn: string;
  actualizadoEn: string;
}

export interface Nota {
  id: string;
  estudianteId: string;
  descripcion: string;
  creadoEn: string;
  actualizadoEn: string;
}

export interface Student {
  id: string;
  nombre: string;
  apellido: string;
  grado?: string;
  identificacion?: string;
  alertas?: Alerta[];
  registros?: RegistroAcademico[];
  intervenciones?: Intervencion[];
  notas?: Nota[];
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

export interface CreateCompleteStudent {
  usuario: {
    nombre: string;
    apellido: string;
    email: string;
    telefono?: string;
    password: string;
  };
  estudiante: {
    edad: number;
    genero: string;
    etnia: string;
    grado: string;
    institucionId: string;
    riesgoDesercion: number;
  };
  contexto: {
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
  };
}

export interface Student {
  id: string;
  usuarioId: string;
  institucionId: string;
  edad: number;
  genero: string;
  etnia: string;
  grado?: string;
  riesgoDesercion: number;
  activo: boolean;
  creadoEn: string;
  actualizadoEn: string;
  usuario: Usuario;
  institucion: Institucion;
  contexto?: ContextoEstudiante;
}

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  rol: string;
}

export interface Institucion {
  id: string;
  nombre: string;
}

export interface ContextoEstudiante {
  id: string;
  estudianteId: string;
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

export interface Nota {
  id: string;
  estudianteId: string;
  descripcion: string;
}

export interface Intervencion {
  id: string;
  estudianteId: string;
  tipo: string;
  descripcion: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: Usuario;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: string;
}

export interface RegisterResponse {
  token: string;
  user: Usuario;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

export interface ChangePasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
  success: boolean;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

export enum Rol {
  ESTUDIANTE,
  DOCENTE,
  PADRE,
  COORDINADOR,
  LIDER_COMUNITARIO,
}
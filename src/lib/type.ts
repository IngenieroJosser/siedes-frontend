export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
  details?: any;
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
  usuarioId: string;
  edad: number;
  genero: string;
  etnia: Etnia;
  grado: string;
  riesgoDesercion: number;
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

export interface GenericMessageResponse {
  message: string;
}

export interface Institution {
  id: string;
  nombre: string;
}

export interface ApiRestResponse {
  message: string;
  data: any;
}
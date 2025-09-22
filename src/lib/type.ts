export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
  details?: any;
}

enum Etnia {
  AFRODESCENDIENTE,   // Afrocolombiano(a)
  INDIGENA,           // Pueblos indígenas
  ROM,                // Pueblo gitano (ROM)
  RAIZAL,             // Raizal del Archipiélago de San Andrés
  PALENQUERO,         // San Basilio de Palenque
  NINGUNA,            // No se autorreconoce en grupo étnico
}

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
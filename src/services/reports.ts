import { api } from "@/lib/api";

export type ObservedRiskLevel = "BAJO" | "MEDIO" | "ALTO";

export interface InstitutionReport {
  id: string;
  institucionId: string;
  anio: number;
  periodo: string;
  fechaCorte: string;
  matriculaCorte: number;
  desertoresConfirmados: number;
  tasaDesercion: number;
  nivelRiesgoObservado: ObservedRiskLevel;
  finalizado: boolean;
  fuente: string;
  observaciones?: string | null;
}

export interface CreateInstitutionReport {
  institucionId: string;
  anio: number;
  periodo: string;
  fechaCorte: string;
  matriculaCorte: number;
  desertoresConfirmados: number;
  nivelRiesgoObservado: ObservedRiskLevel;
  fuente?: string;
  observaciones?: string;
  finalizado?: boolean;
}

type Envelope<T> = T | { data: T };
function unwrap<T>(x: Envelope<T>): T {
  return x && typeof x === "object" && "data" in x ? (x as { data: T }).data : (x as T);
}

export async function createInstitutionReport(payload: CreateInstitutionReport): Promise<InstitutionReport> {
  return unwrap(await api.post<Envelope<InstitutionReport>>("/reports", payload));
}

export async function getInstitutionReports(): Promise<InstitutionReport[]> {
  return unwrap(await api.get<Envelope<InstitutionReport[]>>("/reports"));
}

export async function finalizeInstitutionReport(id: string): Promise<InstitutionReport> {
  return unwrap(await api.post<Envelope<InstitutionReport>>(`/reports/${id}/finalize`));
}

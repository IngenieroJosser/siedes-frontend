import { api } from "@/lib/api";
import { GenericMessageResponse, Institution, Student, MotivoSolicitud, TipoSolicitante } from "@/lib/type";

export interface QuickHelpRequest {
  estudianteId: string;
  motivo: MotivoSolicitud;
  descripcion: string;
  solicitante: TipoSolicitante;
  informacionContacto?: {
    nombre: string;
    email: string;
    telefono?: string;
  };
}

export async function requestQuickHelp(dtoQuickHelp: QuickHelpRequest) {
  return api.post<GenericMessageResponse>(`/help/create-quick-help-request`, dtoQuickHelp);
}

export async function getInstitutions() {
  return api.get<Institution[]>(`/institutions`);
}

export async function getStudentsByInstitution(institutionId: string) {
  return api.get<Student[]>(`/students?institutionId=${institutionId}`);
}
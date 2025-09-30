import { api } from "@/lib/api";
import { GenericMessageResponse, Institution, Student } from "@/lib/type";

export async function requestQuickHelp(dtoQuickHelp: any) {
  return api.post<GenericMessageResponse>(`/help/create-quick-help-request`, dtoQuickHelp);
}

export async function getInstitutions() {
  return api.get<Institution[]>(`/institutions`);
}

export async function getStudentsByInstitution(institutionId: string) {
  return api.get<Student[]>(`/students?institutionId=${institutionId}`);
}
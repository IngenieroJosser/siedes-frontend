import { api } from "@/lib/api";
import { Student } from "@/lib/type";

export async function getStudentsByInstitution(institutionId: string): Promise<Student[]> {
  return await api.get<Student[]>(`/help/students/by-institution/${institutionId}`);
}
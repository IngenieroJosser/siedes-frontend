import { api } from "@/lib/api";
import { GenericMessageResponse, ICreateStudent, Student } from "@/lib/type";

export async function getStudentsByInstitution(institutionId: string): Promise<Student[]> {
  return await api.get<Student[]>(`/help/students/by-institution/${institutionId}`);
}

export async function createStudent(dtoStudent: ICreateStudent) {
  return api.post<GenericMessageResponse>("/student-record", dtoStudent);
}
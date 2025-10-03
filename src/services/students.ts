import { api } from "@/lib/api";
import { GenericMessageResponse, CreateCompleteStudent, Student } from "@/lib/type";

export async function getStudentsByInstitution(institutionId: string): Promise<Student[]> {
  return await api.get<Student[]>(`/help/students/by-institution/${institutionId}`);
}

export async function createStudent(dtoStudent: CreateCompleteStudent) {
  return api.post<GenericMessageResponse>("/students/student-record", dtoStudent);
}
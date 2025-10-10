import { api } from "@/lib/api";
import { GenericMessageResponse, CreateCompleteStudent, Student, UpdateStudentData } from "@/lib/type";

export async function getStudentsByInstitution(institutionId: string): Promise<Student[]> {
  return await api.get<Student[]>(`/help/students/by-institution/${institutionId}`);
}

export async function createStudent(dtoStudent: CreateCompleteStudent) {
  return api.post<GenericMessageResponse>("/students/student-record", dtoStudent);
}

export async function getStudents(): Promise<Student[]> {
  return await api.get<Student[]>(`/students`);
}

export async function getStudentById(id: string): Promise<Student> {
  return await api.get<Student>(`/students/${id}`);
}

export async function updateStudent(id: string, dtoStudent: UpdateStudentData) {
  return api.put<GenericMessageResponse>(`/students/${id}`, dtoStudent);
}

export async function deleteStudent(id: string) {
  return api.delete<GenericMessageResponse>(`/students/${id}`);
}

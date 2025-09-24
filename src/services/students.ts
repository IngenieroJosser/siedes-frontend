import { ICreateStudent, GenericMessageResponse, ApiRestResponse } from "@/lib/type";
import { api } from "../lib/api";

export async function createStudent(dtoStudent: ICreateStudent) {
  return api.post<GenericMessageResponse>("/student-record", dtoStudent);
}

export async function getStudents() {
  return api.get<ApiRestResponse>("/student-record");
}

export async function getStudentById(id: string) {
  return api.get<ApiRestResponse>(`/student-record/${id}`);
}
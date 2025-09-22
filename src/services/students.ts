import { ICreateStudent, GenericMessageResponse } from "@/lib/type";
import { apiRequest } from "../lib/api";

export async function createStudent(dtoStudent: ICreateStudent) {
  return apiRequest<GenericMessageResponse>("POST", `/student-record`, dtoStudent);
}
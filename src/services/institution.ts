import { api } from "@/lib/api";
import { Institution } from "@/lib/type";

export async function getInstitutions(): Promise<Institution[]> {
  return await api.get<Institution[]>('/help/institutions');
}
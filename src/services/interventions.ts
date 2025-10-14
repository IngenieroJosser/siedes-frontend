import { api } from "@/lib/api";
import { 
  CreateInterventionData, 
  Intervention, 
  FilterInterventionsParams, 
  UpdateInterventionData, 
  InterventionsStatsResponse,
  InterventionsResponse 
} from "@/lib/type";

export async function createIntervention(interventionData: CreateInterventionData) {
  return api.post<Intervention>('/interventions', interventionData);
}

export async function getInterventions(filters?: FilterInterventionsParams) {
  const response = await api.get<InterventionsResponse>('/interventions', { params: filters });
  return response.data;
}

export async function getInterventionById(id: string) {
  const response = await api.get<{ data: Intervention }>(`/interventions/${id}`);
  return response.data;
}

export async function updateIntervention(id: string, interventionData: UpdateInterventionData) {
  const response = await api.patch<{ data: Intervention }>(`/interventions/${id}`, interventionData);
  return response.data;
}

export async function deleteIntervention(id: string) {
  return api.delete(`/interventions/${id}`);
}

export async function markInterventionAsCompleted(id: string) {
  const response = await api.patch<{ data: Intervention }>(`/interventions/${id}/complete`);
  return response.data;
}

export async function getInterventionsByStudent(estudianteId: string) {
  const response = await api.get<InterventionsResponse>(`/interventions/student/${estudianteId}`);
  return response.data;
}

export async function getInterventionsStats() {
  const response = await api.get<InterventionsStatsResponse>('/interventions/stats');
  return response.data;
}
import { api } from "@/lib/api";
import { CreateAlertData, UpdateAlertData, FilterAlertsParams, AlertsStats, Alert, GenericMessageResponse } from "@/lib/type";

export async function createAlert(alertData: CreateAlertData) {
  return api.post<Alert>('/alerts', alertData);
}

export async function getAlerts(filters?: FilterAlertsParams) {
  return await api.get<Alert[]>('/alerts', { params: filters });
}

export async function getAlertById(id: string) {
  return await api.get<Alert>(`/alerts/${id}`);
}

export async function updateAlert(id: string, alertData: UpdateAlertData) {
  return await api.patch<Alert>(`/alerts/${id}`, alertData);
}

export async function deleteAlert(id: string) {
  return api.delete<GenericMessageResponse>(`/alerts/${id}`);
}

export async function markAlertAsReviewed(id: string) {
  return await api.patch<Alert>(`/alerts/${id}/review`);
}

export async function getAlertsByStudent(estudianteId: string) {
  return await api.get<Alert[]>(`/alerts/student/${estudianteId}`);
}

export async function getAlertsStats() {
  return await api.get<AlertsStats>('/alerts/stats');
}

export async function getCriticalAlerts() {
  return await api.get<Alert[]>('/alerts/critical');
}
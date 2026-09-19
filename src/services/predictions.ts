import { api } from "@/lib/api";
import {
  AiDashboardSummary,
  AiHealthResponse,
  AiInstitutionFactor,
  AiInstitutionRisk,
  AiModelMetadata,
  RetrainingStatus,
} from "@/lib/prediction-types";

type ApiEnvelope<T> =
  | T
  | {
      success?: boolean;
      message?: string;
      data: T;
      timestamp?: string;
    };

function unwrap<T>(response: ApiEnvelope<T>): T {
  if (
    response &&
    typeof response === "object" &&
    "data" in response &&
    (response as { data?: T }).data !== undefined
  ) {
    return (response as { data: T }).data;
  }
  return response as T;
}

export async function getAiHealth(): Promise<AiHealthResponse> {
  return unwrap(
    await api.get<ApiEnvelope<AiHealthResponse>>("/prediction/health")
  );
}

export async function getAiModel(): Promise<AiModelMetadata> {
  return unwrap(
    await api.get<ApiEnvelope<AiModelMetadata>>("/prediction/model")
  );
}

export async function getAiDashboard(): Promise<AiDashboardSummary> {
  return unwrap(
    await api.get<ApiEnvelope<AiDashboardSummary>>("/prediction/dashboard")
  );
}

export async function getInstitutionRisks(): Promise<AiInstitutionRisk[]> {
  return unwrap(
    await api.get<ApiEnvelope<AiInstitutionRisk[]>>("/prediction/institutions")
  );
}

export async function getInstitutionRiskHistory(
  schoolCode: string
): Promise<AiInstitutionRisk[]> {
  return unwrap(
    await api.get<ApiEnvelope<AiInstitutionRisk[]>>(
      `/prediction/institutions/${encodeURIComponent(schoolCode)}/history`
    )
  );
}

export async function getInstitutionRiskFactors(
  schoolCode: string
): Promise<AiInstitutionFactor[]> {
  return unwrap(
    await api.get<ApiEnvelope<AiInstitutionFactor[]>>(
      `/prediction/institutions/${encodeURIComponent(schoolCode)}/factors`
    )
  );
}

export async function getRetrainingStatus(): Promise<RetrainingStatus> {
  return unwrap(
    await api.get<ApiEnvelope<RetrainingStatus>>("/ml/retraining/status")
  );
}

import { api } from "@/lib/api";
import {
  AiHealthResponse,
  AiModelMetadata,
  AiPredictionHistoryItem,
  AiStudentPrediction,
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
  const response = await api.get<ApiEnvelope<AiHealthResponse>>(
    "/prediction/health"
  );
  return unwrap(response);
}

export async function getAiModel(): Promise<AiModelMetadata> {
  const response = await api.get<ApiEnvelope<AiModelMetadata>>(
    "/prediction/model"
  );
  return unwrap(response);
}

export async function predictStudentRisk(
  studentId: string,
  persist = true
): Promise<AiStudentPrediction> {
  const response = await api.post<ApiEnvelope<AiStudentPrediction>>(
    `/prediction/students/${encodeURIComponent(studentId)}?persist=${String(
      persist
    )}`
  );
  return unwrap(response);
}

export async function getStudentPredictionHistory(
  studentId: string
): Promise<AiPredictionHistoryItem[]> {
  const response = await api.get<ApiEnvelope<AiPredictionHistoryItem[]>>(
    `/prediction/students/${encodeURIComponent(studentId)}/history`
  );
  return unwrap(response);
}

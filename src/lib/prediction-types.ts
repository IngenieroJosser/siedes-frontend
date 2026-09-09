export type AiRiskLevel = "BAJO" | "MEDIO" | "ALTO" | "CRITICO";
export type AiModelType = "student_supervised" | "hybrid_baseline" | string;

export interface AiRiskFactor {
  factor: string;
  contribution: number;
  direction: "AUMENTA" | "REDUCE" | "CONTEXTUAL" | string;
  explanation: string;
}

export interface AiStudentPrediction {
  probability: number;
  risk_level: AiRiskLevel;
  model_type: AiModelType;
  model_version: string;
  institutional_prior?: number | null;
  factors: AiRiskFactor[];
  warnings: string[];
  persisted?: boolean;
}

export interface AiPredictionHistoryItem {
  id: string;
  estudianteId: string;
  probability: number;
  nivelRiesgo: AiRiskLevel;
  modelType: AiModelType;
  modelVersion: string;
  institutionalPrior?: number | null;
  factores?: AiRiskFactor[] | null;
  warnings?: string[] | null;
  creadaEn: string;
}

export interface AiHealthResponse {
  status?: string;
  ready?: boolean;
  model_loaded?: boolean;
  model_version?: string;
  [key: string]: unknown;
}

export interface AiModelMetadata {
  model_version?: string;
  version?: string;
  model_type?: string;
  model_name?: string;
  task?: string;
  trained_at?: string;
  created_at?: string;
  features?: string[];
  feature_names?: string[];
  metrics?: Record<string, number | string | null | undefined>;
  [key: string]: unknown;
}

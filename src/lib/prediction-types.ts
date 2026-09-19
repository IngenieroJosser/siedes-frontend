export type AiInstitutionRiskLevel = "BAJO" | "MEDIO" | "ALTO";

export interface AiHealthResponse {
  status?: string;
  ready?: boolean;
  model_ready?: boolean;
  predictions_ready?: boolean;
  version?: string;
  [key: string]: unknown;
}

export interface AiModelMetadata {
  model_version?: string;
  version?: string;
  algorithm?: string;
  model_type?: string;
  model_name?: string;
  task?: string;
  trained_at?: string;
  created_at?: string;
  feature_columns?: string[];
  features?: string[];
  feature_names?: string[];
  trained_years?: number[];
  high_risk_threshold?: number;
  enterprise_gates?: Record<string, boolean>;
  deployment_eligibility?: string;
  metrics?: Record<string, number | string | boolean | null | undefined>;
  [key: string]: unknown;
}

export interface AiDashboardSummary {
  anio: number;
  instituciones: number;
  riesgo: {
    BAJO: number;
    MEDIO: number;
    ALTO: number;
  };
  prob_alto_media: number;
}

export interface AiInstitutionRisk {
  codigo_dane_establecimiento: string;
  institucion_educativa: string;
  zona_institucion?: string;
  anio: number;
  riesgo_predicho: AiInstitutionRiskLevel;
  prob_bajo?: number;
  prob_medio?: number;
  prob_alto?: number;
  riesgo_real?: string;
  target_tasa_desercion_fin_anio_pct?: number;
  matricula_sintetica_10_18_corte?: number;
  asistencia_promedio_sem1_pct?: number;
  vulnerabilidad_socioeconomica_media?: number;
  pertinencia_etnoeducativa_ie_promedio?: number;
  pertenencia_cultural_estudiante_promedio?: number;
  cobertura_pae_estudiantes_pct?: number;
  respuesta_institucional_promedio?: number;
  pct_alerta_asistencia?: number;
  pct_alerta_academica?: number;
  pct_alerta_socioeconomica?: number;
  [key: string]: unknown;
}

export interface AiInstitutionFactor {
  anio: number;
  codigo_dane_establecimiento: string;
  institucion_educativa: string;
  zona_institucion?: string;
  rank: number;
  feature: string;
  shap_alto: number;
  direccion: string;
  abs_shap: number;
}

export interface RetrainingRunSummary {
  run_id?: string;
  status?: string;
  reason?: string;
  total_labeled_rows?: number;
  new_labeled_reports?: number;
  model_version?: string;
  finished_at?: string;
  metrics?: Record<string, number | string | null>;
}

export interface RetrainingStatus {
  continual_learning_enabled: boolean;
  events_total: number;
  events_pending: number;
  new_finalized_reports: number;
  min_new_finalized_reports: number;
  min_total_labeled_rows: number;
  production_min_real_rows: number;
  last_run?: RetrainingRunSummary | null;
  latest_candidate?: { version?: string; stage?: string; registered_at_utc?: string } | null;
  policy?: string;
}

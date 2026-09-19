# SIEDES Frontend — riesgo institucional

## Contrato funcional

El producto predictivo del piloto es **institucional**. El navegador no solicita ni muestra inferencias ML por estudiante.

```text
Next.js -> NestJS -> FastAPI SIEDES AI
               \-> PostgreSQL
```

## Vistas

### `/core/ai`

- estado del microservicio de IA;
- versión y algoritmo del modelo;
- número de instituciones evaluadas;
- distribución BAJO / MEDIO / ALTO;
- probabilidad de riesgo ALTO;
- gates empresariales;
- listado priorizado de colegios.

### `/core/ai/[schoolCode]`

- nivel de riesgo del colegio;
- probabilidad de clase ALTO;
- serie histórica;
- indicadores académicos, socioeconómicos, institucionales y etnoeducativos;
- factores SHAP del último corte;
- advertencias de uso responsable.

## Endpoints consumidos

```http
GET /prediction/health
GET /prediction/model
GET /prediction/dashboard
GET /prediction/institutions
GET /prediction/institutions/:schoolCode/history
GET /prediction/institutions/:schoolCode/factors
```

El frontend solo necesita:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

`AI_API_KEY` nunca debe existir en variables `NEXT_PUBLIC_*`.

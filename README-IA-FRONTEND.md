# SIEDES Frontend — Integración de IA

## Arquitectura

El frontend no consume FastAPI directamente. La integración correcta es:

```text
Next.js -> NestJS -> PostgreSQL
               \\-> FastAPI -> modelo SIEDES AI
```

Esto evita exponer secretos service-to-service, endpoints internos de reentrenamiento y contratos del modelo al navegador.

## Nuevas superficies de IA

### `/core/ai`

Centro operativo de IA con:

- disponibilidad del servicio predictivo
- metadata y versión del modelo activo
- métricas únicamente cuando el backend/modelo las informa
- distribución del riesgo actualmente almacenado
- flujo PostgreSQL -> NestJS -> FastAPI -> modelo -> persistencia -> revisión humana
- explicación del ciclo Champion / Challenger
- principios de IA responsable

### `/core/students/[id]` -> pestaña `IA predictiva`

Para cada estudiante permite:

- solicitar una nueva inferencia a través del backend
- mostrar probabilidad y nivel de riesgo
- mostrar tipo y versión de modelo
- mostrar prior institucional cuando existe
- mostrar factores explicativos entregados por el modelo
- mostrar advertencias del modelo
- consultar historial de predicciones persistidas

La inferencia no se ejecuta automáticamente al abrir una trayectoria. El usuario debe solicitarla, evitando generar predicciones y escrituras innecesarias.

## Endpoints consumidos por el frontend

```http
GET  /prediction/health
GET  /prediction/model
POST /prediction/students/:studentId?persist=true
GET  /prediction/students/:studentId/history
```

## Endpoints que NO consume el navegador

```http
POST /prediction/outcomes
GET  /prediction/training-data
```

Son parte del flujo interno/gobernado de aprendizaje y no deben requerir una clave interna expuesta en JavaScript del cliente.

## Principio de aprendizaje continuo

Las predicciones no son etiquetas. El reentrenamiento debe utilizar outcomes reales observados posteriormente y aplicar un proceso Challenger -> evaluación -> promoción del Champion.

## Variables de entorno

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

En producción se configura con la URL pública del backend NestJS.

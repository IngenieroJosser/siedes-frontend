# SIEDES Frontend — aprendizaje continuo

La vista `/core/ai` muestra el estado del aprendizaje continuo (eventos pendientes, cierres nuevos y último candidato).

La vista `/core/reports` incluye un bloque **Cierre institucional etiquetado**. Al registrar un cierre finalizado:

1. NestJS persiste el reporte y el evento en PostgreSQL.
2. El outbox lo entrega a SIEDES AI.
3. La IA acumula la nueva etiqueta.
4. Solo cuando se alcanza el umbral de datos y pasan los controles se crea un candidato.

El frontend nunca conoce las claves internas Backend↔IA y nunca ordena promoción automática a producción.

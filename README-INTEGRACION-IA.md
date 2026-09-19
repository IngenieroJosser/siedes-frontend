# Frontend SIEDES - integración institucional

El frontend **solo** consume NestJS. Nunca debe contener `SIEDES_API_KEY` ni `AI_API_KEY`.

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Arranque:

```bash
npm install
npm run dev
```

Vista institucional:

- `http://localhost:3000/core/ai`
- `http://localhost:3000/core/ai/{codigoDANE}`

La pantalla consulta primero `/prediction/health`. Si la IA no está lista, muestra un diagnóstico y evita generar múltiples respuestas 503.

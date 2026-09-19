# Validación de cambios de IA en frontend

Validaciones ejecutadas sobre los archivos modificados:

- `tsc --noEmit`: OK
- ESLint sobre la página IA, trayectoria individual, servicio de predicción, workspace, dashboard y cliente API: OK, sin errores ni warnings

El `next build` no pudo completarse en el entorno de validación porque el ZIP original contiene dependencias nativas de macOS ARM y el entorno de validación es Linux; Next.js intentó descargar el paquete SWC de Linux, pero el entorno no tiene acceso de red. No se detectaron errores TypeScript ni ESLint en los cambios.

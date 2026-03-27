# Bug report: Prisma Client no genera archivos en Windows

## Descripción
Al ejecutar `npx prisma generate` en un proyecto Next.js con Prisma 7.4.0 o 7.5.0 sobre Windows, el comando finaliza exitosamente pero **no se generan los archivos esperados** en `node_modules/@prisma/client/.prisma/client`. Esto causa errores de importación en TypeScript como:

```
Module '"@prisma/client"' has no exported member 'PrismaClient'.
```

## Pasos para reproducir
1. Proyecto Next.js con TypeScript y Prisma configurado.
2. `package.json`:
   - `prisma` y `@prisma/client` en la misma versión (probado con 7.4.0 y 7.5.0).
3. `prisma.config.ts` y `schema.prisma` configurados correctamente.
4. Ejecutar:
   - `npm install`
   - `npx prisma generate`
5. Revisar `node_modules/@prisma/client`: **no existe la carpeta `.prisma/client`** ni los archivos generados.

## Lo intentado
- Limpiar `node_modules` y `package-lock.json`.
- Probar varias versiones de Prisma.
- Ejecutar en PowerShell y CMD.
- Revisar permisos y rutas.
- El comando termina sin errores, pero no genera los archivos.

## Sistema
- SO: Windows 10/11
- Node: 20.x
- Prisma: 7.4.0 y 7.5.0
- Next.js: 16.x

## Archivos relevantes
- `prisma.config.ts` y `schema.prisma` adjuntos.
- `.env` con DATABASE_URL configurada.

## Notas
- El problema **no ocurre** en otros entornos (Linux/WSL).
- No hay archivos `.prismaignore` ni configuraciones extrañas.

---

¿Alguna solución o workaround para que Prisma Client genere correctamente los archivos en Windows?

---

Adjunto logs y archivos si es necesario.
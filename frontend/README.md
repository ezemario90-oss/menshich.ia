# mengchig.ia - Social Connector

## Arranque rápido

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Configura variables de entorno en `.env`:

   - FB_APP_ID
   - FB_APP_SECRET
   - JWT_SECRET
   - DATABASE_URL

3. Migra el esquema Prisma:

   ```bash
   npx prisma migrate dev --name init
   ```

4. Corre el servidor:

   ```bash
   npm run dev
   ```

## Funcionalidades

- Login y conexión de cuentas Facebook/Instagram vía NextAuth
- Vinculación manual de WhatsApp Cloud API
- Panel de conexiones y estado

## Seguridad

- Tokens gestionados en PostgreSQL vía Prisma
- Cumple políticas de Meta y WhatsApp

---

¡Listo para conectar redes sociales y gestionar ventas desde tu app!

Incluye datos de ejemplo para productos, pedidos, canales y usuarios.

---

¡Listo para usar y personalizar en VS Code!

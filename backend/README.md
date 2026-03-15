# mengchig.ia Backend

## Arranque rápido

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Configura la base de datos en `.env` (PostgreSQL recomendado).

3. Migra el esquema Prisma:

   ```bash
   npx prisma migrate dev --name init
   ```

4. Corre el servidor:

   ```bash
   node index.js
   ```

## Endpoints principales

- `/auth/login` - Login (POST, body: username, password)
- `/admin/products` - CRUD productos (GET, POST, PUT, DELETE)
- `/admin/settings` - Configuración de canales (GET, PUT)

## Seguridad

- Protege rutas admin con JWT
- Credenciales demo en `.env`

## Personalización

- Puedes agregar endpoints para pedidos, usuarios y canales según tu necesidad.

---

¡Listo para conectar con el frontend y expandir funcionalidades!

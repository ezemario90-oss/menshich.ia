# Multi-Channel Sales API - Step 3 (WhatsApp, Messenger, Instagram MVP)

Este repositorio proporciona un backend mínimo en Node.js con Express para un asistente de ventas multicanal (WhatsApp, Messenger, Instagram) que:
- Recibe mensajes vía WhatsApp Cloud API, Messenger y Instagram
- Responde usando IA (OpenAI) con contexto de stock
- Genera un enlace de pago con Stripe para completar la compra

Estructura:
- backend/ (todo el código del API y lógica de negocio)

   # mengsinch.ia

   ![Logo mengsinch.ia](frontend/public/logo.svg)

   **Panel de ventas multicanal con IA, WhatsApp, Messenger, Instagram y Stripe**

   ---

   ## ¿Qué es mengsinch.ia?

   Una solución SaaS para gestionar ventas, productos y canales de mensajería desde un panel admin moderno. Incluye IA, pagos, y es ideal para vender por suscripción mensual.

   ---

   ## Características

   - Panel admin Next.js protegido por JWT
   - CRUD de productos, variantes y stock
   - Configuración de canales (WhatsApp, Messenger, Instagram)
   - Persistencia con PostgreSQL y Prisma
   - Seeds de ejemplo para demo
   - Docker y docker-compose para despliegue rápido
   - Scripts de prueba automáticos
   - Branding mengsinch.ia (logo azul)
   - Preparado para venta por suscripción mensual

   ---

   ## Instalación rápida

   1. Clona el repo:
      ```bash
      git clone https://github.com/ezemario90-oss/multi-channel-sales-step4-admin.git
      cd multi-channel-sales-step4-admin
      ```

   2. Levanta el stack:
      ```bash
      docker-compose up --build
      ```

   3. Ejecuta seeds:
      ```bash
      docker-compose exec backend node prisma/seed.js
      ```

   4. Prueba endpoints:
      ```powershell
      .\test_mengsinch.ps1
      ```

   ---

   ## Variables de entorno

   - `DATABASE_URL`: conexión PostgreSQL
   - `ADMIN_USER`, `ADMIN_PASS`: usuario y contraseña admin
   - `JWT_SECRET`: clave JWT
   - Claves de WhatsApp, Messenger, Instagram, Stripe, OpenAI

   Ejemplo en backend/.env.example

   ---

   ## Demo y venta

   - Panel admin: http://localhost:3001/admin/login
   - Acceso demo: admin / admin123
   - Listo para personalizar y vender por suscripción mensual

   ---

   ## Branding y personalización

   - Logo mengsinch.ia (azul)
   - Textos y colores personalizables
   - Puedes adaptar el nombre, logo y colores para tu cliente

   ---

   ## Cómo vender la app

   - Ideal para comercios, marcas, emprendedores
   - Panel centralizado para ventas multicanal
   - IA para respuestas automáticas
   - Pagos integrados
   - Suscripción mensual fácil de gestionar

   ---

   ## Contacto y soporte

   Para soporte, personalización o dudas, contáctame por GitHub o email.

   ---

   ## Licencia

   Uso comercial permitido. Puedes vender la app bajo tu marca.

- El backend mantiene la lógica de IA, stock en memoria y Stripe.
- El panel admin usa PostgreSQL para persistencia.
- Puedes ampliar el modelo y endpoints para pedidos, usuarios, etc.

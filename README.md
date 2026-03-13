# Multi-Channel Sales API - Step 3 (WhatsApp, Messenger, Instagram MVP)

Este repositorio proporciona un backend mínimo en Node.js con Express para un asistente de ventas multicanal (WhatsApp, Messenger, Instagram) que:
- Recibe mensajes vía WhatsApp Cloud API, Messenger y Instagram
- Responde usando IA (OpenAI) con contexto de stock
- Genera un enlace de pago con Stripe para completar la compra

Estructura:
- backend/ (todo el código del API y lógica de negocio)
   - routes/
      - webhookWhatsApp.js
      - webhookMessenger.js
      - webhookInstagram.js
   - services/
      - channelWhatsApp.js
      - channelMessenger.js
      - channelInstagram.js
      - aiService.js
      - catalogService.js
      - paymentService.js
- frontend/ (pendiente para Step 4; se añadirá más adelante)

Qué viene en este Step
- Webhook /webhooks/whatsapp para recibir mensajes
- Webhook /webhooks/messenger para Messenger
- Webhook /webhooks/instagram para Instagram
- Adaptadores básicos para enviar respuestas en cada canal
- Servicio de IA (OpenAI) para respuestas automáticas
- Servicio de catálogo en memoria (stock/tallas)
- Servicio de pagos con Stripe (Checkout)

Cómo usar
1) Copia este proyecto en tu entorno de desarrollo.
2) En backend/.env.example coloca tus llaves y configura:
   - OPENAI_API_KEY=tu_api_key_de_openai
   - WHATSAPP_TOKEN=tu_token_whatsapp
   - WHATSAPP_PHONE_ID=tu_phone_id_whatsapp
   - STRIPE_API_KEY=tu_api_key_stripe
   - FACEBOOK_PAGE_TOKEN=token_de_página_facebook
   - INSTAGRAM_ACCESS_TOKEN=token_de_instagram
   - INSTAGRAM_USER_ID=id_de_cuenta_instagram
   - PORT=3000
3) Ejecuta:
   - cd backend
   - npm install
   - cp .env.example .env (o manualmente crear .env con las claves)
   - npm run dev
4) Prueba:
   - GET http://localhost:3000/health debe devolver { ok: true, timestamp: ... }
   - POST a /webhooks/whatsapp desde tu sandbox de WhatsApp Cloud API
   - POST a /webhooks/messenger desde Facebook Messenger (verifica el webhook en Facebook Developers)
   - POST a /webhooks/instagram desde Instagram (verifica el webhook en Facebook Developers)

Siguientes pasos
- Paso 4: crear un panel admin (Next.js) y conectar PostgreSQL
- Paso 5: añadir TikTok si la API de mensajería está disponible y completar el flujo de pagos

Notas de seguridad y cumplimiento
- Asegúrate de manejar correctamente las firmas/webhooks de cada canal.
- Obtén consentimiento para mensajes proactivos y respeta límites de cada plataforma.
- Usa claves de entorno y no las compartas en el código.

Configuración de Messenger e Instagram
- Crea una App en Facebook for Developers y vincúlala a tu página de Facebook (Messenger) y cuenta de Instagram Business.
- Obtén los tokens y IDs necesarios y configúralos en .env.
- Registra los webhooks en Facebook Developers:
   - Messenger: /webhooks/messenger
   - Instagram: /webhooks/instagram
- Verifica el token de verificación (verify token) en la configuración de webhooks.
- Suscríbete a los eventos de mensajes para ambos canales.

# Panel Admin (Step 4)

## Migración y configuración

1. Instala dependencias:
   - Backend: `npm install @prisma/client prisma pg`
   - Frontend: `npm install`

2. Configura la variable `DATABASE_URL` en tu `.env` del backend:
   ```
   DATABASE_URL=postgresql://usuario:password@host:puerto/db
   ```

3. Ejecuta migraciones Prisma:
   ```
   npx prisma migrate dev --name init
   ```

4. Inicia el backend:
   ```
   node backend/index.js
   ```

5. Inicia el frontend:
   ```
   cd frontend
   npm run dev
   ```

## Prueba

- Accede a `/admin/products` y `/admin/settings` en el frontend para gestionar productos y configuración de canales.
- Los endpoints admin están disponibles en el backend:
  - GET/POST/PUT/DELETE `/admin/products`
  - GET/PUT `/admin/settings`

## Notas

- El backend mantiene la lógica de IA, stock en memoria y Stripe.
- El panel admin usa PostgreSQL para persistencia.
- Puedes ampliar el modelo y endpoints para pedidos, usuarios, etc.

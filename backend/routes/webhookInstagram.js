// backend/routes/webhookInstagram.js
const express = require('express');
const router = express.Router();
const { generateReply } = require('../services/aiService');
const { getStockContext } = require('../services/catalogService');
const { createCheckoutSession } = require('../services/paymentService');
const InstagramChannel = require('../services/channelInstagram');

// Instancia del canal Instagram
const instagram = new InstagramChannel();

router.post('/webhooks/instagram', async (req, res) => {
  try {
    // Estructura típica de mensajes en Instagram (adaptar según tu payload)
    const entry = req.body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const messages = changes?.value?.messages;
    if (!messages || !messages.length) return res.sendStatus(200);

    const msg = messages[0];
    const senderId = msg?.sender?.id || msg?.from?.id;
    const text = msg?.text?.body || msg?.text || '';

    if (!senderId || !text) return res.sendStatus(200);

    // Contexto del catálogo
    const context = getStockContext();

    // IA para generar respuesta
    const aiReply = await generateReply(context, text);

    // Iniciar pago si detecta intención de comprar
    let reply = aiReply;
    const lower = (text || '').toLowerCase();
    if (lower.includes('comprar') || lower.includes('pagar') || lower.includes('carrito')) {
      const session = await createCheckoutSession({
        amount: 5000,
        currency: 'usd',
        successUrl: 'https://tu-dominio.com/success',
        cancelUrl: 'https://tu-dominio.com/cancel'
      });
      if (session && session.url) {
        reply += `\n\nPara completar la compra, usa este enlace: ${session.url}`;
      }
    }

    // Enviar respuesta por Instagram
    await instagram.sendMessage(senderId, reply);
    res.sendStatus(200);
  } catch (e) {
    console.error('Error en webhook Instagram:', e);
    res.sendStatus(500);
  }
});

module.exports = router;

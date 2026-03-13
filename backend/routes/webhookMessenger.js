// backend/routes/webhookMessenger.js
const express = require('express');
const router = express.Router();
const { generateReply } = require('../services/aiService');
const { getStockContext } = require('../services/catalogService');
const { createCheckoutSession } = require('../services/paymentService');
const MessengerChannel = require('../services/channelMessenger');

// Instancia del canal Messenger
const messenger = new MessengerChannel();

router.post('/webhooks/messenger', async (req, res) => {
  try {
    // Extraer mensaje entrante de Messenger
    const body = req.body;
    const entry = body?.entry?.[0];
    const messaging = entry?.messaging?.[0];
    const senderId = messaging?.sender?.id;
    const text = (messaging?.message?.text?.text) || (messaging?.message?.text) || '';

    if (!senderId || !text) {
      return res.sendStatus(200);
    }

    // Contexto del catálogo
    const context = getStockContext();

    // IA para generar respuesta
    const aiReply = await generateReply(context, text);

    // Iniciar pago si detecta intención de compra (simple heurístico)
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

    // Enviar respuesta por Messenger
    await messenger.sendMessage(senderId, reply);
    res.sendStatus(200);
  } catch (e) {
    console.error('Error en webhook Messenger:', e);
    res.sendStatus(500);
  }
});

module.exports = router;

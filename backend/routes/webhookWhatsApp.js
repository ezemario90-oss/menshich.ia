const express = require('express');
const router = express.Router();
const WhatsAppChannel = require('../services/channelWhatsApp');
const { generateReply } = require('../services/aiService');
const { getStockContext } = require('../services/catalogService');
const { createCheckoutSession } = require('../services/paymentService');

// Instancia del canal WhatsApp
const wa = new WhatsAppChannel();

router.post('/webhooks/whatsapp', async (req, res) => {
  try {
    // Recibir mensaje desde WhatsApp
    const msg = wa.receiveMessage(req);
    if (!msg || !msg.from || !msg.text) {
      return res.sendStatus(200);
    }

    // Contexto del catálogo para IA
    const context = getStockContext();

    // Generar respuesta con IA
    const aiReply = await generateReply(context, msg.text);

    // Detectar intención de compra y generar enlace de pago (opcional en MVP)
    let reply = aiReply;
    const lower = (msg.text || '').toLowerCase();
    if (lower.includes('comprar') || lower.includes('pagar') || lower.includes('carrito')) {
      const session = await createCheckoutSession({
        amount: 5000, // en centavos; 50.00 USD como ejemplo
        currency: 'usd',
        successUrl: 'https://tu-dominio.com/success',
        cancelUrl: 'https://tu-dominio.com/cancel'
      });
      if (session && session.url) {
        reply += `\n\nPara completar la compra, usa este enlace: ${session.url}`;
      }
    }

    // Enviar respuesta por WhatsApp
    await wa.sendMessage(msg.from, reply);
    res.sendStatus(200);
  } catch (e) {
    console.error('Error en webhook WhatsApp:', e);
    res.sendStatus(500);
  }
});

module.exports = router;

// backend/services/channelWhatsApp.js
const axios = require('axios');
require('dotenv').config();

class WhatsAppChannel {
  constructor() {
    this.token = process.env.WHATSAPP_TOKEN;
    this.phoneId = process.env.WHATSAPP_PHONE_ID;
  }

  // Recibe mensaje desde el webhook de WhatsApp Cloud API
  receiveMessage(req) {
    const entry = req.body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;

    if (!messages || messages.length === 0) return null;

    const msg = messages[0];
    const from = msg?.from;
    const text = msg?.text?.body || '';

    return { from, text };
  }

  async sendMessage(to, text) {
    const url = `https://graph.facebook.com/v16.0/${this.phoneId}/messages`;
    const payload = {
      messaging_product: 'whatsapp',
      to,
      text: { body: text }
    };
    const res = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    return res.data;
  }

  // Firma/validación pueden añadirse en una versión posterior
}

module.exports = WhatsAppChannel;

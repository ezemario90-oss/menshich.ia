// backend/services/channelMessenger.js
const axios = require('axios');
require('dotenv').config();

class MessengerChannel {
  constructor() {
    this.token = process.env.FACEBOOK_PAGE_TOKEN;
  }

  // Recibe mensajes (útil para tests)
  async receiveMessage(req) {
    const body = req.body;
    const entry = body?.entry?.[0];
    const messaging = entry?.messaging?.[0];
    const senderId = messaging?.sender?.id;
    const text = messaging?.message?.text?.text || messaging?.message?.text;

    return { from: senderId, text };
  }

  async sendMessage(to, text) {
    const url = `https://graph.facebook.com/v16.0/me/messages?access_token=${this.token}`;
    const payload = {
      recipient: { id: to },
      message: { text }
    };
    const res = await axios.post(url, payload);
    return res.data;
  }
}

module.exports = MessengerChannel;

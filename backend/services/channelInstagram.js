// backend/services/channelInstagram.js
const axios = require('axios');
require('dotenv').config();

class InstagramChannel {
  constructor() {
    this.token = process.env.INSTAGRAM_ACCESS_TOKEN;
    this.instagramUserId = process.env.INSTAGRAM_USER_ID; // id de la cuenta IG Business
  }

  async sendMessage(to, text) {
    // Payload y endpoint pueden variar según la versión de la API.
    const url = `https://graph.facebook.com/v16.0/${this.instagramUserId}/messages`;
    const payload = {
      messaging_product: 'instagram',
      recipient: { id: to },
      message: { text }
    };
    const res = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    return res.data;
  }

  // receiveMessage se implementa en la ruta webhook (req.body) según el payload recibido
}

module.exports = InstagramChannel;

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const whatsappRouter = require('./routes/webhookWhatsApp');
const messengerRouter = require('./routes/webhookMessenger');
const instagramRouter = require('./routes/webhookInstagram');
const adminRouter = require('./routes/admin');

const app = express();
app.use(bodyParser.json());

// Rutas de canales
app.use('/', whatsappRouter);
app.use('/', messengerRouter);
app.use('/', instagramRouter);
app.use('/', adminRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true, timestamp: Date.now() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});

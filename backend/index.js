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
const authRouter = require('./routes/auth');
const jwt = require('jsonwebtoken');

// Middleware para proteger rutas admin
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwt';
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

app.use('/auth', authRouter);
app.use('/admin', verifyToken, adminRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true, timestamp: Date.now() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});

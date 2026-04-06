// Cron para avisos automáticos de renovación
const { checkRenewalReminders } = require('./services/paymentService');
const cron = require('node-cron');

// Ejecuta la tarea todos los días a las 9:00 AM
cron.schedule('0 9 * * *', async () => {
  console.log('Ejecutando avisos de renovación de suscripción...');
  await checkRenewalReminders();
});
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const whatsappRouter = require('./routes/webhookWhatsApp');
const messengerRouter = require('./routes/webhookMessenger');
const instagramRouter = require('./routes/webhookInstagram');
const adminRouter = require('./routes/admin');
const webhookPaddle = require('./routes/webhookPaddle');


const app = express();
// Configura CORS para aceptar peticiones del frontend en Render
app.use(cors({
  origin: 'https://TU_DOMINIO_FRONTEND', // Reemplaza con la URL de tu frontend en Render
  credentials: true
}));
app.use(bodyParser.json());

// Rutas de canales
app.use('/', whatsappRouter);
app.use('/', messengerRouter);
app.use('/', instagramRouter);
app.use(webhookPaddle);
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
// Endpoint raíz
app.get('/', (req, res) => {
  res.json({ message: 'Backend funcionando correctamente' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true, timestamp: Date.now() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});

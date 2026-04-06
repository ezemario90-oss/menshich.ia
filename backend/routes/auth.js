// backend/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwt';

// Login endpoint con verificación de pago
const prisma = require('../config/prismaClient');
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Busca usuario en base de datos
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  // Verifica estado de pago
  if (user.paymentStatus !== 'active') {
    return res.status(403).json({ error: 'Pago mensual vencido. Acceso bloqueado.' });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
  // Devolver el usuario junto con el token para NextAuth
  return res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      paymentStatus: user.paymentStatus
    }
  });
});

module.exports = router;

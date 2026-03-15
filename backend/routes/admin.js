// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const prisma = require('../config/prismaClient');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwt';

// Middleware de autenticación
function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token requerido' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // Aquí podrías validar roles si los agregas
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

// CRUD Productos
router.get('/admin/products', authenticateAdmin, async (req, res) => {
  const products = await prisma.product.findMany({ include: { variants: true } });
  res.json(products);
});

router.post('/admin/products', authenticateAdmin, async (req, res) => {
  const { name, description, price, imageUrl, variants } = req.body;
  const product = await prisma.product.create({
    data: {
      name, description, price, imageUrl,
      variants: { create: variants || [] }
    },
    include: { variants: true }
  });
  res.json(product);
});

router.put('/admin/products/:id', authenticateAdmin, async (req, res) => {
  const { name, description, price, imageUrl, variants } = req.body;
  const productId = parseInt(req.params.id);
  await prisma.variant.deleteMany({ where: { productId } });
  const product = await prisma.product.update({
    where: { id: productId },
    data: {
      name, description, price, imageUrl,
      variants: { create: variants || [] }
    },
    include: { variants: true }
  });
  res.json(product);
});

router.delete('/admin/products/:id', authenticateAdmin, async (req, res) => {
  const productId = parseInt(req.params.id);
  await prisma.variant.deleteMany({ where: { productId } });
  await prisma.product.delete({ where: { id: productId } });
  res.json({ ok: true });
});

// Configuración de canales
router.get('/admin/settings', authenticateAdmin, async (req, res) => {
  const configs = await prisma.channelConfig.findMany();
  res.json(configs);
});

router.put('/admin/settings', authenticateAdmin, async (req, res) => {
  // Proteger también endpoints de pedidos y usuarios
  router.get('/admin/orders', authenticateAdmin, async (req, res) => {
    const orders = await prisma.order.findMany();
    res.json(orders);
  });

  router.post('/admin/orders', authenticateAdmin, async (req, res) => {
    const { customerEmail, total, status, paymentIntentId, channel } = req.body;
    const order = await prisma.order.create({
      data: { customerEmail, total, status, paymentIntentId, channel },
    });
    res.json(order);
  });

  router.put('/admin/orders/:id', authenticateAdmin, async (req, res) => {
    const orderId = parseInt(req.params.id);
    const { customerEmail, total, status, paymentIntentId, channel } = req.body;
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { customerEmail, total, status, paymentIntentId, channel },
    });
    res.json(order);
  });

  router.delete('/admin/orders/:id', authenticateAdmin, async (req, res) => {
    const orderId = parseInt(req.params.id);
    await prisma.order.delete({ where: { id: orderId } });
    res.json({ ok: true });
  });

  router.get('/admin/users', authenticateAdmin, async (req, res) => {
    const users = [
      { id: 1, nombre: 'Admin', email: 'admin@demo.com' },
      { id: 2, nombre: 'Juan', email: 'juan@demo.com' },
      { id: 3, nombre: 'Ana', email: 'ana@demo.com' }
    ];
    res.json(users);
  });
  const { channelName, config } = req.body;
  const updated = await prisma.channelConfig.upsert({
    where: { channelName },
    update: { config },
    create: { channelName, config }
  });
  res.json(updated);
});

// CRUD Pedidos
router.get('/admin/orders', async (req, res) => {
  const orders = await prisma.order.findMany();
  res.json(orders);
});

router.post('/admin/orders', async (req, res) => {
  const { customerEmail, total, status, paymentIntentId, channel } = req.body;
  const order = await prisma.order.create({
    data: { customerEmail, total, status, paymentIntentId, channel },
  });
  res.json(order);
});

router.put('/admin/orders/:id', async (req, res) => {
  const orderId = parseInt(req.params.id);
  const { customerEmail, total, status, paymentIntentId, channel } = req.body;
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { customerEmail, total, status, paymentIntentId, channel },
  });
  res.json(order);
});

router.delete('/admin/orders/:id', async (req, res) => {
  const orderId = parseInt(req.params.id);
  await prisma.order.delete({ where: { id: orderId } });
  res.json({ ok: true });
});

// CRUD Usuarios (mock)
router.get('/admin/users', async (req, res) => {
  // Ejemplo: usuarios mock, puedes adaptar a modelo real si lo agregas en schema.prisma
  const users = [
    { id: 1, nombre: 'Admin', email: 'admin@demo.com' },
    { id: 2, nombre: 'Juan', email: 'juan@demo.com' },
    { id: 3, nombre: 'Ana', email: 'ana@demo.com' }
  ];
  res.json(users);
});

module.exports = router;

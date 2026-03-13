// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const prisma = require('../config/prismaClient');

// CRUD Productos
router.get('/admin/products', async (req, res) => {
  const products = await prisma.product.findMany({ include: { variants: true } });
  res.json(products);
});

router.post('/admin/products', async (req, res) => {
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

router.put('/admin/products/:id', async (req, res) => {
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

router.delete('/admin/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  await prisma.variant.deleteMany({ where: { productId } });
  await prisma.product.delete({ where: { id: productId } });
  res.json({ ok: true });
});

// Configuración de canales
router.get('/admin/settings', async (req, res) => {
  const configs = await prisma.channelConfig.findMany();
  res.json(configs);
});

router.put('/admin/settings', async (req, res) => {
  const { channelName, config } = req.body;
  const updated = await prisma.channelConfig.upsert({
    where: { channelName },
    update: { config },
    create: { channelName, config }
  });
  res.json(updated);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const prisma = require('../config/prismaClient');

// Endpoint webhook Paddle
router.post('/webhook/paddle', async (req, res) => {
  // Paddle envía datos en req.body
  const { email, subscription_id, event_name } = req.body;

  // Solo activar usuario si el pago fue exitoso
  if (event_name === 'subscription_created' || event_name === 'subscription_payment_succeeded') {
    // Busca usuario por email
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      await prisma.user.update({
        where: { email },
        data: {
          paymentStatus: 'active',
          lastPayment: new Date(),
        },
      });
    }
  }
  res.status(200).send('OK');
});

module.exports = router;

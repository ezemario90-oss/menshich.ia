// backend/services/paymentService.js
require('dotenv').config();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_API_KEY);

async function createCheckoutSession({ amount, currency, successUrl, cancelUrl }) {
  if (!amount) amount = 5000; // predeterminado 50.00 USD
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: currency || 'usd',
          product_data: { name: 'Producto de ejemplo' },
          unit_amount: amount
        },
        quantity: 1
      }
    ],
    payment_method_types: ['card'],
    success_url: successUrl,
    cancel_url: cancelUrl
  });
  return { id: session.id, url: session.url };
}

module.exports = { createCheckoutSession };

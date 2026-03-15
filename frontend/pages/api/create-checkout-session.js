import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
  // Crear sesión de pago Stripe
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'App Multicanal IA',
            description: 'Suscripción mensual. Oferta especial.',
          },
          unit_amount: 3300,
          recurring: { interval: 'month' },
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/landing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/landing?canceled=true`,
  });
  res.status(200).json({ sessionId: session.id });
}

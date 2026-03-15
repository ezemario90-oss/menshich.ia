// Función para enviar mensaje por WhatsApp usando IA
const axios = require('axios');

async function sendWhatsAppReminder(user, daysLeft) {
  // Genera mensaje con IA (OpenAI) según preferencia del usuario
  const prompt = daysLeft === 1
    ? 'Es el último día para abonar el servicio. ¡No pierdas acceso!'
    : `Quedan ${daysLeft} días para vencer tu suscripción. Renueva para seguir disfrutando del servicio.`;
  let aiMessage = prompt;
  // Determina estilos combinados
  let styles = (user.aiStyle || 'amigable').split(',').map(s => s.trim());
  let systemPrompt = '';
  if (styles.includes('amigable')) systemPrompt += 'Eres un asistente amigable. ';
  if (styles.includes('formal')) systemPrompt += 'Eres formal y profesional. ';
  if (styles.includes('comercial')) systemPrompt += 'Enfocado en ventas. ';
  if (styles.includes('breve')) systemPrompt += 'Respondes de forma breve y directa. ';
  if (styles.includes('experto')) systemPrompt += 'Respondes como un experto en el tema. ';
  if (styles.includes('humorístico')) systemPrompt += 'Incluyes humor en tus respuestas. ';
  if (styles.includes('motivador')) systemPrompt += 'Motivas y animas al cliente. ';
  if (styles.includes('educativo')) systemPrompt += 'Explicas de forma educativa. ';
  if (styles.includes('multilingüe')) systemPrompt += 'Puedes responder en varios idiomas si el cliente lo solicita. ';

  // Horarios de atención (ejemplo: 9 a 18)
  const horarioInicio = 9;
  const horarioFin = 18;
  const ahora = new Date();
  const horaActual = ahora.getHours();
  let fueraHorario = horaActual < horarioInicio || horaActual >= horarioFin;
  if (fueraHorario) {
    systemPrompt += 'Estás fuera del horario de atención. Responde avisando que el equipo responderá en horario laboral, pero puedes ayudar con información básica.';
  }
  try {
    const aiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: prompt }],
      max_tokens: 60,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    aiMessage = aiResponse.data.choices[0].message.content;
  } catch (e) {
    // Si falla la IA, usa el prompt básico
  }
  // Envía mensaje por WhatsApp
  await axios.post(`https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_ID}/messages`, {
    messaging_product: 'whatsapp',
    to: user.whatsapp,
    type: 'text',
    text: { body: aiMessage },
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}
// Servicio para avisos de vencimiento de suscripción
const { PrismaClient } = require('../config/prismaClient');
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');

// Configuración de email (adaptar según tu entorno)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER.split('://')[1].split('@')[1].split(':')[0],
  port: parseInt(process.env.EMAIL_SERVER.split(':')[2]),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER.split('://')[1].split(':')[0],
    pass: process.env.EMAIL_SERVER.split(':')[1].split('@')[0],
  },
});

async function sendRenewalReminder(user, daysLeft) {
  const subject = daysLeft === 1
    ? '¡Último día para renovar tu suscripción!'
    : `Quedan ${daysLeft} días para renovar tu suscripción`;
  const text = daysLeft === 1
    ? 'Este es el último día para abonar el servicio. ¡No pierdas acceso!'
    : `Quedan ${daysLeft} días para vencer tu suscripción. Renueva para seguir disfrutando del servicio.`;
  await transporter.sendMail({
    from: 'soporte@tuapp.com',
    to: user.email,
    subject,
    text,
  });
}

// Tarea para revisar usuarios y enviar avisos
async function checkRenewalReminders() {
  const today = new Date();
  const users = await prisma.user.findMany({ where: { paymentStatus: 'active' } });
  for (const user of users) {
    if (!user.lastPayment) continue;
    const expiry = new Date(user.lastPayment);
    expiry.setMonth(expiry.getMonth() + 1); // Asume suscripción mensual
    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    if (diffDays === 4 || diffDays === 1) {
      await sendRenewalReminder(user, diffDays);
      if (user.whatsapp) {
        await sendWhatsAppReminder(user, diffDays);
      }
    }
  }
}

module.exports = {
  checkRenewalReminders,
};
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

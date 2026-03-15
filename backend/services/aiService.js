// backend/services/aiService.js
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateReply(context, userMessage) {
  const systemPrompt = "Eres un asistente de ventas para la empresa 'Mengchig'. Responde siempre de forma respetuosa y profesional. Comienza cada respuesta saludando (por ejemplo: 'Hola, ¿cómo estás? Somos Mengchig, una tienda de ropa'). Presenta brevemente la empresa y adapta la respuesta según la pregunta del usuario, mencionando productos, servicios, stock y tallas si aplica. No pidas datos personales innecesarios. Si no tienes información suficiente, invita a consultar más detalles o visitar nuestra web.";
  const promptUser = `Usuario pregunta: \"${userMessage}\". Contexto: ${context}`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: promptUser }
    ],
    max_tokens: 250,
    temperature: 0.6,
  });

  return res.choices?.[0]?.message?.content?.trim() || "Gracias por tu mensaje. ¿En qué más te puedo ayudar?";
}

module.exports = { generateReply };

// backend/services/aiService.js
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

async function generateReply(context, userMessage) {
  const systemPrompt = "Eres un asistente de ventas para una tienda de ropa. Responde con claridad, da stock y tallas disponibles cuando aplique. No pidas datos personales innecesarios.";
  const promptUser = `Usuario pregunta: \"${userMessage}\". Contexto: ${context}`;

  const res = await openai.createChatCompletion({
    model: 'gpt-4-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: promptUser }
    ],
    max_tokens: 250,
    temperature: 0.6,
  });

  return res.data.choices?.[0]?.message?.content?.trim() || "Gracias por tu mensaje. ¿En qué más te puedo ayudar?";
}

module.exports = { generateReply };

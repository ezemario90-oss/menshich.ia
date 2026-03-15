// backend/prisma/seed.js
const prisma = require('../config/prismaClient');

async function main() {
  // Productos de ejemplo
  const product1 = await prisma.product.create({
    data: {
      name: 'Remera mengsinch',
      description: 'Remera azul con logo mengsinch.ia',
      priceCents: 2499,
      imageUrl: '/logo.svg',
      variants: {
        create: [
          { size: 'S', stock: 10 },
          { size: 'M', stock: 15 },
          { size: 'L', stock: 8 }
        ]
      }
    }
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Zapatillas urbanas',
      description: 'Zapatillas para uso diario',
      priceCents: 4999,
      imageUrl: '',
      variants: {
        create: [
          { size: '40', stock: 5 },
          { size: '42', stock: 7 }
        ]
      }
    }
  });

  // Configuración de canales
    await prisma.channelConfig.upsert({
      where: { channelName: 'WhatsApp' },
      create: { channelName: 'WhatsApp', config: { token: 'WHATSAPP_TOKEN', phoneId: 'WHATSAPP_PHONE_ID' } },
      update: { config: { token: 'WHATSAPP_TOKEN', phoneId: 'WHATSAPP_PHONE_ID' } }
    });

    await prisma.channelConfig.upsert({
      where: { channelName: 'Messenger' },
      create: { channelName: 'Messenger', config: { pageToken: 'FACEBOOK_PAGE_TOKEN' } },
      update: { config: { pageToken: 'FACEBOOK_PAGE_TOKEN' } }
    });

    await prisma.channelConfig.upsert({
      where: { channelName: 'Instagram' },
      create: { channelName: 'Instagram', config: { accessToken: 'INSTAGRAM_ACCESS_TOKEN', userId: 'INSTAGRAM_USER_ID' } },
      update: { config: { accessToken: 'INSTAGRAM_ACCESS_TOKEN', userId: 'INSTAGRAM_USER_ID' } }
    });

  // Pedido de ejemplo
    await prisma.order.create({
      data: {
        totalCents: 7498,
        status: 'pending',
        paymentIntentId: 'stripe_intent_001',
        channel: 'WhatsApp'
      }
    });

  console.log('Seeds cargados exitosamente');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

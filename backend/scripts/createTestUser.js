// Script para crear un usuario de prueba con Prisma
const prisma = require('../config/prismaClient');

async function main() {
  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {
      email: 'admin@demo.com',
      password: 'admin123',
      paymentStatus: 'active',
    },
    create: {
      username: 'admin',
      email: 'admin@demo.com',
      password: 'admin123',
      paymentStatus: 'active',
    },
  });
  console.log('Usuario de prueba creado o actualizado:', user);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});

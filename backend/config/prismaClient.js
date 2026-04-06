const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
	adapter: process.env.DATABASE_URL,
});

module.exports = prisma;

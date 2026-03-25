# Dockerfile para frontend mengsinch.ia (Next.js)
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
# Copiar el esquema de prisma antes de instalar dependencias
COPY prisma ./prisma
RUN npm install
# Copiar el resto del código fuente
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

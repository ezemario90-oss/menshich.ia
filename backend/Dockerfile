# Dockerfile para backend mengsinch.ia
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY prisma ./prisma
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

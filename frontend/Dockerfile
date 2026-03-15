# Dockerfile para frontend mengsinch.ia (Next.js)
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]

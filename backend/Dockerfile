# Dockerfile para backend mengsinch.ia
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Dockerfile optimizado multi-stage para backend mengsinch.ia
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./Dockerfile.bak
COPY prisma ./prisma
RUN npm ci --omit=dev
COPY . .

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]

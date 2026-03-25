
CREATE TABLE "Product" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrl" VARCHAR(255)
);


CREATE TABLE "Variant" (
    "id" SERIAL PRIMARY KEY,
    "productId" INTEGER NOT NULL,
    "size" VARCHAR(50) NOT NULL,
    "stock" INTEGER NOT NULL,
    CONSTRAINT "Variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);


CREATE TABLE "Order" (
    "id" SERIAL PRIMARY KEY,
    "customerEmail" VARCHAR(255) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "paymentIntentId" VARCHAR(255) NOT NULL,
    "channel" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "ChannelConfig" (
    "id" SERIAL PRIMARY KEY,
    "channelName" VARCHAR(100) NOT NULL,
    "config" JSONB NOT NULL
);

-- CreateEnum
CREATE TYPE "AnalyticsEventType" AS ENUM ('STORE_VIEW', 'PRODUCT_VIEW', 'WHATSAPP_CLICK', 'ADD_TO_LIST', 'LIST_WHATSAPP_SENT');

-- CreateTable
CREATE TABLE "analytics_events" (
    "id" TEXT NOT NULL,
    "type" "AnalyticsEventType" NOT NULL,
    "storeId" TEXT NOT NULL,
    "productId" TEXT,
    "sessionId" TEXT NOT NULL,
    "origin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "analytics_events_storeId_type_createdAt_idx" ON "analytics_events"("storeId", "type", "createdAt");

-- CreateIndex
CREATE INDEX "analytics_events_productId_type_createdAt_idx" ON "analytics_events"("productId", "type", "createdAt");

-- CreateIndex
CREATE INDEX "analytics_events_sessionId_type_storeId_createdAt_idx" ON "analytics_events"("sessionId", "type", "storeId", "createdAt");

-- AddForeignKey
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

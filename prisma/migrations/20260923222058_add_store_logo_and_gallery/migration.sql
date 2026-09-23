-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "logoUrl" TEXT;

-- CreateTable
CREATE TABLE "store_gallery_images" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "store_gallery_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "store_gallery_images_storeId_idx" ON "store_gallery_images"("storeId");

-- AddForeignKey
ALTER TABLE "store_gallery_images" ADD CONSTRAINT "store_gallery_images_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - Made the column `cnpj` on table `stores` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "externalUrl" TEXT;

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "mercadoLivreUrl" TEXT,
ADD COLUMN     "shopeeUrl" TEXT,
ADD COLUMN     "tiktokShopUrl" TEXT,
ALTER COLUMN "cnpj" SET NOT NULL;

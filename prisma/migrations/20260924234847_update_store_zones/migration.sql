/*
  Warnings:

  - The values [CENTRO,PROXIMO_SANTUARIO] on the enum `StoreZone` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StoreZone_new" AS ENUM ('GALERIA', 'AV_ITAGUACU', 'PORTO_ITAGUACU', 'SHOPPING', 'LADEIRA', 'RADIO_TV', 'AV_JULIO_PRESTES');
ALTER TABLE "stores" ALTER COLUMN "zone" TYPE "StoreZone_new" USING ("zone"::text::"StoreZone_new");
ALTER TYPE "StoreZone" RENAME TO "StoreZone_old";
ALTER TYPE "StoreZone_new" RENAME TO "StoreZone";
DROP TYPE "public"."StoreZone_old";
COMMIT;

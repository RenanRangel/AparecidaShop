-- CreateEnum
CREATE TYPE "StoreZone" AS ENUM ('CENTRO', 'AV_ITAGUACU', 'PROXIMO_SANTUARIO', 'PORTO_ITAGUACU');

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "zone" "StoreZone";

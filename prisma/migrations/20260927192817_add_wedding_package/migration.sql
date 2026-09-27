-- CreateEnum
CREATE TYPE "Relationship" AS ENUM ('NOIVO', 'NOIVA', 'PAI', 'PADRINHO', 'CONVIDADO', 'OUTRO');

-- CreateEnum
CREATE TYPE "PackageStatus" AS ENUM ('PENDING', 'CONFIRMED');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "relationship" "Relationship",
ADD COLUMN     "weddingPackageId" UUID;

-- CreateTable
CREATE TABLE "WeddingPackage" (
    "id" UUID NOT NULL,
    "contractNumber" TEXT NOT NULL,
    "brideName" TEXT NOT NULL,
    "groomName" TEXT NOT NULL,
    "eventDate" DATE NOT NULL,
    "pickupWindowStart" DATE NOT NULL,
    "pickupWindowEnd" DATE NOT NULL,
    "closingDate" DATE NOT NULL,
    "status" "PackageStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeddingPackage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeddingPackage_contractNumber_key" ON "WeddingPackage"("contractNumber");

-- CreateIndex
CREATE INDEX "WeddingPackage_contractNumber_idx" ON "WeddingPackage"("contractNumber");

-- CreateIndex
CREATE INDEX "Transaction_weddingPackageId_idx" ON "Transaction"("weddingPackageId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_weddingPackageId_fkey" FOREIGN KEY ("weddingPackageId") REFERENCES "WeddingPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The values [STRIPE] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[paymentIntentId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('CARD', 'BANK_TRANSFER');
ALTER TABLE "Payment" ALTER COLUMN "method" TYPE "PaymentMethod_new" USING ("method"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PaymentStatus" ADD VALUE 'AUTHORIZED';
ALTER TYPE "PaymentStatus" ADD VALUE 'REFUNDED';

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "applicationFeeAmount" DOUBLE PRECISION,
ADD COLUMN     "captureMethod" TEXT,
ADD COLUMN     "paymentIntentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_paymentIntentId_key" ON "Payment"("paymentIntentId");

-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'CANCELED';

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "captureMethod" SET DEFAULT 'automatic';

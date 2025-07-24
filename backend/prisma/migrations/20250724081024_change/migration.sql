-- AlterTable
ALTER TABLE "Contract" ALTER COLUMN "completedAt" DROP NOT NULL,
ALTER COLUMN "canceledAt" DROP NOT NULL;

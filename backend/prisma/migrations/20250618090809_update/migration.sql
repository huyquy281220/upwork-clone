/*
  Warnings:

  - You are about to drop the column `fixedPriceMax` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `fixedPriceMin` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `hourlyRate` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "fixedPriceMax",
DROP COLUMN "fixedPriceMin",
DROP COLUMN "hourlyRate",
ADD COLUMN     "fixedPrice" DOUBLE PRECISION,
ADD COLUMN     "hourlyRateMax" DOUBLE PRECISION,
ADD COLUMN     "hourlyRateMin" DOUBLE PRECISION;

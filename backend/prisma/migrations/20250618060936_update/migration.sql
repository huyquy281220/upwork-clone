/*
  Warnings:

  - You are about to drop the column `type` on the `Job` table. All the data in the column will be lost.
  - Added the required column `experienceLevel` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursPerWeek` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobDuration` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobType` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectLength` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "type",
ADD COLUMN     "experienceLevel" TEXT NOT NULL,
ADD COLUMN     "fixedPriceMax" DOUBLE PRECISION,
ADD COLUMN     "fixedPriceMin" DOUBLE PRECISION,
ADD COLUMN     "hourlyRate" DOUBLE PRECISION,
ADD COLUMN     "hoursPerWeek" TEXT NOT NULL,
ADD COLUMN     "jobDuration" TEXT NOT NULL,
ADD COLUMN     "jobType" "JobType" NOT NULL,
ADD COLUMN     "numProposals" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "projectLength" TEXT NOT NULL;

/*
  Warnings:

  - A unique constraint covering the columns `[jobId,freelancerId]` on the table `Proposal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attachment` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricing` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeline` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Made the column `coverLetter` on table `Proposal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN     "attachment" TEXT NOT NULL,
ADD COLUMN     "pricing" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "timeline" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "coverLetter" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_jobId_freelancerId_key" ON "Proposal"("jobId", "freelancerId");

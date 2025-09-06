/*
  Warnings:

  - You are about to drop the column `completedAt` on the `WorkSubmission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Milestone" ADD COLUMN     "completedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "WorkSubmission" DROP COLUMN "completedAt";

/*
  Warnings:

  - You are about to drop the column `feedback` on the `WorkSubmission` table. All the data in the column will be lost.
  - Made the column `fileUrl` on table `WorkSubmission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WorkSubmission" DROP COLUMN "feedback",
ALTER COLUMN "fileUrl" SET NOT NULL;

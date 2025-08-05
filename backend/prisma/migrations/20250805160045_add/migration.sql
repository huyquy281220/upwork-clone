/*
  Warnings:

  - Added the required column `fileKey` to the `WorkSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `WorkSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileSize` to the `WorkSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkSubmission" ADD COLUMN     "fileKey" TEXT NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "fileSize" INTEGER NOT NULL;

/*
  Warnings:

  - Added the required column `workLogId` to the `WorkSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkSubmission" ADD COLUMN     "workLogId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkSubmission" ADD CONSTRAINT "WorkSubmission_workLogId_fkey" FOREIGN KEY ("workLogId") REFERENCES "WorkLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

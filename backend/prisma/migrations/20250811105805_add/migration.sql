-- DropForeignKey
ALTER TABLE "WorkSubmission" DROP CONSTRAINT "WorkSubmission_workLogId_fkey";

-- AddForeignKey
ALTER TABLE "WorkSubmission" ADD CONSTRAINT "WorkSubmission_workLogId_fkey" FOREIGN KEY ("workLogId") REFERENCES "WorkLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

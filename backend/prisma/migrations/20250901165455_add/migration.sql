-- AlterTable
ALTER TABLE "WorkSubmission" ADD COLUMN     "milestoneId" TEXT,
ALTER COLUMN "workLogId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkSubmission" ADD CONSTRAINT "WorkSubmission_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "Milestone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

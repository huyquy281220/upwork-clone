/*
  Warnings:

  - Added the required column `freelancerId` to the `WorkLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkLog" ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "freelancerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkLog" ADD CONSTRAINT "WorkLog_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "FreelancerProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

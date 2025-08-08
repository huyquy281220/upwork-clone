-- DropForeignKey
ALTER TABLE "WorkLog" DROP CONSTRAINT "WorkLog_freelancerId_fkey";

-- AddForeignKey
ALTER TABLE "WorkLog" ADD CONSTRAINT "WorkLog_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "FreelancerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

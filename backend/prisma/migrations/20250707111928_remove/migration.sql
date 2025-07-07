/*
  Warnings:

  - A unique constraint covering the columns `[jobId,freelancerId,clientId]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Contract_jobId_freelancerId_clientId_milestoneId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Contract_jobId_freelancerId_clientId_key" ON "Contract"("jobId", "freelancerId", "clientId");

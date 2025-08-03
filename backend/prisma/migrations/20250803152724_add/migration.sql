/*
  Warnings:

  - You are about to drop the column `workLogId` on the `WorkSubmission` table. All the data in the column will be lost.
  - Added the required column `contractId` to the `WorkSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkSubmission" DROP CONSTRAINT "WorkSubmission_workLogId_fkey";

-- AlterTable
ALTER TABLE "WorkSubmission" DROP COLUMN "workLogId",
ADD COLUMN     "contractId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkSubmission" ADD CONSTRAINT "WorkSubmission_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

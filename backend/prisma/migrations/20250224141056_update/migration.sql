/*
  Warnings:

  - You are about to drop the column `client_id` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `freelancer_id` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `job_id` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `freelancerId` on the `FreelancerLanguage` table. All the data in the column will be lost.
  - You are about to drop the column `freelancerId` on the `FreelancerSkill` table. All the data in the column will be lost.
  - You are about to drop the column `freelancerId` on the `LinkedAccount` table. All the data in the column will be lost.
  - You are about to drop the column `contract_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Payment` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to drop the column `bid_amount` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `cover_letter` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `freelancer_id` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `job_id` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `job_id` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `reviewer_id` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `freelancerId` on the `Verification` table. All the data in the column will be lost.
  - You are about to drop the column `freelancerId` on the `WorkHistory` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Freelancer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientId` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `freelancerId` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Contract` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userId` to the `FreelancerLanguage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `FreelancerSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `LinkedAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bidAmount` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverLetter` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobId` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `revieweeId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewerId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Verification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `WorkHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_client_id_fkey";

-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_freelancer_id_fkey";

-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_job_id_fkey";

-- DropForeignKey
ALTER TABLE "Freelancer" DROP CONSTRAINT "Freelancer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "FreelancerLanguage" DROP CONSTRAINT "FreelancerLanguage_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "FreelancerSkill" DROP CONSTRAINT "FreelancerSkill_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "LinkedAccount" DROP CONSTRAINT "LinkedAccount_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_contract_id_fkey";

-- DropForeignKey
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_freelancer_id_fkey";

-- DropForeignKey
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_job_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_job_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_reviewer_id_fkey";

-- DropForeignKey
ALTER TABLE "Verification" DROP CONSTRAINT "Verification_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "WorkHistory" DROP CONSTRAINT "WorkHistory_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_id_fkey";

-- DropIndex
DROP INDEX "Contract_job_id_key";

-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "client_id",
DROP COLUMN "created_at",
DROP COLUMN "freelancer_id",
DROP COLUMN "job_id",
DROP COLUMN "updated_at",
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "freelancerId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FreelancerLanguage" DROP COLUMN "freelancerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FreelancerSkill" DROP COLUMN "freelancerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LinkedAccount" DROP COLUMN "freelancerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "contract_id",
DROP COLUMN "created_at",
ADD COLUMN     "contractId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "bid_amount",
DROP COLUMN "cover_letter",
DROP COLUMN "created_at",
DROP COLUMN "freelancer_id",
DROP COLUMN "job_id",
DROP COLUMN "updated_at",
ADD COLUMN     "bidAmount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "coverLetter" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "jobId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "created_at",
DROP COLUMN "job_id",
DROP COLUMN "reviewer_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "revieweeId" TEXT NOT NULL,
ADD COLUMN     "reviewerId" TEXT NOT NULL,
ALTER COLUMN "rating" DROP DEFAULT,
ALTER COLUMN "comment" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyName" TEXT DEFAULT '',
ADD COLUMN     "companyWebsite" TEXT DEFAULT '',
ADD COLUMN     "completedJobs" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "education" TEXT,
ADD COLUMN     "hourlyRate" DECIMAL(65,30) DEFAULT 0.0,
ADD COLUMN     "hoursPerWeek" TEXT,
ADD COLUMN     "inProgressJobs" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "openToContract" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "responseTime" TEXT,
ADD COLUMN     "role" "Role" NOT NULL,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "totalEarnings" DECIMAL(65,30) DEFAULT 0.0,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "avatarUrl" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Verification" DROP COLUMN "freelancerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkHistory" DROP COLUMN "freelancerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Freelancer";

-- DropTable
DROP TABLE "jobs";

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "budget" DECIMAL(65,30) NOT NULL,
    "status" "JobStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FreelancerSkill" ADD CONSTRAINT "FreelancerSkill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreelancerLanguage" ADD CONSTRAINT "FreelancerLanguage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkedAccount" ADD CONSTRAINT "LinkedAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkHistory" ADD CONSTRAINT "WorkHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_revieweeId_fkey" FOREIGN KEY ("revieweeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

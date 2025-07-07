/*
  Warnings:

  - A unique constraint covering the columns `[jobId,freelancerId,clientId,milestoneId]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `canceledAt` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractType` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hourlyRate` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `milestoneId` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Made the column `completedAt` on table `Contract` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('FIXED_PRICE', 'HOURLY');

-- CreateEnum
CREATE TYPE "MilestoneStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'SUBMITTED', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "canceledAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "contractType" "ContractType" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "hourlyRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "milestoneId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "completedAt" SET NOT NULL;

-- CreateTable
CREATE TABLE "Milestone" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3),
    "status" "MilestoneStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contract_jobId_freelancerId_clientId_milestoneId_key" ON "Contract"("jobId", "freelancerId", "clientId", "milestoneId");

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The `available` column on the `FreelancerProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('MORE_THAN_30', 'LESS_THAN_30', 'AS_NEEDED', 'NONE');

-- CreateEnum
CREATE TYPE "LanguageLevel" AS ENUM ('BASIC', 'CONVERSATIONAL', 'FLUENT', 'NATIVE');

-- AlterTable
ALTER TABLE "FreelancerProfile" ADD COLUMN     "overview" TEXT,
DROP COLUMN "available",
ADD COLUMN     "available" "Availability" NOT NULL DEFAULT 'LESS_THAN_30';

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "startYear" INTEGER,
    "endYear" INTEGER,
    "degree" TEXT,
    "areaOfStudy" TEXT,
    "description" TEXT,
    "freelancerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" "LanguageLevel" NOT NULL,
    "freelancerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "FreelancerProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "FreelancerProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

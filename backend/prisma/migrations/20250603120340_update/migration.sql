/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `FreelancerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `FreelancerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `FreelancerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `FreelancerProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FreelancerProfile" DROP COLUMN "avatarUrl",
DROP COLUMN "bio",
DROP COLUMN "country",
DROP COLUMN "language";

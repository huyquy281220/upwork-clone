/*
  Warnings:

  - You are about to drop the column `location` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "location";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT;

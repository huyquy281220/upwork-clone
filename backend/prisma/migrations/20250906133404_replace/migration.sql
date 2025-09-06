/*
  Warnings:

  - You are about to drop the column `comment` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "comment",
ADD COLUMN     "feedback" TEXT;

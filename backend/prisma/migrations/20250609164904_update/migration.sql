/*
  Warnings:

  - You are about to drop the column `level` on the `Language` table. All the data in the column will be lost.
  - Added the required column `proficiency` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LanguageProficiency" AS ENUM ('BASIC', 'CONVERSATIONAL', 'FLUENT', 'NATIVE');

-- AlterTable
ALTER TABLE "Language" DROP COLUMN "level",
ADD COLUMN     "proficiency" "LanguageProficiency" NOT NULL;

-- DropEnum
DROP TYPE "LanguageLevel";

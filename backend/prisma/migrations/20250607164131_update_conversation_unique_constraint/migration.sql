/*
  Warnings:

  - A unique constraint covering the columns `[jobId,participant1Id,participant2Id]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Conversation_participant1Id_participant2Id_key";

-- CreateIndex
CREATE INDEX "Conversation_participant1Id_idx" ON "Conversation"("participant1Id");

-- CreateIndex
CREATE INDEX "Conversation_participant2Id_idx" ON "Conversation"("participant2Id");

-- CreateIndex
CREATE INDEX "Conversation_jobId_idx" ON "Conversation"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_jobId_participant1Id_participant2Id_key" ON "Conversation"("jobId", "participant1Id", "participant2Id");

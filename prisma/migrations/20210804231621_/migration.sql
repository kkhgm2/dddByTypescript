/*
  Warnings:

  - You are about to drop the `TeamUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeamUsers" DROP CONSTRAINT "TeamUsers_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamUsers" DROP CONSTRAINT "TeamUsers_userId_fkey";

-- DropTable
DROP TABLE "TeamUsers";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMembers" (
    "memberId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("teamId","memberId")
);

-- AddForeignKey
ALTER TABLE "TeamMembers" ADD FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMembers" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

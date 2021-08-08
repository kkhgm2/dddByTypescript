/*
  Warnings:

  - Added the required column `mailAddress` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zaisekiStatus` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "mailAddress" TEXT NOT NULL,
ADD COLUMN     "zaisekiStatus" TEXT NOT NULL;

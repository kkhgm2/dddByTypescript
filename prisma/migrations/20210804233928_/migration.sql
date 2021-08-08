/*
  Warnings:

  - You are about to drop the column `mailAddress` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `zaisekiStatus` on the `Team` table. All the data in the column will be lost.
  - Added the required column `mailAddress` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zaisekiStatus` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "mailAddress" TEXT NOT NULL,
ADD COLUMN     "zaisekiStatus" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "mailAddress",
DROP COLUMN "zaisekiStatus";

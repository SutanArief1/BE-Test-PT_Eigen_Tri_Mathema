/*
  Warnings:

  - You are about to drop the column `isPenalized` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Borrow" ALTER COLUMN "borrowDate" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "isPenalized";

-- AlterTable
ALTER TABLE "Penalty" ALTER COLUMN "penaltyStartDate" SET DATA TYPE TIMESTAMPTZ(6);

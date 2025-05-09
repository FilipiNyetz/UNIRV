/*
  Warnings:

  - Changed the type of `batchId` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "batchId",
ADD COLUMN     "batchId" INTEGER NOT NULL;

/*
  Warnings:

  - The values [PENDIND] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `eventDate` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `eventDescription` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `eventImage` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `eventLink` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `eventLocation` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `eventName` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED');
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_batchId_fkey";

-- AlterTable
ALTER TABLE "Batch" ADD COLUMN     "eventId" TEXT;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "eventDate",
DROP COLUMN "eventDescription",
DROP COLUMN "eventImage",
DROP COLUMN "eventLink",
DROP COLUMN "eventLocation",
DROP COLUMN "eventName",
ALTER COLUMN "batchId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "description" TEXT,
    "image" TEXT,
    "link" TEXT,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

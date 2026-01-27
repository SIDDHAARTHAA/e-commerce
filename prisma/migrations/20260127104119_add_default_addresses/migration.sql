/*
  Warnings:

  - A unique constraint covering the columns `[defaultShippingAddressId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "defaultShippingAddressId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "users_defaultShippingAddressId_key" ON "users"("defaultShippingAddressId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_defaultShippingAddressId_fkey" FOREIGN KEY ("defaultShippingAddressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

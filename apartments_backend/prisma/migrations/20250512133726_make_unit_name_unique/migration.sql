/*
  Warnings:

  - A unique constraint covering the columns `[unitNumber]` on the table `Apartment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Apartment_unitNumber_key" ON "Apartment"("unitNumber");

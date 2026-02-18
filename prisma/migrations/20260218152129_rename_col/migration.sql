/*
  Warnings:

  - You are about to drop the column `user_name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `user_surname` on the `Users` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Users` DROP COLUMN `user_name`,
    DROP COLUMN `user_surname`,
    ADD COLUMN `fullname` VARCHAR(191) NOT NULL,
    ADD COLUMN `surname` VARCHAR(191) NOT NULL;

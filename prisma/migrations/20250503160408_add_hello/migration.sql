/*
  Warnings:

  - Added the required column `hello` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` ADD COLUMN `hello` VARCHAR(30) NOT NULL;

/*
  Warnings:

  - You are about to alter the column `user_id` on the `review` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `user_favor_category` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_favor_category` DROP FOREIGN KEY `user_favor_category_user_id_fkey`;

-- DropIndex
DROP INDEX `review_user_id_fkey` ON `review`;

-- AlterTable
ALTER TABLE `review` MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user_favor_category` MODIFY `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `user_favor_category` ADD CONSTRAINT `user_favor_category_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

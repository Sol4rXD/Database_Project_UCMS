-- DropForeignKey
ALTER TABLE `Club_Apply` DROP FOREIGN KEY `Club_Apply_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Clubs` DROP FOREIGN KEY `User_Clubs_user_id_fkey`;

-- DropIndex
DROP INDEX `Club_Apply_user_id_fkey` ON `Club_Apply`;

-- DropIndex
DROP INDEX `User_Clubs_user_id_fkey` ON `User_Clubs`;

-- AddForeignKey
ALTER TABLE `Club_Apply` ADD CONSTRAINT `Club_Apply_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Clubs` ADD CONSTRAINT `User_Clubs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateAllTables1600697985382
  implements MigrationInterface {
  name = 'CreateAllTables1600697985382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `products` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `cost` float NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `requests` (`id` varchar(36) NOT NULL, `itemsList` text NOT NULL, `isCreditCard` tinyint NOT NULL, `addressDelivery` varchar(255) NOT NULL, `total` float NOT NULL, `status` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `users` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `shopping_cart` (`id` varchar(36) NOT NULL, `userId` varchar(255) NOT NULL, UNIQUE INDEX `REL_bee83828c1e181ac7ba97267ca` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `shopping_cart_products` (`id` int NOT NULL AUTO_INCREMENT, `amount` int NOT NULL, `productsId` int NULL, `shoppingCartId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `shopping_cart` ADD CONSTRAINT `FK_bee83828c1e181ac7ba97267ca2` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `shopping_cart_products` ADD CONSTRAINT `FK_3deab350f52f1b37999f254ad65` FOREIGN KEY (`productsId`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `shopping_cart_products` ADD CONSTRAINT `FK_d9480c8077e2852b23cde296b3b` FOREIGN KEY (`shoppingCartId`) REFERENCES `shopping_cart`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `shopping_cart_products` DROP FOREIGN KEY `FK_d9480c8077e2852b23cde296b3b`',
    );
    await queryRunner.query(
      'ALTER TABLE `shopping_cart_products` DROP FOREIGN KEY `FK_3deab350f52f1b37999f254ad65`',
    );
    await queryRunner.query(
      'ALTER TABLE `shopping_cart` DROP FOREIGN KEY `FK_bee83828c1e181ac7ba97267ca2`',
    );
    await queryRunner.query('DROP TABLE `shopping_cart_products`');
    await queryRunner.query(
      'DROP INDEX `REL_bee83828c1e181ac7ba97267ca` ON `shopping_cart`',
    );
    await queryRunner.query('DROP TABLE `shopping_cart`');
    await queryRunner.query('DROP TABLE `users`');
    await queryRunner.query('DROP TABLE `requests`');
    await queryRunner.query('DROP TABLE `products`');
  }
}

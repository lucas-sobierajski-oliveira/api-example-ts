import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableProductShoppingCart1600281737325
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_shopping_cart',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_user',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'id_shopping_cart',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'product_shopping_cart',
      new TableForeignKey({
        columnNames: ['id_user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );

    await queryRunner.createForeignKey(
      'product_shopping_cart',
      new TableForeignKey({
        columnNames: ['id_shopping_cart'],
        referencedColumnNames: ['id'],
        referencedTableName: 'shopping_cart',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_shopping_cart');
  }
}

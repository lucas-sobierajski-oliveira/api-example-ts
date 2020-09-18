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
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'id_product',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'id_shopping_cart',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'product_shopping_cart',
      new TableForeignKey({
        columnNames: ['id_product'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
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

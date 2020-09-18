import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableShoppingCart1600280922355
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shopping_cart',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'id_user',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'shopping_cart',
      new TableForeignKey({
        columnNames: ['id_user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shopping_cart');
  }
}

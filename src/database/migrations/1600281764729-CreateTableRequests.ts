import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableRequests1600281764729 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'requests',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'items_list',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'credit_cart',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'delivery_address',
            type: 'string',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'total',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('requests');
  }
}

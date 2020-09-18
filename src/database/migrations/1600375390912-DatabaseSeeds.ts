import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

import { productsSeeds, usersSeed } from '../dataseeds/database.seeds';

export class DatabaseSeeds1600375390912 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    await getRepository('users').save(usersSeed);

    await getRepository('products').save(productsSeeds);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(_: QueryRunner): Promise<void> {}
}

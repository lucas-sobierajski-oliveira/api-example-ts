import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

import { productsSeeds, usersSeed } from '../dataseeds/database.seeds';

export default class InsertSeeds1600698138544 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    await getRepository('products').save(productsSeeds);
    const users = await getRepository('users').save(usersSeed);

    await getRepository('shopping_cart').save({ user: users[0] });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(_: QueryRunner): Promise<void> {}
}

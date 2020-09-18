import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_shopping_cart')
export class ProductShoppingCart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_product: number;

  @Column()
  id_shopping_cart: string;

  @Column()
  amount: number;
}

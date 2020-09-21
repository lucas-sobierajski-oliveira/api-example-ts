import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import Products from './Products';
import ShoppingCart from './ShoppingCart';

@Entity('shopping_cart_products')
class ShoppingCartProducts {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Products, { eager: true })
  @JoinColumn()
  products: Products;

  @ManyToOne(() => ShoppingCart, { eager: true })
  @JoinColumn()
  shoppingCart: ShoppingCart;

  @Column('int')
  amount: number;
}

export default ShoppingCartProducts;

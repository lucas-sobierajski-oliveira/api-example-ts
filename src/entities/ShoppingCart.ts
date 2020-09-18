import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Products from './Products';

@Entity()
class ShoppingCart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_user: string;

  @ManyToMany(_ => Products)
  @JoinTable()
  products: Products[];
}

export default ShoppingCart;

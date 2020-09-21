import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import Users from './Users';

@Entity('shopping_cart')
class ShoppingCart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @OneToOne(() => Users)
  @JoinColumn()
  user: Users;
}

export default ShoppingCart;

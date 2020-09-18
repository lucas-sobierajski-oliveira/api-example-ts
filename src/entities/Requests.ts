import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('requests')
export class Requests {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  items_list: string;

  @Column()
  creadit_cart: boolean;

  @Column()
  address_delivery: string;

  @Column()
  total: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;
}

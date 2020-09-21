import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('requests')
class Requests {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  itemsList: string;

  @Column('bool')
  isCreditCard: boolean;

  @Column('varchar', { nullable: false })
  addressDelivery: string;

  @Column('float')
  total: number;

  @Column('varchar')
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}

export default Requests;

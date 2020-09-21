import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
class Products {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('float', { nullable: false })
  cost: number;

  @Column('boolean', { default: true })
  isActive: boolean;
}

export default Products;

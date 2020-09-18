import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
class Products {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column('float')
  cost: number;

  @Column('boolean')
  is_active: boolean;
}

export default Products;

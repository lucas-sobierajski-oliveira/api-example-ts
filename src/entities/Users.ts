import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  password: string;
}

export default Users;

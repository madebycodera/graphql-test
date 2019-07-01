import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({
    length: 255,
    select: false,
  })
  password: string;
}

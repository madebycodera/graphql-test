import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import UserEntity from '../user/user.entity';

@Entity()
export default class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  description: string;
  @CreateDateColumn()
  createdAt: Date;
  @Column({ type: 'boolean', default: false })
  completed: boolean;
  @Column({ type: 'smallint', default: 1 })
  priority: number;

  @ManyToOne(() => UserEntity, {
    nullable: false,
    lazy: true,
  })
  user: Promise<UserEntity> | UserEntity;
}

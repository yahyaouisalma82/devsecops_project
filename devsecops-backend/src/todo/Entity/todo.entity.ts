import { TodoStatusEnum } from '../enums/todo-status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TiemstampEntity } from '../../generics/timestamp.entity';
import { User } from 'src/entities/user';

@Entity('todo')
export class TodoEntity extends TiemstampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({})
  name: string;
  @Column({})
  description: string;

  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  status: TodoStatusEnum = TodoStatusEnum.waiting;
  @ManyToOne(() => User, (user) => user.todos, {})
  user: User;
}


import { TodoEntity } from 'src/todo/Entity/todo.entity';
import {Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';

@Entity({ name: 'users' })
export class User {

  /** The id user. */
  @PrimaryColumn('uuid')
  id: string;

  /** The nom. */
  @Column()
  nom:string ;

  /** The prenom. */
  @Column()
  prenom:string ;

  /** The email. */
  @Column()
  email:string;

  /** The login. */
  @Column()
  login:string;

  /** The password. */
  @Column()
  password:string;

  /** The roles. */
  @Column()
  roles:string;
  
  @OneToMany(() => TodoEntity, todo => todo.user)
  todos: TodoEntity[];
}
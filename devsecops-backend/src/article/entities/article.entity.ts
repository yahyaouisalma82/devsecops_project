import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'articles'})
export class Article {
    /** The id book. */

  @PrimaryGeneratedColumn('increment')
  id: number;

  /** The title. */
  @Column()
  title:string ;

  /** Author */
  @Column()
  author:string ;

  /** text */
  @Column()
  text:string ;

}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export default class Todo {
  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field()
  @Column({ type: "varchar", length: 255 })
  description: string;

  @Field()
  @Column({ type: "boolean", default: false })
  completed: boolean;

  @Field()
  @Column({ type: "smallint", default: 1 })
  priority: number;

  @Field()
  @Column()
  createdAt: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";

@ObjectType({ description: "Todos resource" })
@Entity()
export default class Todo {
  @Field(() => ID, {
    description:
      "Represents task's id as UUID, e.g `39e02732-914f-4a5e-be14-656495c0e310`"
  })
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field({
    description:
      "Represents task descripton as a string. Maximum length is 255 characters"
  })
  @Column({ type: "varchar", length: 255 })
  description: string;

  @Field({
    description: "Represents task completeness. Default value is false"
  })
  @Column({ type: "boolean", default: false })
  completed: boolean;

  @Field(() => Int, {
    description:
      "Represents priority of the task. The minimum and default value is 1"
  })
  @Column({ type: "smallint", default: 1 })
  priority: number;

  @Field({
    description:
      "DateTime string, represented as ISO 8601, e.g 2019-07-15T05:18:34.129Z"
  })
  @CreateDateColumn()
  createdAt: Date;
}

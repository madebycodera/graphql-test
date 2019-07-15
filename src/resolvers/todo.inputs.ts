import {
  InputType,
  Field,
  ID,
  Int,
  registerEnumType,
  ArgsType,
  ObjectType
} from "type-graphql";
import {
  FindConditions,
  OrderByCondition,
  FindOperatorsOrdered,
  FindOneOptions,
  FindManyOptions
} from "typeorm";
import { IsString, IsOptional, IsInt, Min, IsIn } from "class-validator";
import Todo from "../entity/todo.entity";

@InputType()
export class DeleteTodoInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class CompleteTodoInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class UpdateTodoInput implements Partial<Todo> {
  @Field(() => ID)
  id: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Field(() => Int, { nullable: true })
  priority?: number;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class CreateTodoInput implements Partial<Todo> {
  @IsString()
  @Field()
  description: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Field({ nullable: true })
  priority?: number;
}

@InputType()
export class MarkIncompleteInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class GetTodosInput {
  @IsString()
  @IsIn(["ASC", "DESC"])
  @IsOptional()
  @Field({ nullable: true, description: "Must be ASC or DESC" })
  priority?: string;
  @IsString()
  @IsIn(["ASC", "DESC"])
  @IsOptional()
  @Field({ nullable: true, description: "Must be ASC or DESC" })
  description?: string;
}

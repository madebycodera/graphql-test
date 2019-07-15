import {
  Resolver,
  Query,
  InputType,
  Field,
  ID,
  Mutation,
  Arg
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import Todo from "../entity/todo.entity";
import { Repository } from "typeorm";
import { Min } from "class-validator";

@InputType()
class DeleteTodoInput {
  @Field(type => ID)
  id: string;
}

@InputType()
class CompleteTodoInput {
  @Field(type => ID)
  id: string;
}

@InputType()
class UpdateTodoInput {
  @Field(type => ID)
  id: string;
  @Min(1)
  @Field()
  priority: number;
  @Field()
  description: string;
}

@Resolver(of => Todo)
export default class TodoResolver {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>
  ) {}
  @Query(() => [Todo])
  todos() {
    return this.todoRepository.find({ where: {} });
  }
  @Mutation(() => Todo)
  updateTodo(@Arg("inout") input: UpdateTodoInput) {
    return this.todoRepository.update(input.id, {
      description: input.description,
      priority: input.priority
    });
  }
  @Mutation(() => Todo)
  completeTodo(
    @Arg("input")
    input: CompleteTodoInput
  ) {
    return this.todoRepository.update(input.id, {
      completed: true
    });
  }
  @Mutation()
  deleteTodo(
    @Arg("input")
    input: DeleteTodoInput
  ) {
    return this.todoRepository.delete(input.id);
  }
}

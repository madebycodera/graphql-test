import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Repository, FindManyOptions } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import Todo from "../entity/todo.entity";
import {
  UpdateTodoInput,
  CreateTodoInput,
  CompleteTodoInput,
  MarkIncompleteInput,
  DeleteTodoInput,
  GetTodosInput
} from "./todo.inputs";

@Resolver(Todo)
export default class TodoResolver {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>
  ) {
    this.todoRepository = todoRepository;
  }

  @Mutation(() => Todo, {
    description:
      "Creates new Todo instance, where description & priority are required as input"
  })
  createTodo(@Arg("input") input: CreateTodoInput) {
    return this.todoRepository.save({
      description: input.description,
      priority: input.priority
    });
  }

  @Mutation(() => Todo, {
    description:
      "Updates Todo instance by ID with following parameters: priority, description."
  })
  async updateTodo(@Arg("input") input: UpdateTodoInput) {
    const { id, ...otherInputs } = input;
    if (Object.keys(otherInputs).length > 0) {
      await this.todoRepository.update(id, otherInputs);
    }
    return this.todoRepository.findOne(id);
  }

  @Mutation(() => Todo, {
    description: "Updates Todo instance by ID with with completed:true"
  })
  async completeTodo(
    @Arg("input")
    input: CompleteTodoInput
  ) {
    await this.todoRepository.update(input.id, {
      completed: true
    });
    return this.todoRepository.findOne(input.id);
  }

  @Mutation(() => Todo, {
    description: "Updates Todo instance by ID with with completed:false"
  })
  async markIncomplete(@Arg("input") input: MarkIncompleteInput) {
    await this.todoRepository.update(input.id, {
      completed: false
    });
    return this.todoRepository.findOne(input.id);
  }

  @Mutation(() => Boolean, {
    description:
      "Deletes Todo instance by ID. Returns boolean to make sure that's instance is deleted "
  })
  async deleteTodo(
    @Arg("input")
    input: DeleteTodoInput
  ) {
    try {
      const result = await this.todoRepository.delete(input.id);
      if (result.affected > 0) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  @Query(() => [Todo], {
    description:
      "Returns full list of todos in Database. Might be sorted by description or priority"
  })
  todos(@Arg("input", { nullable: true }) input: GetTodosInput) {
    return this.todoRepository.find({
      order: {
        description: input && input.description,
        priority: input && input.priority
      }
    } as FindManyOptions<Todo>);
  }
}

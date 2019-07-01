import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import TodoDto from './todo.dto';
import { TodoService } from './todo.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import UserEntity from '../user/user.entity';

@Resolver('Todo')
export default class TodoResolvers {

  constructor(private readonly todoService: TodoService) {
  }

  @UseGuards(GqlAuthGuard)
  @Query('listTodos')
  listTodos(@Context() { req: { user } }: { req: { user: UserEntity } }) {
    return this.todoService.listTodosForUser(user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createTodo')
  createTodo(@Args('input') input: TodoDto, @Context() { req: { user } }: { req: { user: UserEntity } }) {
    return this.todoService.createTodo(input, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('updateTodo')
  updateTodo(@Args('id') id: string, @Args('input') input: TodoDto) {
    return this.todoService.updateTodo(id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('completeTodo')
  completeTodo(@Args('id') id: string) {
    return this.todoService.completeTodo(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('markIncompleteTodo')
  markIncompleteTodo(@Args('id') id: string) {
    return this.todoService.markIncompleteTodo(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('deleteTodo')
  deleteTodo(@Args('id') id: string) {
    return this.todoService.deleteTodo(id);
  }

}

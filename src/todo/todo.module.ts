import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TodoEntity from './todo.entity';
import TodoResolvers from './todo.resolvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity]),
  ],
  providers: [TodoService, TodoResolvers],
})

export class TodoModule {
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import TodoDto from './todo.dto';
import TodoEntity from './todo.entity';
import UserEntity from '../user/user.entity';

@Injectable()
export class TodoService {

  constructor(@InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>) {
  }

  listTodosForUser(user: UserEntity) {
    return this.todoRepository.find({ user });
  }

  createTodo(data: TodoDto, user: UserEntity) {
    const newTodo = this.todoRepository.create({ ...data, user });
    return this.todoRepository.save(newTodo);
  }

  async updateTodo(id: string, data: TodoDto) {
    await this.todoRepository.update({ id }, { ...data });
    return this.todoRepository.findOneOrFail(id);
  }

  async completeTodo(id: string) {
    await this.todoRepository.update(id, { completed: true });
    return this.todoRepository.findOneOrFail(id);
  }

  async markIncompleteTodo(id: string) {
    await this.todoRepository.update(id, { completed: false });
    return this.todoRepository.findOneOrFail(id);
  }

  deleteTodo(id: string) {
    return this.todoRepository.delete(id);
  }

}

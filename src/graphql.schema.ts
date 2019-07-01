/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class InputCreateUser {
  name: string;
  password: string;
}

export class InputLoginUser {
  name: string;
  password: string;
}

export class InputTodo {
  description: string;
  priority?: number;
}

export class LoginData {
  token?: string;
}

export abstract class IMutation {
  abstract createTodo(input: InputTodo): Todo | Promise<Todo>;

  abstract updateTodo(id: string, input: InputTodo): Todo | Promise<Todo>;

  abstract completeTodo(id: string): Todo | Promise<Todo>;

  abstract markIncompleteTodo(id: string): Todo | Promise<Todo>;

  abstract deleteTodo(id: string): boolean | Promise<boolean>;

  abstract createUser(input?: InputCreateUser): User | Promise<User>;

  abstract login(input?: InputLoginUser): LoginData | Promise<LoginData>;
}

export abstract class IQuery {
  abstract listTodos(): Todo[] | Promise<Todo[]>;

  abstract me(): User | Promise<User>;
}

export class Todo {
  id: string;
  description: string;
  createdAt: DateTime;
  completed: boolean;
  priority: number;
}

export class User {
  id: string;
  name: string;
}

export type DateTime = any;

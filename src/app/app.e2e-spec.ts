import { INestApplication } from '@nestjs/common';
import UserEntity from '../user/user.entity';
import TodoEntity from '../todo/todo.entity';
import { AppModule } from './app.module';
import { Test } from '@nestjs/testing';
import { TodoService } from '../todo/todo.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import request from 'supertest';
import moment = require('moment');

jest.setTimeout(10000);

describe('Test task end to end tests', () => {

  let app: INestApplication;
  let authorization: string;
  let user: UserEntity;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();

    app = module.createNestApplication();
    await app.init();
  });


  describe('Todos tests', () => {

    let todoItem: TodoEntity;

    beforeEach(async (done: () => void) => {
      const todoService = app.get(TodoService);
      todoItem = await todoService.createTodo({
        description: 'test',
        priority: 10,
      }, user);
      done();
    });

    beforeAll(async () => {
      const userService = app.get(UserService);
      const userCredentials = {
        name: 'test',
        password: 'test',
      };
      user = await userService.createUser(userCredentials);

      const authService = app.get(AuthService);
      const { token } = await authService.signIn(userCredentials);
      authorization = token;
    });


    it(`List todos`, async () => {

      const result = await request(app.getHttpServer())
        .post('/graphql')
        .set({ authorization })
        .send({
          operationName: null,
          variables: {},
          query: '{\n  listTodos {\n    id\n    description\n    createdAt\n    completed\n    priority\n  }\n}\n',
        })
        .expect(200).expect({
          'data': {
            'listTodos': [
              {
                'id': todoItem.id,
                'description': todoItem.description,
                'createdAt': moment(todoItem.createdAt).toISOString(),
                'completed': todoItem.completed,
                'priority': todoItem.priority,
              },
            ],
          },
        });

    });

    it(`Create todo`, async () => {
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .set({ authorization })
        .send({
          operationName: null,
          variables: {},
          query: 'mutation {\n  createTodo(input: {description: "test-new"}) {\n    id\n    createdAt\n    completed\n    description\n  }\n}\n',
        })
        .expect(200);

      expect(res.body.data.createTodo.description).toBe('test-new');
    });

    it(`Update todo`, () => {

      return request(app.getHttpServer())
        .post('/graphql')
        .set({ authorization })
        .send({
          operationName: null,
          variables: {},
          query: `mutation {\n  updateTodo(id: "${todoItem.id}", input: {description: "test-update", priority: 90}) {\n    id\n    description\n    createdAt\n    completed\n    priority\n  }\n}\n`,
        })
        .expect(200).expect({
          'data': {
            'updateTodo':
              {
                'id': todoItem.id,
                'description': 'test-update',
                'createdAt': moment(todoItem.createdAt).toISOString(),
                'completed': todoItem.completed,
                'priority': 90,
              }
            ,
          },
        })
        ;
    });

    it(`Complete todo`, () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .set({ authorization })
        .send({
          operationName: null,
          variables: {},
          query: `mutation {\n  completeTodo(id: "${todoItem.id}") {\n    id\n    completed\n  }\n}\n`,
        })
        .expect(200).expect({
          'data': {
            'completeTodo':
              {
                'id': todoItem.id,
                'completed': true,
              }
            ,
          },
        })
        ;
    });

    it(`Incomplete todo`, () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .set({ authorization })
        .send({
          operationName: null,
          variables: {},
          query: `mutation {\n  markIncompleteTodo(id: "${todoItem.id}") {\n    id\n    description\n    completed\n  }\n}\n`,
        })
        .expect(200)
        .expect(200).expect({
          'data': {
            'markIncompleteTodo':
              {
                'id': todoItem.id,
                'description': todoItem.description,
                'completed': false,
              },
          },
        });

    });

    it(`Delete todo`, () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .set({ authorization })
        .send({
          'operationName': null,
          'variables': {},
          'query': `mutation {\n  deleteTodo(id: \"${todoItem.id}\")\n}\n`,
        })
        .expect(200);
    });

    afterEach(async () => {
      const todoService = app.get(TodoService);
      await todoService.deleteTodo(todoItem.id);
    });

  });

  afterAll(() => {
    app.close();
  });

});

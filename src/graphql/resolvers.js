const TodoSource = require('../db/sources/todos.source');

const resolvers = {
  Query: {
    getAllTodos: async (_, data) => TodoSource.getAllTodos(data),
  },
  Mutation: {
    createTodo: async (_, data) => TodoSource.createTodo(data),
    deleteTodo: async (_, data) => TodoSource.deleteTodo(data),
    updateTodo: async (_, data) => TodoSource.updateTodo(data),
    completeTodo: async (_, data) => TodoSource.completeTodo(data),
  },
};

module.exports = resolvers;

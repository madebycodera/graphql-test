const todo = require("../../model");

const Query = {
  listTodo: (root, input) => todo.listTodo(input),
};

const Mutation = {
  createTodo: (root, input) => todo.createTodo(input),
  updateTodo: (root, input) => todo.updateTodo(input),
  markTodoComplete: (root, input) => todo.markTodoComplete(input),
  deleteTodo: (root, input) => todo.deleteTodo(input),
};

module.exports = { Query, Mutation };

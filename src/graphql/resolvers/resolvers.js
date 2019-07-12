const todoService = require('../../services/todo');

const Query = {
    getTodoList: (root, input) => todoService.getTodoList(input),
};

const Mutation = {
    createTodo: (root, input) => todoService.createTodo(input),
    updateTodo: (root, input) => todoService.updateTodo(input),
    markTodoComplete: (root, input) => todoService.markTodoComplete(input),
    deleteTodo: (root, input) => todoService.deleteTodo(input),
};

module.exports = { Query, Mutation };

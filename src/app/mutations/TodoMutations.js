const Todo = require("../models/Todo");

module.exports = {
  createTodo: (_, { description, priority = 1, completed = false }) => {
    return Todo.create({
      description,
      priority,
      completed
    });
  },

  updateTodo: async (_, { id, description, priority }) => {
    const todo = await Todo.findByPk(id);
    return todo.update({ description, priority });
  },

  completeTodo: async (_, { id }) => {
    const todo = await Todo.findByPk(id);
    return todo.update({ completed: true });
  },

  deleteTodo: (_, { id }) => {
    return Todo.destroy({ where: { id } });
  }
};

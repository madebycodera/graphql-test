const Todo = require("../models/Todo");

module.exports = {
  todos: (_, { sortedBy, order = "ASC", completed }) => {
    let ordenation = null;
    let where = null;

    if (sortedBy) {
      ordenation = [[sortedBy, order]];
    }

    if (typeof completed === "boolean") {
      where = { completed };
    }

    return Todo.findAll({ where, order: ordenation });
  },

  todo: (_, { id }) => Todo.findByPk(id)
};

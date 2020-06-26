const todoDB = require("../db");
const { makeListTodoQuery } = require("../utils");

async function listTodo({ input }) {
  let query = {};

  if (input) {
    const { orderBy, sortBy, completed } = input;
    query = makeListTodoQuery({ orderBy, sortBy, completed });
  }

  const todoList = await todoDB.listTodo(query);

  if (!todoList) {
    return [];
  }

  return todoList;
}

async function createTodo({ description, priority }) {
  if (typeof priority === "number" && priority < 1) {
    throw Error("Priority must be greater than or equal 1");
  }

  const todo = await todoDB.createTodo({
    description,
    priority: priority,
  });

  return todo;
}

async function updateTodo({ id, description, priority }) {
  if (typeof priority === "number" && priority < 1) {
    throw Error("Priority must be greater than or equal 1");
  }

  const todo = await todoDB.getTodoById({ id });

  if (!todo) {
    throw Error(`Missing todo with ID ${id}`);
  }

  const updatedTodo = await todoDB.updateTodo({
    id,
    description,
    priority,
  });

  return updatedTodo;
}

async function markTodoComplete({ id }) {
  const todo = await todoDB.getTodoById({ id });

  if (!todo) {
    throw new Error(`Missing todo with ID ${id}`);
  }

  const result = await todoDB.markTodoComplete({ id });

  return result;
}

async function deleteTodo({ id }) {
  if (!id || id.length !== 36) {
    throw new Error(`${id} is invalid UUID`);
  }
  const todo = await todoDB.getTodoById({ id });
  if (!todo) {
    throw new Error(`Missing todo with ID ${id}`);
  }

  const result = await todoDB.deleteTodo({ id });

  if (result) {
    return {
      message: `Todo with ID ${id} successfully deleted`,
      statusCode: "OK",
    };
  }
  throw new Error(`Unable to delete todo with ID ${id}`);
}

module.exports = {
  listTodo,
  createTodo,
  updateTodo,
  markTodoComplete,
  deleteTodo,
};

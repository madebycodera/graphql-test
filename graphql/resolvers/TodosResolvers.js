const { ForbiddenError } = require('apollo-server');
const { combineResolvers } = require('graphql-resolvers');
const uuidv1 = require('uuid/v1');
const { find } = require('lodash');
const { getAllStuff, saveToFile, removeItem, updateItem } = require('../../db');

module.exports = {
  Query: {
    todos: combineResolvers(async (parent, args, context, info) => {
      try {
        const todos = await getAllStuff();
        return todos;
      } catch (error) {
        throw new ForbiddenError('Get Todos Error:', error);
      }
    }),
  },
  Mutation: {
    createTodo: combineResolvers(async (parent, args, context, info) => {
      try {
        const todo = { ...args, id: uuidv1(), createdAt: new Date() };
        const todos = await getAllStuff();
        todos.push(todo);
        await saveToFile(todos);
        return todo;
      } catch (error) {
        throw new ForbiddenError('Create Todo Error:', error);
      }
    }),
    deleteTodo: combineResolvers(async (parent, args, context, info) => {
      try {
        const { id } = args;
        const todos = await removeItem(id);
        return todos;
      } catch (error) {
        throw new ForbiddenError('Delete Todo Error:', error);
      }
    }),
    completeTodo: combineResolvers(async (parent, args, context, info) => {
      try {
        const { id } = args;
        const todos = await updateItem({ id, completed: true });
        return find(todos, { id });
      } catch (error) {
        throw new ForbiddenError('Complete Todo Error:', error);
      }
    }),
    updateTodo: combineResolvers(async (parent, args, context, info) => {
      try {
        const { id } = args;
        const todos = await updateItem({ ...args });
        return find(todos, { id });
      } catch (error) {
        throw new ForbiddenError('Update Todo Error:', error);
      }
    }),
  },
};

import mongoose from 'mongoose';

import { Todo } from './models/Todo';

export const resolvers = {
  Query: {
    async getAllTodos(_, { sortField, sortOrder, completed }) {
      let res = [];
      if (completed) {
        res = Todo.find({ completed: true });
      } else {
        res = Todo.find();
      }
      if (sortField) {
        res = res.sort({ [sortField]: sortOrder || 1 });
      }
      return res;
    }
  },
  Mutation: {
    async createTodo(_, { description, priority }) {
      const newPriority = priority < 1 ? 1 : priority;
      const todo = new Todo({ description, priority: newPriority });
      try {
        return await todo.save();
      } catch (e) {
        return false;
      }
    },
    async deleteTodo(_, { id }) {
      const objectId = mongoose.Types.ObjectId(id);
      try {
        await Todo.findByIdAndDelete(objectId);
        return true;
      } catch (e) {
        return false;
      }
    },
    async updateTodo(_, { id, description, priority }) {
      const newTodo = {
        description
      };
      if (priority >= 1) newTodo.priority = priority;
      const objectId = mongoose.Types.ObjectId(id);
      try {
        await Todo.findByIdAndUpdate(objectId, newTodo);
        return await Todo.findById(objectId);
      } catch (e) {
        return false;
      }
    },
    async markTodo(_, { id }) {
      const objectId = mongoose.Types.ObjectId(id);
      try {
        await Todo.findByIdAndUpdate(objectId, { completed: true });
        return await Todo.findById(objectId);
      } catch (e) {
        return false;
      }
    }
  }
};

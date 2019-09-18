import { Todos } from '../Models';
import _ from 'lodash';

const sortByFields = {
  description: true,
  createdAt: true,
  priority: true,
};
const sortOrders = ['asc', 'desc'];

export default {
  Query: {
    todos: async (
      parent,
      { sortBy = 'createdAt', order = sortOrders[1], completed = false },
    ) => {
      try {
        if (!sortOrders.includes(order)) throw Error('invalid [order] field');
        if (!sortByFields[sortBy]) throw Error('invalid [sortBy] field');

        const sortQuery = {
          [sortBy]: order,
        };

        return await Todos.find({ completed })
          .sort(sortQuery)
          .lean(true);
      } catch (e) {
        return [];
      }
    },
    todo: async (parent, { id }) => {
      try {
        return await Todos.findById(id).lean(true);
      } catch (e) {
        return {};
      }
    },
  },

  Mutation: {
    createTodo: async (
      parent,
      { description, completed = false, priority = 1 },
    ) => {
      try {
        const todo = new Todos({
          description,
          completed: completed,
          priority,
        });
        return await todo.save();
      } catch (e) {
        console.log('Create Error', e);
        throw e;
      }
    },
    deleteTodo: async (parent, { id }) => {
      try {
        await Todos.deleteOne({ _id: id }).exec();
        return { _id: id };
      } catch (e) {
        console.log('Delete Error', e);
        throw e;
      }
    },
    updateTodo: async (parent, { id, ...data }) => {
      try {
        const { priority } = data;
        if (_.isNumber(priority) && priority < 1) {
          throw new Error('priority must be 1 or greater');
        }

        return await Todos.findOneAndUpdate({ _id: id }, data, {
          new: true,
        });
      } catch (e) {
        console.log('Update Error', e);
        throw e;
      }
    },
    markCompleted: async (parent, { id }) => {
      try {
        return await Todos.findOneAndUpdate(
          { _id: id },
          { completed: true },
          { new: true },
        );
      } catch (e) {
        console.log('MarkComplete Error', e);
        throw e;
      }
    },
  },
};

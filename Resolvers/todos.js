import uuidv4 from "uuid/v4";
import { Todos } from "../Models";
import changeIds from "../Helpers/changeIds";

export default {
  Query: {
    todos: async (
      _,
      { orderBy = "priority", direction = "DESC", filteredByCompleted = false }
    ) => {
      try {
        const response = await Todos.find({
          completed: filteredByCompleted
        });
        return changeIds(response);
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    todo: async (_, { id }, { models }) => {
      try {
        const response = await Todos.findById(id);
        return changeIds(response);
      } catch (e) {
        return {};
      }
    }
  },

  Mutation: {
    createTodo: async (
      _,
      { description, completed, priority = 1 },
      { models }
    ) => {
      const id = uuidv4();
      const todo = {
        // id,
        description,
        createdAt: Date.now(),
        completed: completed || false,
        priority
      };

      try {
        const response = await models.Todos.create(todo);
        response.id = response._id;

        return response;
      } catch (e) {
        return "Something went wrong";
      }
    },

    deleteTodo: async (_, { id }) => {
      try {
        await Todos.deleteOne({ _id: id });
        return true;
      } catch (e) {
        return false;
      }
    },
    markToDoComplete: async (_, { id }) => {
      try {
        await Todos.updateOne({ _id: id }, { completed: true });
        const response = await Todos.findById(id);
        return changeIds(response);
      } catch (e) {
        return "Something went wrong";
      }
    },
    updateTodo: async (_, { id, ...data }) => {
      try {
        await Todos.updateOne({ _id: id }, data);
        const response = await Todos.findById(id);
        return changeIds(response);
      } catch (e) {
        return "Something went wrong";
      }
    }
  }
};

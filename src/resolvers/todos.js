module.exports = {
  Query: {
    getAllTodos: async (_, data, { dataSources }) => dataSources.todoAPI.getAllTodos(data),
  },

  Mutation: {
    createTodo: async (_, data, { dataSources }) => dataSources.todoAPI.createTodo(data),

    updateTodo: async (_, data, { dataSources }) => dataSources.todoAPI.updateTodo(data),

    deleteTodo: async (_, data, { dataSources }) => dataSources.todoAPI.deleteTodo(data),

    completedTodo: async (_, data, { dataSources }) => dataSources.todoAPI.completedTodo(data),
  },
};

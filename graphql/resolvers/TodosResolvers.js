const { ForbiddenError } = require('apollo-server');
const { combineResolvers } = require('graphql-resolvers');
const { todos } = require('../../fixtures');

module.exports = {
  Query: {
    todos: combineResolvers(async (parent, args, context, info) => {
      try {
        const responses = await todos;
        return responses;
      } catch (error) {
        throw new ForbiddenError('Get Todos Error:', error);
      }
    }),
  },
};

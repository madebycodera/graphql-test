const TodoMutations = require("./app/mutations/TodoMutations");
const TodoQueries = require("./app/queries/TodoQueries");

const resolvers = {
  Query: {
    ...TodoQueries
  },
  Mutation: {
    ...TodoMutations
  }
};

module.exports = resolvers;

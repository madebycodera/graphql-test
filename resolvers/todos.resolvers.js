const { GraphQLScalarType, Kind } = require('graphql');
const transformResult = require('../utils/transformResult');
const createParamsQuery = require('../utils/createParamsQuery');

const createResolvers = models => ({
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date scalar type',
    parseValue: value => new Date(value),
    serialize: value => new Date(value).getTime(),
    parseLiteral(timestamp) {
      if (timestamp.kind === Kind.INT) {
        return parseInt(timestamp.value, 10);
      }
      return null;
    }
  }),
  Query: {
    listTodos: (_p, { orderBy, sortBy, completed }) => {
      const params = createParamsQuery({ orderBy, sortBy, completed });
      return models.todos.findAll(params);
    }
  },
  Mutation: {
    createTodo: (_p, { description, completed, priority }) =>
      models.todos.create({
        description,
        completed,
        priority
      }),
    updateTodo: (_p, { id, description, priority }) =>
      transformResult(
        models.todos.update(
          {
            description,
            priority
          },
          {
            where: { id }
          }
        )
      ),
    markTodoAsCompleted: (_p, { id }) =>
      transformResult(
        models.todos.update({ completed: true }, { where: { id } })
      ),
    deleteTodo: (_p, { id }) =>
      transformResult(models.todos.destroy({ where: { id } }))
  }
});
module.exports = createResolvers;

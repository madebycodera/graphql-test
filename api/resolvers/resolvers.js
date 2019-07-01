const taskRepository = require("../repositories/task_repository");
const { GraphQLScalarType, Kind } = require('graphql');

const resolvers =  {
    Query: {
        ListTodos: async (parent, {orderBy, ascOrDesc, filteredByCompleted}) => {
          
            return await taskRepository.getTasks(orderBy, ascOrDesc, filteredByCompleted);

        }
    },
    Mutation: {
      createTask: async (parent, { description, complete, priority }) => {

          return await taskRepository.createTask(description, complete, priority);

        },
      updateTask: async (parent, { id, description, priority }) => { 

          return await taskRepository.updateTask(id, description, priority);

        },
      markTaskAsComplete: async (parent,{id, complete}) => {

        return await taskRepository.changeCompleteStatus(id, complete);

      },
      deleteTask: async (parent, {id}) => {

       return await taskRepository.deleteTask(id);

      },
    },
    Date: new GraphQLScalarType({
      name: 'Date',
      description: 'Date custom scalar type',
      parseValue(value) {
        return new Date(value); // value from the client
      },
      serialize(value) {
        return value.getTime(); // value sent to the client
      },
      parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
          return parseInt(ast.value, 10); // ast value is always in string format
        }
        return null;
      }
    }),
  };

  module.exports = resolvers;
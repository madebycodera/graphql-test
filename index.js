const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const queries = require('./query/todoQuery');
const mutations = require('./mutation/todoMutation');

const resolvers = {
    Query: {
        getTodos: queries.getTodos,
        getCompletedTodos: queries.getCompletedTodos
    },
    Mutation: {
        createTodo: mutations.createTodo,
        updateTodo: mutations.updateTodo,
        markTodoAsCompleted: mutations.markTodoAsCompleted,
        deleteTodo: mutations.deleteTodo
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

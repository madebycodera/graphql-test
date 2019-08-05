const express = require('express');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./src/graphql/schema');
const resolvers = require('./src/graphql/resolvers');
const { init } = require('./src/db/service');

const server = new ApolloServer({ typeDefs, resolvers });
init();

const app = express();
app.get('*', (req, res, next) => next());
server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log('🚀  Server ready at localhost:4000');
});

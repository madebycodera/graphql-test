const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
});


server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
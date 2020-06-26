const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const { makeExecutableSchema } = require("graphql-tools");

const { formatError } = require("../utils");
const resolvers = require("./resolver");
const typeDefs = importSchema(`${__dirname}/schema/index.graphql`);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({
  schema,
  playground: {
    settings: {
      "editor.theme": "dark",
    },
  },
  formatError: (error) => formatError(error),
});

module.exports = { apolloServer };

const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const config = require('config');
const dotenv = require('dotenv');
const { resolve } = require('path');
const { ApolloServer } = require('apollo-server-koa');
const errorMiddleware = require('../middlewares/error.middleware');
const typeDefs = require('../schemas/todos.schema');
const createResolvers = require('../resolvers/todos.resolvers');
const createSequilize = require('./createSequilize');

const PORT = config.get('port');
const sequilize = createSequilize();

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers: createResolvers(sequilize.models),
  ...config.get('apolloServer')
});

const app = new Koa();
app.context.sequilize = sequilize;
app.use(cors());
app.use(bodyParser());
app.use(errorMiddleware);
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import mongoose from 'mongoose';

import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';
import { yupMiddleware } from 'graphql-yup-middleware';

import typeDefs from './Schemas';
import resolvers from './Resolvers';
import * as models from './Models';

const app = express();

app.use(cors());

const shame = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const middleware = [
  yupMiddleware({
    errorPayloadBuilder: error => {
      console.log('error: ', error);
      throw Error(`${error.name}: ${error.errors.join(', ')}`);
    },
  }),
];

const shameWithMiddleware = applyMiddleware(shame, ...middleware);

const apolloConfig = {
  context: { models },
  schema: shameWithMiddleware,
};

const server = new ApolloServer(apolloConfig);

server.applyMiddleware({ app, path: '/graphql1' });

mongoose.connection.on('connected', () => {
  console.log('Connected to DB');
});
mongoose.connection.on('disconnected', () => {
  console.log('Disconnected');
});
mongoose.connection.on('error', err => {
  console.log('DB Connection Error: ', err);
});

mongoose
  .connect(process.env.DB_PATH, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen({ port: 8000 }, () => {
      console.log('Apollo Server on http://localhost:8000/graphql1');
    });
  });

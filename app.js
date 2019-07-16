import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import mongoose from "mongoose";

import schema from "./Schemas";
import resolvers from "./Resolvers";
import * as models from "./Models";

mongoose.Promise = global.Promise;

const url = `mongodb://admin:1234Qwerty@ds251507.mlab.com:51507/gql_test`;

mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models
  }
});

app.use(cors());

server.applyMiddleware({ app, path: "/graphql/v1/playground" });


db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  app.listen({ port: 8000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql/v1/playground");
  });
});

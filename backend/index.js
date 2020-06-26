const express = require("express");
const cors = require("cors");
const { apolloServer } = require("./graphql");

const app = express();

app.use(cors());

apolloServer.applyMiddleware({ app });

app.listen(4000, () =>
  console.log("Running a GraphQL API server at http://localhost:4000/graphql")
);

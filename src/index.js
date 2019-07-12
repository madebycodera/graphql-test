const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const { apolloServer } = require('./graphql/apollo-server');

const PORT = config.port || 3000;

const app = express();

// utils
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

apolloServer.applyMiddleware({ app });

module.exports = app.listen(PORT, () => console.log(`GraphQL app started on port ${PORT}`));

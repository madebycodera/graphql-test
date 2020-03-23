
const express = require('express');
const app = express();

const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');

// MongoDB
const mongoose = require('mongoose');
const MONGO_URI = 'YOUR_MONGO_DB_URI';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const schema = require('./src/schema/schema');
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(4003, () => {
  console.log('Listening');
});

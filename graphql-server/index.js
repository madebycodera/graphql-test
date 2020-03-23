const { ApolloServer } = require('apollo-server');
const MongoClient = require('mongodb').MongoClient;
const typeDefs = require('./schema/type_defs');
const resolvers = require('./schema/resolvers');

// MongoDB
const url = 'YOUR_MONGO_URI';
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(function (err) {
  console.log("MONGOdb connected");
  db = client.db('mytodos');
});

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
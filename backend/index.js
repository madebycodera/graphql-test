var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:Admin@192.168.1.42:5432/graphql_test'

// const pool = new Pool({
//   user: 'postgres',
//   host: '192.168.1.42',
//   database: 'graphql_test',
//   password: 'Admin',
//   port: 5432,
// })
const client = new Client({
  connectionString: connectionString, 
  ssl: false
})

client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})


// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

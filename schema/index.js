const { makeExecutableSchema } = require('graphql-tools');

const Mutations = require('./mutations');
const Query = require('./queries');
const Date = require('./date');

const schemaString = `

scalar Date

type Query {
    todo(id: ID): Todo,
    allTodos: [Todo]
}

type Todo {
    id: ID
    description: String
    created_at: Date
    completed: Boolean
    priority: Int
}

input AddTodo {
    description: String
    created_at: Date
    completed: Boolean
    priority: Int
}

type Mutation {
    addTodo(todo: AddTodo!): Todo
    editTodo(id: ID!, todo: AddTodo): Todo
    deleteTodo(id: ID!): Todo
  }

`;

const resolverMap = {
    Date: Date,
    Query: Query,
    Mutation: Mutations
};

module.exports = makeExecutableSchema({ typeDefs: schemaString, resolvers: resolverMap });
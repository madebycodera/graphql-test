const uuidv1 = require('uuid/v1');
const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Date

  type Query {
    todos: [Todo!]
  }

  type Mutation {
    createTodo(description: String!, completed: Boolean=false, priority: Int=1): Todo!
    deleteTodo(id: ID!): [Todo!]
    completeTodo(id: ID!): Todo!
    updateTodo(id: ID!, description: String!, priority: Int): Todo!
  }

  type Todo {
    id: ID!
    description: String
    createdAt: Date
    completed: Boolean
    priority: Int
  }
`;

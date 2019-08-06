const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Date

  type Query {
    todos: [Todo!]
  }

  type Todo {
    id: ID!
    description: String
    createdAt: Date
    completed: Boolean
    priority: Int
  }
`;

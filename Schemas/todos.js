import { gql } from 'apollo-server-express';

export default gql`
  type Status {
    _id: String!
  }

  type Todo {
    _id: ID!
    description: String!
    createdAt: Date
    completed: Boolean
    priority: Int!
  }
  scalar Date
  type Query {
    "Query: fetch Todos. Sorted by 'description', 'createdAt' and 'priority'. Filtered by 'completed'"
    todos(completed: Boolean, sortBy: String, order: String): [Todo!]
    "Query: fetch by id"
    todo(id: ID!): Todo
  }

  type Mutation {
    "Mutation: Create"
    createTodo(description: String!, completed: Boolean, priority: Int): Todo
    "Mutation: Update"
    updateTodo(id: String!, description: String, priority: Int): Todo
    "Mutation: Mark as complete"
    markCompleted(id: String!): Todo
    "Mutation: Delete"
    deleteTodo(id: String!): Status
  }
`;

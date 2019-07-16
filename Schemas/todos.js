import { gql } from 'apollo-server-express';

export default gql`
  scalar Date
  type Query {
    todos: [Todo!]
    todo(id: ID!): Todo!
  }
  
   type Mutation {
    createTodo(description: String!, completed: Boolean, priority: Int): Todo
    updateTodo(id: String!, description: String!, priority: Int!): Todo
    markToDoComplete(id: String!): Todo
    deleteTodo(id: String!): Status
  }
  
  type Status {
    status: Boolean!
  }
  
  type Todo {
    id: ID!
    description: String!
    createdAt: Date
    completed: Boolean
    priority: Int!
  }
`;

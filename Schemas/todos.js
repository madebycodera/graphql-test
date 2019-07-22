import { gql } from 'apollo-server-express'

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
    "Query to fetch Todos. can be sorted by 'description', 'createdAt' and 'priority' and filtered by 'completed' status"
    todos(completed: Boolean, sortBy: String, order: String): [Todo!]
    "Query to fetch Todo by id"
    todo(id: ID!): Todo
  }
  
  type Mutation {
    "Mutation to create new Todo"
    createTodo(description: String!, completed: Boolean, priority: Int): Todo
    "Mutation to update existing Todo"
    updateTodo(id: String!, description: String, priority: Int): Todo
    "Mutation to mark existing Todo as completed"
    markCompleted(id: String!): Todo
    "Mutation to delete existing Todo based on id"
    deleteTodo(id: String!): Status
  }
`

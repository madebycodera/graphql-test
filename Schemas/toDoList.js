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
    "This is a query that fetch and returns array of todos. can be sorted by 'description', 'createdAt' and 'priority' and filtered by 'completed' field"
    todoList(completed: Boolean, sortBy: String, order: String): [Todo!]
    "This is a query to fetch and return the Todo based on 'id' argument"
    oneTodo(id: ID!): Todo
  }
  
  type Mutation {
    "This is a mutatuion that create and return todo"
    createTodo(description: String!, completed: Boolean, priority: Int): Todo
    "This is a mutation that update and return the existing todo based on 'id' argument"
    updateTodo(id: String!, description: String, priority: Int): Todo
    "This is a mutation to mark existing Todo as completed based on 'id' argument"
    markTodoAsCompleted(id: String!): Todo
    "This is a mutation that delete existing Todo and return 'id' of deleted todo based on 'id' argument"
    deleteTodo(id: String!): Status
  }
`

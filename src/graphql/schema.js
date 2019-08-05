const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date
  
  type Todo {
    id: ID!
    description: String!
    priority: Int
    createdAt: Date
    completed: Boolean
  }
   
  type Query {
  
  """
    getAllTodos Query return all Todos.
    If no arguments passed it returns all Todos unsorted.
    If sortField argument passed it returns Todos in ASC order by selected column.
    sortField: 'description', 'priority', 'createdAt'.
    sortOrder argument show order direction, ASC by default.
    sortOrder: 'asc', 'desc'
    If completed argument passed it returns Todos filtered by completed column.
    completed: true, false    
  """
    getAllTodos(
      sortField: String,
      sortOrder: String,
      completed: Boolean
    ): [Todo]
  }
  
  type Mutation {
  """
    createTodo mutation creates todo.
    description argument is a string and required.
    priority argument is a number, default: 1.
  """
    createTodo(
      description: String!
      priority: Int
    ): Todo
  """
    deleteTodo mutation deletes todo.
    id argument is a number and required.
  """
    deleteTodo(
      id: Int!
    ): String
  """
    updateTodo mutation updates todo.
    id argument is a number and required.
    description argument is a string.
    priority argument is a number.
  """
    updateTodo(
      id: Int!
      description: String
      priority: Int
    ): Todo
  """
    completeTodo mutation mark todo as completed.
    id argument is a number and required.
  """
    completeTodo(
      id: Int!
    ): Todo
  }
`;

module.exports = typeDefs;

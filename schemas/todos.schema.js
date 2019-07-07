const { gql } = require('apollo-server-koa');

const schema = gql(`
  scalar Date
  enum SortableOrder {
    priority
    createdAt
    description 
  }
  enum SortDirection {
    ASC
    DESC
  }
  type Todo {
    id: Int
    createdAt: Date
    completed: Boolean
    description: String!
    priority: Int
  }
  type State {
    updated: Boolean
  }
  type Query {
    """
    Get all todos
    """
    listTodos(orderBy: SortableOrder, sortBy: SortDirection, completed: Boolean): [Todo]
  }
  type Mutation {
    """
    Creates new Todo
    """
    createTodo(completed: Boolean, description: String!, priority: Int): Todo
    """
    Updates existing Todo by id
    """
    updateTodo(id: Int!, description: String!, priority: Int!): State
    """
    Updates existing Todo as completed
    """
    markTodoAsCompleted(id: Int!): State
    """
    Deletes existing Todo by id
    """
    deleteTodo(id: Int!): State
  }
`);

module.exports = schema;

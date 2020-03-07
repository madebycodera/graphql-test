const { gql } = require("apollo-server");

const typeDefs = gql`
  enum Order {
    ASC
    DESC
  }

  type Todo {
    id: Int
    description: String
    completed: Boolean
    priority: Int
    createdAt: String
  }

  type Query {
    todos(sortedBy: String, order: Order, completed: Boolean): [Todo!]!
    todo(id: Int!): Todo
  }

  type Mutation {
    """
    This mutation creates a new Todo and returns the new register
    """
    createTodo(description: String!, priority: Int): Todo
    """
    This mutation updates an exist todo and returns the affected register
    """
    updateTodo(id: Int!, description: String, priority: Int): Todo
    """
    This mutation marks a Todo as completed and returns the affected register
    """
    completeTodo(id: Int!): Todo
    """
    This mutation deletes a Todo and don't return columns
    """
    deleteTodo(id: Int!): Int!
  }
`;

module.exports = typeDefs;

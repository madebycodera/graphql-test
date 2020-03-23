const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date
  type Todo {
    """
    This type defines the todo object
    """
    _id: String!
    description: String!
    priority: Int!
    completed: Boolean!
    createdAt: Date!
  }

  type Query {
    """
    This query fetches all the todos
    """
    todos: [Todo]
  }

  type Mutation {
    """
    This mutation adds a todo: it takes as input the description
    and the priority and returns a the list of todos
    """
    addTodo(description: String!, priority: Int): [Todo]

    """
    This mutation deletes a todo: it takes as input the id 
    and returns a the list of todos
    """
    deleteTodo(id: String!): [Todo]

    """
    This mutation toggles a todo: it takes as input the id and the completed status
    and returns a the list of todos
    """
    toggleDone(id: String!, completed: Boolean!): [Todo]

    """
    This mutation updates a todo: it takes as input the id, the description
    and the priority and returns a the list of todos
    """
    updateTodo(id: String!, description: String!, priority: Int): [Todo]

  }
`;

module.exports = typeDefs;

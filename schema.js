const { gql } = require('apollo-server');

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Todo" type defines the queryable fields for every todo in our data source.
  type Todo {
    id: String!
    description: String!
    createdAt: String
    completed: Boolean
    priority: Int
  }
  
  type TodoMutationResponse {
    success: Boolean!
    errorMessage: String
    data: Todo
  }
  
  # This "Enum" represents the properties which can use to order Todo list.
  enum PropertyToOrderBy{
    priority
    createdAt
    completed
  }
  
  #This "Enum" represents the direction of sorted
  enum Direction{
    ASC
    DESC
  }
  
  type Query {
    """
    getTodos query returns an array of zero or more Todos.
    it is also possible to return the ordered list, by default getTodos return an un-ordered list.
    """
    getTodos(sortBy: PropertyToOrderBy, direction: Direction): [Todo]
    
    
    """
    getCompletedTodos query returns an array of zero or more of Todos with completed = true
    """
    getCompletedTodos: [Todo]
  }
  
  type Mutation {
    """
    createTodo mutation: possible to add a todo item
    """
    createTodo(description: String!, priority: Int): TodoMutationResponse
    
    
    """
    updateTodo mutation: possible to modify a todo item
    """
    updateTodo(id: String!, description: String, priority: Int): TodoMutationResponse
    
    
    """
    markTodoAsCompleted mutation: set todo as completed = true
    """
    markTodoAsCompleted(id: String!): TodoMutationResponse
    
    
    """
    deleteTodo mutation: remove a todo from [Todo]
    """
    deleteTodo(id: String!): TodoMutationResponse
    
  }
`;

module.exports = typeDefs;

const { gql } = require('apollo-server-express/dist/index');

const typeDefs = gql`
  type Query {
  """
    This is a query that return all Todos, 
    it is possible to specify additional
    parameters for sorting by createdAt,
    priority, description and filtering 
    by completed tasks
    sortField may be: 'createdAt', 'priority' or 'description'
    sortOrder may be: 'asc' or 'desc'
    filterTodos may be: 'completed' or 'uncompleted'
  """ 
    getAllTodos(
      sortField: String,
      sortOrder: String,
      filterTodos: String,
    ): [Todo]
  }

  type Todo {
    id: ID!
    description: String
    completed: Boolean
    createdAt: ISODate
    priority: Int
  }

  type Mutation {
  """
    This is a mutation that create todo, 
    description is string and is required
    priority is integer and must be 1 or greater,
  """ 
  
    createTodo(
      description: String!
      priority: Int
    ): [Todo]
    
  """
    This is a mutation that update todo, 
    id is required
    description is string
    priority is integer and must be 1 or greater,
  """ 
  
    updateTodo(
      id: ID!
      description: String
      priority: Int
    ): [Todo]

  """
    This is a mutation that delete todo, 
    id is required
  """ 

    deleteTodo(
      id: ID!
    ): [Todo]

  """
    This is a mutation that completed todo, 
    id is required
  """ 

    completedTodo(
      id: ID! 
    ): [Todo]
  }
  
  scalar ISODate
`;

module.exports = typeDefs;

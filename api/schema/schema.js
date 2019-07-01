const typeDefs = `
  scalar Date

  type Task {
    id: String!
    description: String!
    createdAt: Date!
    completed: Boolean
    priority: Int
  }

  type Query {
    ListTodos(orderBy: String, ascOrDesc: Boolean, filteredByCompleted: Boolean): [Task]
  }

  type Mutation {
    createTask(description: String!, complete: Boolean, priority: Int): String
    updateTask(id: String!, description: String!, priority: Int!): Boolean
    markTaskAsComplete(id: String!, complete: Boolean!): Boolean
    deleteTask(id: String!): Boolean
  }
`;

module.exports = typeDefs;
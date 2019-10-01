const Mutations = require('./mutations');
const Query = require('./queries');
const Date = require('./date');

const schemaString = `

scalar Date

type Todo {
    id: ID
    description: String
    created_at: Date
    completed: Boolean
    priority: Int
}

input AllFilters {
    completed: Boolean
    sort_by: String
    desc: Boolean
}

input AddTodo {
    description: String
    created_at: Date
    completed: Boolean
    priority: Int
}

type Query {
    todo(id: ID): Todo,
    allTodos(filters: AllFilters): [Todo]
    getError: String
}

type Mutation {
    addTodo(todo: AddTodo!): Todo
    editTodo(id: ID!, todo: AddTodo): Todo
    completeTodo(id: ID!): Todo
    deleteTodo(id: ID!): Todo
  }

`;

const resolverMap = {
    Date: Date,
    Query: Query,
    Mutation: Mutations
};

module.exports = {
    typeDefs: schemaString,
    resolvers: resolverMap
};
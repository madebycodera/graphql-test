const { gql } = require('apollo-server');

const schema = gql`
scalar Date

	"""
	Type definition for each type accepted by each Todo item
	"""
type Todo {
	id: ID
	description: String
	createdAt: Date
	completed: Boolean
	priority: Int
}

enum Order {
	ASC
	DESC
}

input SortBy {
  field: String!
  order: Order!
}

type Query {
	"""
	This query get a list of all the todos currently available, both completed and not completed
	"""
	todosList(sortBy: SortBy): [Todo]
}

type Mutation {
	"""
	This query is a mutation is for creation of each Todo Item
	"""
	createTodo(description: String!, priority: Int): Todo

	"""
	This query is a mutation is for changing the priority of each todo item. The query accepts two arguments id and priority
	"""
	updateTodo(id: ID!, description: String, priority: Int): Todo!

	"""
	This query is a mutation is for updating each Todo Item to mark as complete. The query accepts two arguments id and completed
	"""
	markComplete(id: ID!, completed: Boolean!): Todo!

	"""
	This query is a mutation is for the deletion of individual Todo Item, by passing in an id to specify what you want to delete
	"""
	deleteTodo(id: ID!): Todo!
}
`

export default schema;
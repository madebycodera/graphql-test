const graphql = require('graphql')
const Todo = require('../models/todo')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,  
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull
} = graphql

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: {type: GraphQLID},
    description: {type: GraphQLString},
    completed: {type: GraphQLBoolean},
    priority: {type: GraphQLInt}    
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {    
    todo: {
      description: "Get Todo record by ID",
      type: TodoType,
      args: { id: {type: GraphQLID} },
      resolve(parent, args) {
        return Todo.findOne({ where: {id: args.id} })
      }
    },
    todos: {
      description: "Get ALL Todo records",
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return Todo.findAll()
      }
    },
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: {
      description: "Create a new Todo record.",
      type: TodoType,
      args: {
        description: {type: new GraphQLNonNull(GraphQLString)},
        completed: {type: new GraphQLNonNull(GraphQLBoolean)},
        priority: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args) {
        let todo = {
          description: args.description,
          completed: args.completed,
          priority: args.priority,
        }
        return Todo.create(todo)
      }
    },
    updateTodo: {
      description: "Update a single Todo record by ID",
      type: TodoType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        description: {type: GraphQLString},
        priority: {type: GraphQLInt}
      },
      resolve(parent, args) {
        return Todo.update( args, { where: { id: args.id } },
        )
      }
    },
    completeTodo: {
      description: "Mark a Todo record as completed by ID",
      type: TodoType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve(parent, args) {
        let query = {
          completed: true,
        }
        return Todo.update( query, { where: { id: args.id } },
        )
      }
    },
    deleteTodo: {
      description: "Delete Todo record by ID",
      type: TodoType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve(parent, args) {
        return Todo.destroy( { where: { id: args.id } },
        )
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

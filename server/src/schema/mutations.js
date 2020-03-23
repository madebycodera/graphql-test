const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean
} = graphql;
const Todo = require('../models/todo');
const TodoType = require('./todo_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: {
      type: new GraphQLList(TodoType),
      args: {
        description: { type: new GraphQLNonNull(GraphQLString) },
        priority: { type: GraphQLInt }
      },
      resolve(parentValue, { description, priority }) {
        return Todo.addTodo(description, priority);
      }
    },
    deleteTodo: {
      type: new GraphQLList(TodoType),
      args: { 
        id: { type: new GraphQLNonNull(GraphQLID) } 
      },
      resolve(parentValue, { id }) {
        return Todo.deleteTodo(id);
      }
    },
    toggleDone: {
      type: new GraphQLList(TodoType),
      args: { 
        id: { type: new GraphQLNonNull(GraphQLID) },
        completed: { type: new GraphQLNonNull(GraphQLBoolean) } 
      },
      resolve(parentValue, { id, completed }) {
        return Todo.toggleDone(id, completed);
      }
    },
    updateTodo: {
      type: new GraphQLList(TodoType),
      args: { 
        id: { type: new GraphQLNonNull(GraphQLID) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        priority: { type: GraphQLInt } 
      },
      resolve(parentValue, { id, description, priority }) {
        return Todo.updateTodo(id, description, priority);
      }
    } 
  }
});

module.exports = mutation;

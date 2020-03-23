const graphql = require('graphql');
const GraphQLDate = require('graphql-date');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean
} = graphql;

const TodoType = new GraphQLObjectType({
  name: 'TodoType',
  fields: () => ({
    id: { type: GraphQLID }, 
    description: { type: GraphQLString },
    createdAt: { type: GraphQLDate },
    completed: { type: GraphQLBoolean},
    priority: { type: GraphQLInt } 
  })
});

module.exports = TodoType;

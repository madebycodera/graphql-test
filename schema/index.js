const graphql = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const connectionString = 'postgres://kek:kek@localhost:15432/test?sslmode=disable';
const pgp = require('pg-promise')();
const db = {};
db.conn = pgp(connectionString);
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLScalarType,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql;
const { Kind } = require('graphql/language');


const Date = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
        return new Date(value); // value from the client
    },
    serialize(value) {
        return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value) // ast value is always in string format
        }
        return null;
    },
});

const Query = {
    todo: (_,{id},ctx) => {
    const query = `SELECT * FROM "todo" WHERE id=${id}`;
console.log('todo', id,ctx, query);
return db.conn.one(query)
    .then(data => {
    console.log('then', data);
return data;
})
.catch(err => {
    console.log('catch', err);
return 'The error is', err;
});
},
allTodos: () => {
    const query = `SELECT * FROM "todo"`;
    console.log('allTodos', query);
    return db.conn.any(query)
        .then(data => {
        console.log('then', data);
    return data;
})
.catch(err => {
        console.log('catch', err);
    return 'The error is', err;
});
},
};


const schemaString = `

scalar Date

type Query {
    todo(id: ID): Todo,
    allTodos: [Todo]
}

type Todo {
    id: ID
    description: String
    createdAt: Date
    completed: Boolean
    priority: Int
}

`;

const resolverMap = {
    Date: Date,
    Query: Query
};

module.exports = makeExecutableSchema({ typeDefs: schemaString, resolvers: resolverMap });


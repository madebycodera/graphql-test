import schema from "./schema";
import resolvers from "./resolvers";


const { ApolloServer, gql } = require('apollo-server');


const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
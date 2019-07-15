import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import TodoResolver from "./resolvers/todo.resolvers";
import { createConnection } from "typeorm";

async function bootstrap() {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [TodoResolver]
  });

  const server = new ApolloServer({
    schema
  });

  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);
}

bootstrap();

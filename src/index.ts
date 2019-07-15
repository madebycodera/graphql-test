require("dotenv").config();

import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import TodoResolver from "./resolvers/todo.resolvers";
import * as TypeORM from "typeorm";
import { Container } from "typedi";

async function bootstrap() {
  TypeORM.useContainer(Container);
  try {
    await TypeORM.createConnection({
      type: "postgres",
      host: process.env.PSQL_HOST,
      port: parseInt(process.env.PSQL_PORT, 10),
      username: process.env.PSQL_USERNAME,
      password: process.env.PSQL_PASSWORD,
      database: process.env.PSQL_DB,
      synchronize: true,
      logging: false,
      entities: ["src/entity/**/*.ts"],
      migrations: ["src/migration/**/*.ts"],
      subscribers: ["src/subscriber/**/*.ts"],
      cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber"
      }
    });

    const schema = await buildSchema({
      resolvers: [TodoResolver],
      container: Container
    });

    const server = new ApolloServer({
      schema
    });

    const { url } = await server.listen();
    console.log(`🚀  Server ready at ${url}`);
  } catch (error) {
    console.error(error);
  }
}

bootstrap();

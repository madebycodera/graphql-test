import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ConfigService, Environment } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { TodoModule } from '../todo/todo.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    AuthModule,
    TodoModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.databaseHost,
          port: config.databasePort,
          username: config.databaseUsername,
          password: config.databasePassword,
          database: config.databaseName,
          entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
          synchronize: config.databaseSynchronize,
          dropSchema: config.env === Environment.test,
        };
      },
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      context: ({ req }) => {
        return { req };
      },
      playground: true,
      introspection: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
      resolvers: { Date: GraphQLDateTime },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}

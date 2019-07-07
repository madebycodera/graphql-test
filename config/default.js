const {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_HOST
} = process.env;
module.exports = {
  port: 4000,
  apolloServer: {
    playground: true,
    introspection: true
  },
  db: {
    dialect: 'postgres',
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST
  }
};

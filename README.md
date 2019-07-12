# GraphQL Test Task

## App configuration

- add `.env` file with environment variables (see `example.env`);

## DB configuration

PostgreSQL v11.4 is used as data source

- create database with a name that you set in `.env`
- run `npm run db:migrate` to make all required migrations
- run `npm run db:seed` to insert mock data in the DB (optional)

**Note:** Sql dump is located under `./graphql-test-task.dump.sql`.

## Start app

To start app just run `npm start`.

P.S Do not forget to install npm modules `npm i`.

**Note:** GraphQL Playground can be found on the following address `<host>/graphql`

## Test app

- start the app by running `npm start`
- run `sh test.sh` to test query and mutations

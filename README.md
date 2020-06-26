# MadeByCodera GraphQL Test

## Description

You are tasked with writing the GraphQL api for a new Todo List mobile app.

### Todo GraphQL Type
The structure of the Todo GraphQL Type according to the frontend developer should look like the following:

Field        | Data Type     | Description
------------ | ------------- | -------------
id           | UUID          | Unique identifier for the todo.
description  | String        | Describes what the todo is.
createdAt    | Date          | Tells us when the todo was created. Defaults to current datetime.
completed    | Boolean       | Indicates if the todo is complete. Defaults to false.
priority     | Int           | 1 is the highest priority. Defaults to 1.

### Todo GraphQL Query and Mutations
And the frontend developer is counting on you to implement the following 5 methods under the GraphQL api endpoint:
1. **List Todos** - Query - Retrieved todos can be sorted by the `priority`, `createdAt`, or `description` fields in ascending or descending order. By default the todos are unsorted. In addition, the todos can be filtered by the `completed` field.
2. **Create todo** - Mutation - `description` is required. `priority` is optional and if not provided should default to 1. The rest of the fields: `id`, `createdAt`, and `completed` should have defaults supplied for them as noted in the Todo GraphQL Type mentioned above.
3. **Update todo** - Mutation - Should update a todo based on the `id` provided in the request. `description` and/or `priority` fields can be updated. `priority` must be 1 or greater if sent in request.
4. **Mark todo complete** - Mutation - Should update a todo's `complete` field to `true` based on the `id` provided in the request.
4. **Delete todo** - Mutation - Should delete a todo based on the `id` provided in the request.

### Documentation

The front end developer would also like a little bit of documentation to help him use the api. The easiest way to provide documentation is to add comments to each query, mutation, and type that is defined in the GraphQL schema. The following multi-line comments example highlights how you should be declaring comments in the query, mutation, or type definitions:

```
"""
<my comments go here>
"""
```

This will make it very easy for the frontend developer to see them when inspecting the running GraphQL server using [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/features/graphql-playground/)

As demonstrated in the following screenshot

[![graphql-playground-example.png](https://i.postimg.cc/rw6HMzmt/graphql-playground-example.png)](https://postimg.cc/VdRgFfXY)

### Testing

The front end developer would also like to see examples of using this GraphQL api to help him make his own requests, as well as show to him that the api will work as he expects. You may do this however you see fit. The simplest way possible would be to write variations of query and mutation requests in GraphQL Playground and then click `COPY CURL`, pasting the curl command into a shell script that you could provide at the root of the repo called `test.sh`.

[![graphql-test-copy-curl-example.png](https://i.postimg.cc/8c0vxzyb/graphql-test-copy-curl-example.png)](https://postimg.cc/BP2tK4f8)

## Instructions
1. Fork this repository. Do all of your work on your personal fork. Then create a new pull request on your personal fork
2. You must implement this graphql backend using [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
3. You can use whatever data structure you are most comfortable with for storing the data such as in-memory, MySQL, Postgres, SQLite, MongoDB, etc... . Using Postgres is preferred and considered a plus, since that is what we use currently.
4. This repo should be an npm project such that we can install the dependencies that you define for the server in order to run it using Node.

Here is an example of creating a pull request from a fork of a repository:
[![pull-request-example.png](https://i.postimg.cc/QCgrr53S/pull-request-example.png)](https://postimg.cc/RJ0Y7Wqn)

## NOTE
If you are not storing the data in-memory, please commit a sql dump file of the database schema to the repo. Please add a note of where this file is located in this `README.md` if the sql dump is not located at the root of the repo. Your submission will be **DISCARDED** if you **DO NOT** commit a sql dump file for your implementation, if it uses a database.

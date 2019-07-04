# GraphQL Test

## Description

GraphQL api for a new Todo List mobile app.


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
1. **todosList** - Query - A query that returns todos. Retrieved todos can be sorted by the `priority`, `createdAt`, or `description` fields in ascending or descending order. By default the todos are unsorted. In addition, the todos can be filtered by the `completed` field.
2. **create** - Mutation - To create a todo. `description` is required. `priority` is optional and if not provided should default to 1. The rest of the fields: `id`, `createdAt`, and `completed` should have defaults supplied for them as noted in the Todo GraphQL Type mentioned above.
3. **update** - Mutation - Update a todo based on the `id` provided in the request. `description` and/or `priority` fields can be updated. `priority` must be 1 or greater if sent in request.
4. **complete** - Mutation - Update a todo's `complete` field to `true` based on the `id` provided in the request.
4. **delete** - Mutation - Delete a todo based on the `id` provided in the request.

### Documentation

1. A MongoDB server is required. You can install it locally or run it with `docker`.

    Run with docker:
    
    -  `docker pull mongo`
    -  `docker run -d -p 27017:27017 mongo`

2. Import data from dump

    `cat dump.gz | docker run --rm -i mongo mongorestore --host <YOUR_LOCAL_IP> --archive --gzip --drop --db=todo`
    
3. Install dependencies

    `yarn`
    
4. Run a server

    `yarn start`



# Postgres

For Postrges DB one of the best choice is [Hasura.io](https://hasura.io/ "Instant Realtime GraphQL on Postgres").

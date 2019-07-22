# GraphQL Api Test Task

### Todo GraphQL Type

Field        | Data Type     | Description
------------ | ------------- | -------------
id           | UUID          | Unique identifier for the todo.
description  | String        | Describes what the todo is.
createdAt    | Date          | Tells us when the todo was created. Defaults to current datetime.
completed    | Boolean       | Indicates if the todo is complete. Defaults to false.
priority     | Int           | 1 is the highest priority. Defaults to 1.

### Todo GraphQL Query and Mutations

1. **List Todos** - Mutation to update existing Todo
2. **createTodo** - Mutation to create new Todo.
3. **updateTodo** - Mutation - Should update a todo based on the `id` provided in the request. `description` and/or `priority` fields can be updated. `priority` must be 1 or greater if sent in request.
4. **markCompleted** - Mutation to mark existing Todo as completed.
4. **deleteTodo** - Mutation to delete existing Todo based on id.



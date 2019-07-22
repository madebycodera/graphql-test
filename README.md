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
Examples
```
  {
    todos {
      _id,
      createdAt,
      priority,
      completed
    }
  }
```
```
  {
    todo(id: "5d35ab185c1d0452a888ea63") {
      _id
    }
  }
```

  }
2. **createTodo** - Mutation to create new Todo.
```
  mutation {
    createTodo(description: "test", completed: false, priority: 2) {
      description,
      completed,
      _id
    }
  }
```
3. **updateTodo** - Mutation - Should update a todo based on the `id` provided in the request. `description` and/or `priority` fields can be updated. `priority` must be 1 or greater if sent in request.
```
  mutation {
    updateTodo(id: "5d35b16969e04e56fbf19302") {
       priority,
       _id
    }
  }
```
4. **markCompleted** - Mutation to mark existing Todo as completed.
``` 
  mutation {
    markCompleted(id: "5d35b16969e04e56fbf19302") {
      _id,
      createdAt,
      priority,
        completed
    }
  }
```
4. **deleteTodo** - Mutation to delete existing Todo based on id.
``` 
  mutation {
    deleteTodo(id: "5d359accf055c247a7748bd9") {
      _id
    }
  }
```

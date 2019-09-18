# GraphQL Api Test Task

start dev server: **npm run dev**

http://localhost:4001/graphql1 - test playground

### GraphQL Types

Field        | Data Type     | Description
------------ | ------------- | -------------
id           | UUID          | Unique identifier for the todo.
description  | String        | Describes what the todo is.
createdAt    | Date          | Tells us when the todo was created. Defaults to current datetime.
completed    | Boolean       | Indicates if the todo is complete. Defaults to false.
priority     | Int           | 1 is the highest priority. Defaults to 1.

### GraphQL Examples

Queries:
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
Mutations:
```
  mutation {
    createTodo(description: "test", completed: false, priority: 2) {
      description,
      completed,
      _id
    }
  }
```

```
  mutation {
    updateTodo(id: "5d35b16969e04e56fbf19302") {
       priority,
       _id
    }
  }
```

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

``` 
  mutation {
    deleteTodo(id: "5d359accf055c247a7748bd9") {
      _id
    }
  }
```

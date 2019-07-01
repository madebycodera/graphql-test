
export const ListTodosQuery = `query ListTodos($orderBy: String!, $ascOrDesc: Boolean!, $filteredByCompleted: Boolean!) {
      ListTodos(orderBy: $orderBy, ascOrDesc: $ascOrDesc, filteredByCompleted: $filteredByCompleted) {
        id
        description
        createdAt
        completed
        priority
      }
}`;

export const CreateTaskMutationQuery = `mutation createTask($description: String!, $complete: Boolean, $priority: Int) {
  createTask(description: $description, complete: $complete, priority: $priority)
}`;

export const UpdateTaskMutationQuery = `mutation updateTask($id: String!, $description: String!, $priority: Int!) {
  updateTask(id: $id, description: $description, priority: $priority)
}`;

export const markTaskAsCompleteMutationQuery = `mutation  markTaskAsComplete($id: String!, $complete: Boolean!) {
  markTaskAsComplete(id: $id, complete: $complete)
}`;

export const deleteTaskMutationQuery = `mutation  deleteTask($id: String!) {
  deleteTask(id: $id)
}`;
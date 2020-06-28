import gql from "graphql-tag";
const mutation = gql`
  mutation updateTodo($id: String!, $description: String!, $priority: Int) {
    updateTodo(id: $id, description: $description, priority: $priority) {
      id
      description
      completed
      createdAt
      priority
    }
  }
`;

export default mutation;

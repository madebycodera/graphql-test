import gql from "graphql-tag";
const mutation = gql`
  mutation createTodo($description: String!, $priority: Int) {
    createTodo(description: $description, priority: $priority) {
      id
      description
      completed
      createdAt
      priority
    }
  }
`;

export default mutation;

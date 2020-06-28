import gql from "graphql-tag";
const mutation = gql`
  mutation markTodoComplete($id: String!) {
    markTodoComplete(id: $id) {
      id
      description
      completed
      createdAt
      priority
    }
  }
`;

export default mutation;

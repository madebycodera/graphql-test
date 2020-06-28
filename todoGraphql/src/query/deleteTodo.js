import gql from "graphql-tag";
const mutation = gql`
  mutation deleteTodo($id: String!) {
    deleteTodo(id: $id) {
      statusCode
      message
    }
  }
`;

export default mutation;

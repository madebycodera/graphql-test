import gql from "graphql-tag";
const query = gql`
  query listTodo($orderBy: String, $sortBy: SortByEnum, $completed: Boolean) {
    listTodo(
      input: { orderBy: $orderBy, sortBy: $sortBy, completed: $completed }
    ) {
      id
      description
      completed
      createdAt
      priority
    }
  }
`;

export default query;

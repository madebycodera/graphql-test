import * as types from "../constants/action_types";
import * as queries from "../constants/queries";
import GRAPH_QL_URL from "../constants/hosts";
import errorHandler from "../handlers/fetch_error_handler";

export const toDoDeleted = (todoList) => {
  return {
    type: types.TODO_DELETED,
    todoList
  };
};

export const deleteToDo = (todoId) => {
  return (dispatch, getState) => {

    let state = getState();
    let toDoList =  state.todos.list.filter(i => i.id !== todoId);

    const fetchOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        query: queries.deleteTaskMutationQuery,
        variables: {id: todoId},
      })
    };

    return fetch(`${GRAPH_QL_URL}/graphql`, fetchOptions)
      .then(response => {
          return response.json();
      })
      .then(json => {
        dispatch(toDoDeleted(toDoList));
      })
      .catch(e => errorHandler(e));
  };
};

export default deleteToDo;

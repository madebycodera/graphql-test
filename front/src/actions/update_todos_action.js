import * as types from "../constants/action_types";
import * as queries from "../constants/queries";
import GRAPH_QL_URL from "../constants/hosts";
import errorHandler from "../handlers/fetch_error_handler";

export const toDosUpdated = (todoList) => {
  return {
    type: types.TODOS_UPDATED,
    todoList
  };
};

export const updateToDos = (todoId, description, createdAt, complete, priority) => {
  return (dispatch, getState) => {

    let state = getState();
    let oldToDoList = state.todos.list;
    let updatedToDos = [];

    let upTodo = { id: todoId, description: description, createdAt: createdAt, complete: complete, priority: priority };
    oldToDoList.forEach((i) => { i.id === todoId ? updatedToDos.push(upTodo) : updatedToDos.push(i) });

    const fetchOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        query: queries.UpdateTaskMutationQuery,
        variables: { id: todoId, description: description, priority: priority },
      })
    };

    return fetch(`${GRAPH_QL_URL}/graphql`, fetchOptions)
      .then(response => {
          return response.json();
      })
      .then(json => {
        dispatch(toDosUpdated(updatedToDos));
      })
      .catch(e => errorHandler(e));
  };
};

export default updateToDos;

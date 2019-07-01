import * as types from "../constants/action_types";
import * as queries from "../constants/queries";
import GRAPH_QL_URL from "../constants/hosts";
import errorHandler from "../handlers/fetch_error_handler";

export const todoCompleteStatusChanged = (todoList) => {
    return {
        type: types.TODOS_UPDATED,
        todoList
    }
};

export const changeTodoCompleteStatus = (todoId, complete, filteredByComplet) => {

  return (dispatch, getState) => {

    let state = getState();
    let oldTodos = state.todos.list;
    let newTodos = [];

    oldTodos.forEach((i) => {

      if(i.id === todoId) {
        if(filteredByComplet !== complete) return;
          i.completed = complete;
      }

       newTodos.push(i);
    })

    const fetchOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        query: queries.markTaskAsCompleteMutationQuery,
        variables: {id: todoId, complete: complete},
      })
    };

    return fetch(`${GRAPH_QL_URL}/graphql`, fetchOptions)
      .then(response => {
          return response.json();
      })
      .then(json => {
        dispatch(todoCompleteStatusChanged(newTodos));
      })
      .catch(e => errorHandler(e));
  };
};

export default changeTodoCompleteStatus;

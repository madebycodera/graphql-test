import * as types from "../constants/action_types";
import * as queries from "../constants/queries";
import GRAPH_QL_URL from "../constants/hosts";
import errorHandler from "../handlers/fetch_error_handler";

export const toDoCreated = (todoList) => {
  return {
    type: types.TODO_CREATED,
    todoList
  };
};

export const createToDo = (description, complete, priority = 1, filteredByComplet) => {
  return (dispatch, getState) => {

    let state = getState();
    let todoList = state.todos.list;
    let newTodos = { description: description, complete: complete, priority: priority };

    const fetchOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        query: queries.CreateTaskMutationQuery,
        variables: newTodos,
      })
    };

    return fetch(`${GRAPH_QL_URL}/graphql`, fetchOptions)
      .then(response => {
          return response.json();
      })
      .then(json => {

        if(filteredByComplet !== complete) {
          dispatch(toDoCreated(todoList));
        }
        else {
          newTodos.id = json.data.createTask;
          newTodos = [newTodos].concat(todoList);
          dispatch(toDoCreated(newTodos));
        }

      })
      .catch(e => errorHandler(e));
  };
};

export default createToDo;

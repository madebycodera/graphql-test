import * as types from "../constants/action_types";

const initState = {
  loaded: false,
  loading: false,
  list: [],
  viewState: {
    orderBy: "priority",
    ascOrDesc: false,
    filteredByComplet: false
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.LOADING_TODOS:
      return Object.assign({}, state, {loading: true});
    case types.TODOS_LOADED:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        list: action.todoList,
        viewState: action.viewState
      });
    case types.TODO_CREATED:
        return Object.assign({}, state, {
            list: action.todoList
    });
    case types.TODOS_UPDATED:
        return Object.assign({}, state, {
            list: action.todoList
    });
    case types.TODO_DELETED:
        return Object.assign({}, state, {
            list: action.todoList
    });
    default:
      return state;
  }
};
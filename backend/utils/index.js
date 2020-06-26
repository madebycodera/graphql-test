const SORT_ENUM = {
  ASC: "asc",
  DESC: "desc",
};

const makeListTodoQuery = ({ orderBy, sortBy, completed }) => {
  const query = {};

  if (typeof completed !== "undefined") {
    query.completed = completed;
  }

  if (typeof orderBy !== "undefined") {
    query.orderBy = orderBy;

    if (typeof sortBy !== "undefined") {
      query.sortBy = SORT_ENUM[sortBy];
    } else {
      query.sortBy = SORT_ENUM.ASC;
    }
  }

  return query;
};

const formatError = (error) => {
  const {
    message = null,
    extensions: { exception = {} },
  } = error;
  const { statusCode = null } = exception;

  return {
    message: message ? message : "Something is wrong",
    statusCode: statusCode ? statusCode : "ERROR",
  };
};

module.exports = { makeListTodoQuery, formatError };

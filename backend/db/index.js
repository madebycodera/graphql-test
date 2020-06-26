const { pool } = require("../config");

const tableName = '"Todo"';

const listTodo = ({ orderBy, sortBy, completed }) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT *FROM " + tableName;
    if (typeof completed !== "undefined") {
      query += " WHERE completed = " + completed;
    }
    if (typeof orderBy !== "undefined") {
      query += ' ORDER BY "' + orderBy + '" ' + sortBy;
    }
    pool
      .query(query)
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        reject("Error executing query" + err.stack);
      });
  });
};

const createTodo = ({ description, priority }) => {
  return new Promise((resolve, reject) => {
    let query = "INSERT INTO " + tableName;
    if (priority) {
      query += `(description,priority) VALUES('${description}', ${priority})`;
    } else {
      query += `(description) VALUES('${description}')`;
    }
    pool
      .query(query)
      .then(() => {
        pool
          .query("SELECT *FROM " + tableName + ' ORDER BY "createdAt" desc')
          .then((result) => {
            resolve(result.rows[0]);
          })
          .catch((err) => {
            reject("Error executing query" + err.stack);
          });
      })
      .catch((err) => {
        reject("Error executing query" + err.stack);
      });
  });
};

const getTodoById = ({ id }) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT *FROM ${tableName} WHERE "id" = '${id}'`;
    pool
      .query(query)
      .then((result) => {
        resolve(result.rows.length ? result.rows[0] : 0);
      })
      .catch((err) => {
        reject("Error executing query" + err.stack);
      });
  });
};

const updateTodo = ({ id, description, priority }) => {
  return new Promise((resolve, reject) => {
    let query = `UPDATE ${tableName} SET "description" = '${description}' where "id" = '${id}'`;
    if (priority) {
      query = `UPDATE ${tableName} SET "description" = '${description}', "priority" = '${priority}' where "id" = '${id}'`;
    }
    pool
      .query(query)
      .then(async (result) => {
        const data = await getTodoById({ id });
        resolve(data);
      })
      .catch((err) => {
        reject("Error executing query" + err.stack);
      });
  });
};

const markTodoComplete = ({ id }) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE ${tableName} SET "completed" = true where "id" = '${id}'`;
    pool
      .query(query)
      .then(async (result) => {
        const data = await getTodoById({ id });
        resolve(data);
      })
      .catch((err) => {
        reject("Error executing query" + err.stack);
      });
  });
};

const deleteTodo = ({ id }) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM ${tableName} where "id" = '${id}'`;
    pool
      .query(query)
      .then(async (result) => {
        resolve(result);
      })
      .catch((err) => {
        reject("Error executing query" + err.stack);
      });
  });
};

module.exports = {
  listTodo,
  createTodo,
  getTodoById,
  updateTodo,
  markTodoComplete,
  deleteTodo,
};

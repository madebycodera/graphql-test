const db = require('..');
const { ServerError } = require('../../helpers/errors');

const table = () => db('todo_list');

function getTodoList({ orderBy, sortBy, completed }) {
    const query = table().select();
    if (typeof orderBy !== 'undefined') {
        query.orderBy(orderBy, sortBy);
    }
    if (typeof completed !== 'undefined') {
        query.where({ completed });
    }

    return query.catch(error => {
        throw new ServerError(`Unable to get todo lists. Details: ${error.message}`);
    });
}

function getTodoById({ id }) {
    return table()
        .select()
        .where({ id })
        .first()
        .catch(error => {
            throw new ServerError(`Unable to get todo by ID. Details: ${error.message}`);
        });
}

function createTodo({ description, priority }) {
    return table()
        .insert({ description, priority }, ['id', 'createdAt', 'completed'])
        .then(([{ id, createdAt, completed }]) => ({
            id,
            description,
            createdAt,
            completed,
            priority,
        }))
        .catch(error => {
            throw new ServerError(`Unable to create todo. Details: ${error.message}`);
        });
}

function updateTodo({ id, description, priority }) {
    return table()
        .where({ id })
        .update({ description, priority })
        .then(result => {
            if (result) {
                return getTodoById({ id });
            }
            throw new ServerError(`Unable to update todo with ID ${id}`);
        })
        .catch(error => {
            throw new ServerError(`Unable to update todo with ID ${id}. Details: ${error.message}`);
        });
}

function markTodoComplete({ id }) {
    return table()
        .where({ id })
        .update({ completed: true })
        .catch(error => {
            throw new ServerError(`Unable to mark todo as completed. Details: ${error.message}`);
        });
}

function deleteTodo({ id }) {
    return table()
        .where({ id })
        .del()
        .catch(error => {
            throw new ServerError(`Unable to delete todo. Details: ${error.message}`);
        });
}

module.exports = {
    getTodoList,
    getTodoById,
    createTodo,
    updateTodo,
    markTodoComplete,
    deleteTodo,
};

const todoRepository = require('../db/repositories/todo');
const { LogicError, NotFoundError, ServerError } = require('../helpers/errors');
const { prepareFetchTodoListQuery } = require('../helpers/knex');

async function getTodoList({ input }) {
    let query = {};

    if (input) {
        const { orderBy, sortBy, completed } = input;
        query = prepareFetchTodoListQuery({ orderBy, sortBy, completed });
    }

    const todoList = await todoRepository.getTodoList(query);

    if (!todoList) {
        return [];
    }

    return todoList;
}

async function createTodo({ description, priority }) {
    if (typeof priority === 'number' && priority < 1) {
        throw new LogicError('Priority must be greater than or equal 1');
    }

    const todo = await todoRepository.createTodo({
        description,
        priority: priority || 1,
    });

    return todo;
}

async function updateTodo({ id, description, priority }) {
    if (typeof priority === 'number' && priority < 1) {
        throw new LogicError('Priority must be greater than or equal 1');
    }

    const todo = await todoRepository.getTodoById({ id });

    if (!todo) {
        throw new NotFoundError(`Missing todo with ID ${id}`);
    }

    const updatedTodo = await todoRepository.updateTodo({
        id,
        description,
        priority,
    });

    return updatedTodo;
}

async function markTodoComplete({ id }) {
    const todo = await todoRepository.getTodoById({ id });

    if (!todo) {
        throw new NotFoundError(`Missing todo with ID ${id}`);
    }

    if (todo.completed) {
        throw new LogicError(`Todo with ID ${id} already completed`);
    }

    const result = await todoRepository.markTodoComplete({ id });

    if (result) {
        return {
            message: `Todo with ID ${id} successfully marked as completed`,
        };
    }
    throw new ServerError(`Unable to mark todo with ID ${id} as completed`);
}

async function deleteTodo({ id }) {
    const todo = await todoRepository.getTodoById({ id });

    if (!todo) {
        throw new NotFoundError(`Missing todo with ID ${id}`);
    }

    const result = await todoRepository.deleteTodo({ id });

    if (result) {
        return {
            message: `Todo with ID ${id} successfully deleted`,
        };
    }
    throw new ServerError(`Unable to delete todo with ID ${id}`);
}

module.exports = {
    getTodoList,
    createTodo,
    updateTodo,
    markTodoComplete,
    deleteTodo,
};

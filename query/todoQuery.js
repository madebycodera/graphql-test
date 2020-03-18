const dbModel = require('../dbModel');
const genericError = require('../shared/genericError');

/**
 * List of all Query relatives to graphQL Schema
 */

// Returns all todos, possible ordered it
const getTodos = async (_, args) => {
    let todos = [];
    try{
        if(args.sortBy && args.direction){
            todos = await dbModel.Todo.findAll({
                order: [
                    [args.sortBy, args.direction]
                ]
            })
        } else {
            todos = await dbModel.Todo.findAll();
        }

    } catch (e) {
        return genericError
    }

    return todos;
};

// Returns all completed todos
const getCompletedTodos = async (_, args) => {
    try{
        return await dbModel.Todo.findAll({
            where:{
                completed: true
            }
        });
    } catch (e) {
        return genericError
    }
};

const queries = {
    // Add others queries here...
    getTodos,
    getCompletedTodos
};

module.exports = queries;

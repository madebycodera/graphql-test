const dbModel = require('../dbModel');
const genericError = require('../shared/genericError');
const { v4: uuidv4 } = require('uuid');

/**
 * List of all Mutation relatives to graphQL Schema
 */

// Create a todoItem
const createTodo = async (_, args) => {
    const todo = {
        id: uuidv4(),
        description: args.description,
        createdAt: new Date(),
        completed: false,
        priority: (args.priority >= 0) ? args.priority : 1
    };
    try{
        await dbModel.Todo.create(todo);
        return {
            success: true,
            data: todo
        }
    }catch (e) {
        return genericError;
    }
};

// Update a description or priority of todoItem by id of item
const updateTodo = async (_, args) => {
    try{
        let fieldToUpdate = {};
        if(args.description){
            fieldToUpdate.description = args.description
        }
        if(args.priority && args.priority > 0){
            fieldToUpdate.priority = args.priority;
        }
        await dbModel.Todo.update(fieldToUpdate,
            {
                where:{
                    id: args.id
                }
            });
        return {
            success: true
        }
    } catch (e) {
        return genericError;
    }

};

// Update a completed as true of todoItem by id of item
const markTodoAsCompleted = async (_, args) => {
    try{
        await dbModel.Todo.update({completed: true},
            {
                where:{
                    id: args.id
                }
            });
        return {
            success: true
        }
    } catch (e) {
        return genericError;
    }

};

// delete a todoItem by id of item
const deleteTodo = async (_, args) => {
    try{
        await dbModel.Todo.destroy(
            {
                where:{
                    id: args.id
                }
            });
        return {
            success: true
        }
    } catch (e) {
        return genericError;
    }

};

const mutations = {
    // Add others mutations here...
    createTodo,
    updateTodo,
    markTodoAsCompleted,
    deleteTodo
};

module.exports = mutations;

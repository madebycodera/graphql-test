import gql from 'graphql-tag';

/**
 * Adds a todo
 * @param  {String} description  todo description
 * @param  {Number} priority  todo priority (optional)
 * @return {List} the todos in the list
 */
export const addTodo = gql `
    mutation AddTodo($description: String!, $priority: Int) {
        addTodo(description: $description, priority: $priority) {
            _id
            description
            createdAt
            completed
            priority
        }
    }
`;

/**
 * Deletes a todo
 * @param  {String} id  todo id
 * @return {List} the todos left
 */
export const deleteTodo = gql`
    mutation DeleteTodo($id: String!) {
        deleteTodo(id: $id) {
            _id
            description
            createdAt
            priority
            completed
        }
    }
`;

/**
 * Toggles done for a todo
 * @param  {String} id  todo id
 * @param  {Bool} completed  todo completed bool value
 * @return {List} the todos updated
 */
export const toggleDone = gql `
    mutation ToggleDone($id: String!, $completed: Boolean!) {
        toggleDone(id: $id, completed: $completed) {
            _id
            description
            createdAt
            priority
            completed
        }
    }
`;

/**
 * Updates a todo
 * @param  {String} id  todo id
 * @param  {String} description  todo description
 * @param  {Number} priority  todo priority (optional)
 * @return {List} the updated todos in the list
 */
export const updateTodo = gql`
    mutation UpdateTodo($id: String!, $description: String!, $priority: Int) {
        updateTodo(id: $id, description: $description, priority: $priority) {
            _id
            description
            createdAt
            priority
            completed
        }
    }
`;




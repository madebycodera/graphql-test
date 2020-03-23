import gql from 'graphql-tag';

/**
 * Fetch todos
 * @return {List} the todos in the list
 */
export const fetchTodos = gql `
    { todos 
        { 
            id 
            description 
            createdAt 
            completed 
            priority
        }
    } 
`;

/**
 * Fetch a single todo
 * @param  {ID} id  todo id
 * @return {TodoType} the fetched todo
 */
export const fetchTodo = gql `
    query fetchTodo($id: ID!) {
        todo(id: $id) {
            id
            description
            createdAt
            completed
            priority
        }
    }
`;


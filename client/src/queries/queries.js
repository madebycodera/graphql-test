import gql from 'graphql-tag';

/**
 * Fetch todos
 * @return {List} the todos in the list
 */
export const fetchTodos = gql `
    { 
        todos { 
            _id 
            description 
            createdAt 
            completed 
            priority
        }
    } 
`;


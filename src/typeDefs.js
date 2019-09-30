import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    scalar Date

     type Todo {
        id: ID!
        description: String!
        createdAt: Date
        completed: Boolean
        priority: Int
    }

    type Query {
    
    """
    If there are no arguments it returns all Todos unsorted;
    Parameters: 
    sortField (String) — Could be one of the following fields: 'description', 'priority', 'createdAt',
    sortOrder (Integer) — 1 for ascending order, -1 for descending,
    completed (Boolean) — true to get all completed Todos, false for uncompleted
    """
        getAllTodos(sortField: String, sortOrder: Int, completed: Boolean): [Todo]
    }
    
    type Mutation {
    """
    Creates a new Todo and returns it;
    Parameters: 
    description (String, required)
    priority (Integer, default: 1)
    """ 
        createTodo(
            description: String!
            priority: Int
        ): Todo
    """
    Deletes single Todo with id provided
    Parameters:
    id (String, required)
    """
        deleteTodo(
            id: String!
        ): Boolean
    """
    Updates description and priority of Todo with id provided    
    Parameters:
    id (String, required)
    description (String, required)
    priority (Integer, default: 1)
    """
        updateTodo(
            id: String!,
            description: String!,
            priority: Int
        ): Todo
     """
     Marks Todo as completed
     Parameters:
     id (String, required)
     """
        markTodo(
            id: String!
         ): Todo
    }
 `;

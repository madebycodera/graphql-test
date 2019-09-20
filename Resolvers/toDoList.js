import { ToDoList } from '../Models'

const sortByFields = {
  description: true,
  createdAt: true,
  priority: true
}
const sortOrders = ['asc', 'desc', 'ascending', 'descending']

export default {
  Query: {
    todoList: async (
      _,
      { sortBy = 'createdAt', order = sortOrders[1], completed = false }
    ) => {
      try {
        const sortQuery = {}
        // deciding if we should sort and what is the order
        if (sortBy && sortByFields[sortBy]) {
          sortQuery[sortBy] = sortOrders.includes(order) ? order : sortOrders[1]
        }

        const todoList = await ToDoList
          .find({
            completed
          })
          .sort(sortQuery)
          .lean(true).exec()
        return todoList
      } catch (e) {
        logger.error(e)
        return []
      }
    },
    oneTodo: async (_, { id }, { models }) => {
      try {
        const todo = await ToDoList.findById(id).lean(true).exec()
        return todo
      } catch (e) {
        logger.error(e)
        return {}
      }
    }
  },

  Mutation: {
    createTodo: async (
      _,
      { description, completed, priority = 1 },
      { models }
    ) => {
      try {
        const todo = new ToDoList({
          description,
          completed: completed || false,
          priority
        })
        const newTodo = await todo.save()
        return newTodo
      } catch (e) {
        logger.error('Error', e)
        throw e
      }
    },
    updateTodo: async (_, { id, ...data }) => {
      try {
        const { priority } = data
        if (priority === 0 || (priority && priority < 1)) throw new Error('priority must be 1 or greater')

        const updatedTodo = await ToDoList.findOneAndUpdate({ _id: id }, data, { new: true }).exec()
        return updatedTodo
      } catch (e) {
        logger.error('Error', e)
        throw e
      }
    },
    markTodoAsCompleted: async (_, { id }) => {
      try {
        const updatedTodo = await ToDoList.findOneAndUpdate({ _id: id }, { completed: true }, { new: true }).exec()
        return updatedTodo
      } catch (e) {
        logger.error('Error', e)
        throw e
      }
    },
    deleteTodo: async (_, { id }) => {
      try {
        const deletedData = await ToDoList.deleteOne({ _id: id }).exec()
        logger.info('deletedData', deletedData)
        return { _id: id }
      } catch (e) {
        logger.error('Error', e)
        throw e
      }
    },
  },
}

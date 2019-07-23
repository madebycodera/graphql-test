import { Todos } from '../Models'

const sortByFields = {
  description: true,
  createdAt: true,
  priority: true
}
const sortOrders = ['asc', 'desc', 'ascending', 'descending']

export default {
  Query: {
    todos: async (
      _,
      { sortBy = 'createdAt', order = sortOrders[1], completed = false }
    ) => {
      try {
        const sortQuery = {}
        // deciding if we should sort and what is the order
        if (sortBy && sortByFields[sortBy]) {
          sortQuery[sortBy] = sortOrders.includes(order) ? order : sortOrders[1]
        }

        const todos = await Todos
          .find({
            completed
          })
          .sort(sortQuery)
          .lean(true).exec()
        return todos
      } catch (e) {
        console.log(e)
        return []
      }
    },
    todo: async (_, { id }, { models }) => {
      try {
        const todo = await Todos.findById(id).lean(true).exec()
        return todo
      } catch (e) {
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
        const todo = new Todos({
          description,
          completed: completed || false,
          priority
        })
        const newTodo = await todo.save()
        return newTodo
      } catch (e) {
        console.log('Error', e)
        throw e
      }
    },
    deleteTodo: async (_, { id }) => {
      try {
        const deletedData = await Todos.deleteOne({ _id: id }).exec()
        console.log('deletedData', deletedData)
        return { _id: id }
      } catch (e) {
        console.log('Error', e)
        throw e
      }
    },
    updateTodo: async (_, { id, ...data }) => {
      try {
        const { priority } = data
        if (priority === 0 || (priority && priority < 1)) throw new Error('priority must be 1 or greater')

        const updatedTodo = await Todos.findOneAndUpdate({ _id: id }, data, { new: true }).exec()
        return updatedTodo
      } catch (e) {
        console.log('Error', e)
        throw e
      }
    },
    markCompleted: async (_, { id }) => {
      try {
        const updatedTodo = await Todos.findOneAndUpdate({ _id: id }, { completed: true }, { new: true }).exec()
        return updatedTodo
      } catch (e) {
        console.log('Error', e)
        throw e
      }
    }
  }
}

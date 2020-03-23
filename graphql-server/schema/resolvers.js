ObjectID = require('mongodb').ObjectID

const resolvers = {
  Query: {
    todos: async () => {
      return await db.collection('todos').find().toArray().then(res => {
        return res
      });
    }
  },
  Mutation: {
    addTodo: async (_, args) => {
      await db.collection('todos').insertOne({
        description: args.description,
        priority: args.priority || 1,
        createdAt: new Date(),
        completed: false
      })
      return await db.collection('todos').find().toArray().then(res => {
        return res
      });
    },
    deleteTodo: async (_, args) => {
      await db.collection('todos').deleteOne({ _id: ObjectID(args.id) })
      return await db.collection('todos').find().toArray().then(res => {
        return res
      });
    },
    toggleDone: async (_, args) => {
      await db.collection('todos').updateOne({ _id: ObjectID(args.id) }, {
        $set: { completed: !args.completed }
      })
      return await db.collection('todos').find().toArray().then(res => {
        return res
      });
    },
    updateTodo: async (_, args) => {
      await db.collection('todos').updateOne({ _id: ObjectID(args.id) }, {
        $set: { description: args.description, priority: args.priority }
      })
      return await db.collection('todos').find().toArray().then(res => {
        return res
      });
    }
  }
};

module.exports = resolvers;

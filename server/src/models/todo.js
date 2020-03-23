const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  description: { type: String },
  createdAt: { type: Date },
  completed: { type: Boolean, default: false },
  priority: { type: Number, default: 1 }
});

TodoSchema.statics.addTodo = function(description, priority) {
  const Todo = mongoose.model('todo');
  return new Todo({ 
    description: description, 
    priority: priority,
    createdAt: new Date() 
  }).save()
    .then(() => Todo.find({})
      .then(todos => todos));
}

TodoSchema.statics.deleteTodo = function(id) {
  const Todo = mongoose.model('todo');
  const todo = Todo.findById(id);
  return Todo.deleteOne({ _id: id })
    .then(() => Todo.find({})
      .then(todos => todos));
}

TodoSchema.statics.toggleDone = function(id, completed) {
  const Todo = mongoose.model('todo');
  return Todo.updateOne({ _id: id }, { completed: !completed })
    .then(() => Todo.find({})
      .then(todos => todos));
}

TodoSchema.statics.updateTodo = function(id, description, priority) {
  const Todo = mongoose.model('todo');
  return Todo.updateOne({_id: id }, {
    description: description,
    priority: priority
  })
    .then(() => Todo.find({})
      .then(todos => todos));
}

module.exports = mongoose.model('todo', TodoSchema);

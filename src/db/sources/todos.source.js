const { Todos } = require('../service');

const getAllTodos = (data = {}) => {
  const { sortField = null, sortOrder = 'asc', completed = null } = data;
  const query = {};
  if (completed !== null) { query.where = { completed }; }
  if (sortField !== null) { query.order = [[sortField, sortOrder.toUpperCase()]]; }
  return Todos.findAll(query)
    .then(res => res.map(todo => computeTodo(todo)));
};

const createTodo = ({ description, priority }) => {
  const newPriority = priority < 1 ? 1 : priority;
  return Todos.create({ description, priority: newPriority })
    .then(todo => computeTodo(todo));
};

const deleteTodo = ({ id }) => Todos.destroy({ where: { id } })
  .then(() => `Todo with id: ${id} has been successfully deleted.`);

const updateTodo = ({ id, description, priority }) => {
  const newPriority = priority < 1 ? 1 : priority;
  return Todos.update({ description, priority: newPriority }, { where: { id } })
    .then(() => Todos.findOne({ where: { id } }))
    .then(todo => computeTodo(todo));
};

const completeTodo = ({ id }) => Todos.update({ completed: true }, { where: { id } })
  .then(() => Todos.findOne({ where: { id } }))
  .then(res => computeTodo(res));

const computeTodo = todo => ({
  id: todo.id,
  description: todo.description,
  completed: todo.completed,
  createdAt: todo.createdAt,
  priority: todo.priority,
});

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  completeTodo,
};

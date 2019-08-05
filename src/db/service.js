const Sequelize = require('sequelize');
const TodosModel = require('./models/todos.model');

const sequelize = new Sequelize('database', 'dunice', 'dunice', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const init = () => sequelize.sync();
const Todos = sequelize.define('todos', TodosModel());

module.exports.database = sequelize;
module.exports.Todos = Todos;
module.exports.init = init;

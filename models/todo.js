const Sequelize = require('sequelize')
const Model = Sequelize.Model
const sequelize = require('../db')

class Todo extends Model {}
Todo.init({
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  priority: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  }
}, {
  sequelize,
  modelName: "todo"
})

module.exports = Todo

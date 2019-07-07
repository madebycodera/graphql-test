const Sequelize = require('sequelize');

module.exports = sequelize => {
  const todos = sequelize.define(
    'todos',
    {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      createdAt: {
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      completed: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      priority: {
        defaultValue: 1,
        type: Sequelize.INTEGER
      }
    },
    { timestamps: false }
  );
  return todos;
};

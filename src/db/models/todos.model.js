const Sequelize = require('sequelize');

module.exports = () => ({
  description: {
    type: Sequelize.TEXT,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  priority: {
    defaultValue: 1,
    type: Sequelize.INTEGER,
  },
});

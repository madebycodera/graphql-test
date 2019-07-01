'use strict';

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        notNull: true
      }
    },
    description: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    completed: DataTypes.BOOLEAN,
    priority: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};
const Sequelize = require("sequelize");

class Todo extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        completed: Sequelize.BOOLEAN,
        priority: Sequelize.INTEGER
      },
      {
        sequelize,
        updatedAt: false
      }
    );
  }
}

module.exports = Todo;

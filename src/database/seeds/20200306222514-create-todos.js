"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "todos",
      [
        {
          description: "Learn about graphql",
          completed: true,
          priority: 1,
          created_at: new Date()
        },
        {
          description: "Make node api with graphql using Apollo server",
          priority: 10,
          completed: false,
          created_at: new Date()
        },
        {
          description: "Make expo app to uso graphql api",
          completed: false,
          priority: 1,
          created_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("todos", null, {});
  }
};

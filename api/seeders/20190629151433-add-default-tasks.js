'use strict';
var uuid = require('uuid-random');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Tasks', 
          [{ id: uuid(), description: "Buy milk", createdAt: new Date(), completed: false, priority: 1}, 
           { id: uuid(), description: "Buy bread", createdAt: new Date(), completed: false, priority: 2}, 
           { id: uuid(), description: "Do exercise", createdAt: new Date(), completed: false, priority: 3}, 
           { id: uuid(), description: "Go cycling", createdAt: new Date(), completed: true, priority: 4}, ], 
        {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Tasks', null, {});

  }
};

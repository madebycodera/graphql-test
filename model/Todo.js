const Sequelize = require('sequelize');

class Todo {
    constructor(sequelize){
        return sequelize.define('todo', {
            // attributes
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            completed: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            priority: {
                type: Sequelize.SMALLINT,
                allowNull: false
            }
        }, {
            updatedAt: false,
            tableName: "todo"
        })
    }
}

module.exports = Todo;

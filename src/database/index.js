const Sequelize = require("sequelize");

const databaseConfig = require("../config/database");

const Todo = require("../app/models/Todo");

const models = [Todo];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

module.exports = new Database();

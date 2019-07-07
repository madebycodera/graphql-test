const Sequelize = require('sequelize');
const config = require('config');
const dbConfig = config.get('db');
const models = require('../models');

const createSequilize = () => {
  const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
  Object.keys(models).forEach(name => {
    const model = models[name](sequelize);
    if ('associate' in model) {
      model.associate(sequelize.models);
    }
  });

  return sequelize;
};

module.exports = createSequilize;

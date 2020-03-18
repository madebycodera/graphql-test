const Sequelize = require('sequelize');
const Todo = require('./model/Todo');
env = require('dotenv').config({ path: './db.env' });

// instance of sequelize ORM
const sequelize =
    new Sequelize(
        'postgres://'+
        env.parsed.DB_USER+':'+
        env.parsed.DB_PASS+'@'+
        env.parsed.DB_HOST+':'+
        env.parsed.DB_PORT+'/'+
        env.parsed.DB_NAME
    );

let todoModel = new Todo(sequelize);

connectToDB = async() => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

connectToDB();

const dbModel = {
    // add others model here...
    Todo: todoModel
};

module.exports = dbModel;

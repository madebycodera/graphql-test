const connectionString = 'postgres://kek:kek@localhost:15432/test?sslmode=disable';
const pgp = require('pg-promise')();
const db = {};
db.conn = pgp(connectionString);

module.exports = db.conn;
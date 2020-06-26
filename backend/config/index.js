const { Pool } = require("pg");
const connectionString =
  "postgresql://postgres:Admin@localhost:5432/graphql_test";

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = { pool };

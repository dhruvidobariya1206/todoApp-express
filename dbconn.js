const Pool = require('pg-pool');

module.exports = {
  pool: new Pool({
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
  }),
};

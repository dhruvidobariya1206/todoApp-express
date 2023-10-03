const Pool = require('pg-pool');
require('dotenv').config({ path: './.env' })

const pool = new Pool({
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.HOST
});

    
module.exports = pool;
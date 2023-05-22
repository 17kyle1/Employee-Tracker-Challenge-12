const mysql = require('mysql2');

require('dotenv').config();
const connection = mysql.createConnection({
    host: 'DB_HOST',
    user: 'DB_USER',
    password: 'DB_PASSWORD',
    database: 'DB_DATABASE'
});

module.exports = connection;
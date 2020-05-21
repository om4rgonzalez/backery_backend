const mysql = require('mysql2');

const mysqlConnection = mysql.createPool({
    host: '66.97.39.33',
    user: 'root',
    password: 'Pascal123!',
    database: 'dbTurnos',
    multipleStatements: true
});


const promisePool = mysqlConnection.promise();

module.exports = promisePool;
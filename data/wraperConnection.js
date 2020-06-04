const mysql = require('mysql2');

const mysqlConnection = mysql.createPool({
    host: '66.97.38.48',
    user: 'jorge',
    password: 'Bintelligence123!',
    database: 'dbBackery',
    multipleStatements: true
});


const promisePool = mysqlConnection.promise();

module.exports = promisePool;
const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
    host: '66.97.38.48',
    user: 'jorge',
    password: 'Bintelligence123!',
    database: 'dbBackery',
    multipleStatements: true
});


mysqlConnection.connect(function(err) {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log('db esta conectada');
    }
});

module.exports = mysqlConnection;
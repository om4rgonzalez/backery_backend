module.exports = {

    database: {
        connectionLimit: 10,
        host: process.env.URLDB,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        multipleStatements: true
    }

};
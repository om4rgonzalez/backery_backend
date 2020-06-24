//  PUERTO
process.env.PORT = process.env.PORT || 3001;

//URL DEL SERVICIO
process.env.URL_SERVICE = process.env.URL_SERVICE || 'http://localhost:'

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev;'

//base de datos
let urlDB;
if (process.env.NODE_ENV == 'prod') {
    urlDB = process.env.DB_HOST;
    dbUSer = process.env.DB_USER;
    dbPass = process.env.DB_PASS;
    dbName = process.env.DB_NAME;
} else {
    urlDB = 'localhost'
    dbUSer = 'admin';
    dbPass = 'admin';
    dbName = 'test';
}


process.env.URLDB = urlDB;
process.env.DBUSER = dbUSer;
process.env.DBPASS = dbPass;
process.env.DBNAME = dbName;

// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

process.env.TASA_DOMICILIO = 0.01;
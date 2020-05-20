require('../config/config');
const mysqlConnection = require('../data/datamanager');
const express = require('express');
const app = express();


//////////////////////////////////


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


//indice de rutas
app.use(require('../routes'));
// app.use(require('./server_direccion/server_direccion'));
// app.use(require('./server_contacto/server_contacto'));
// app.use(require('./server_ioventas/server_ioventas'));
// app.use(require('./server_pedidos/pedidos'));
//app.use(require('./server_stock/productos'));
// app.use(require('./server_empresas/usuarios'));
// app.use(require('./server_clientes/server_clientes'));
// app.use(require('./server_empresas/server_empresas'));
// app.use(require('./server_utiles/utiles'));







mysqlConnection.connect(function(err) {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log("Core ejecutandose en el entorno " + process.env.NODE_ENV);
        console.log('Base de datos ONLINE');
    }
});
app.listen(process.env.PORT, () => {
    console.log('Usuario Escuchando el puerto ', process.env.PORT);

});
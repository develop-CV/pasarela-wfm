const express = require('express');
const app = express();

// Habilitar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

// Datos de Configuracion
app.set('port', process.env.PORT || 3000); /* process.env.PORT: si existe un puerto definido en la nube lo toma sino toma el 3000 */
app.set('json spaces', 2);  /* Mostrar mas ordenado el JSON que devuelve el servidor */

app.use(express.urlencoded({extended:false})); // Entender los datos que llegan de formularios
app.use(express.json()); // Poder recibir formatos JSON y entenderlos

// Rutas (routes)
/*
app.use('/api/user', require('./routes/usuarios.js'));
app.use('/api/wseps', require('./routes/wseps.js'));
app.use('/api/config', require('./routes/config.js'));
app.use('/api/mae', require('./routes/maestros.js'));
app.use('/api/consumir', require('./ConsumosEPS/comandConsumos.js'));
*/
app.use('/api/prueba', require('./routes/pruebas.js'));

// Iniciamos el servidor
app.listen(app.get('port'), () => {
    console.log("Server en puerto: " + app.get('port'));
})
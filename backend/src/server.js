const express = require('express');
const cors = require('cors');

const app = express();

// Habilitar CORS
app.use(cors());

var sitios = ['localhost'];
var corsOption = {
    origin: function(origin, callback){
        if(sitios.indexOf(origin) !== -1){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'))
        };
    },
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
};
app.get('/', cors(corsOption), (req, res) => { });

// Datos de Configuracion
app.set('port', process.env.PORT || 3000); /* process.env.PORT: si existe un puerto definido en la nube lo toma sino toma el 3000 */
app.set('json spaces', 2);  /* Mostrar mas ordenado el JSON que devuelve el servidor */

app.use(express.urlencoded({ extended: false })); // Entender los datos que llegan de formularios
app.use(express.json()); // Poder recibir formatos JSON y entenderlos

// Rutas (routes)
app.use('/api/prueba', require('./routes/pruebas.js'));
app.use('/api/login', require('./routes/login.js'));

// Iniciamos el servidor
app.listen(app.get('port'), () => {
    console.log("Server en puerto: " + app.get('port'));
})
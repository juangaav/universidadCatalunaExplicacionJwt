const mongoose = require('mongoose');
const usuario = 'pruebadeconcepto';
const clave = 'gCkwomtmp1ajgAnt';
const baseDatos = 'db_vehiculo';
const uri = `mongodb+srv://${usuario}:${clave}@cluster0.69kx2.mongodb.net/${baseDatos}?retryWrites=true&w=majority`;

//Creamos la conexion a la base de datos
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Una vez se importe el archivo desde index.js
//Invoca automaticamente la coneccion
const baseDeDatos = mongoose.connection;

//Mensaje si tenemos error al conectarnos a la base de datos
baseDeDatos.on('error', () => {
    console.error.bind(console, 'Error al conectarse a la base de datos');
});

//Mensaje si nos conectamos exitosamente a la base de datos
baseDeDatos.once('open', () => {
    console.log('Conectado a la base de datos');
});

module.exports = baseDeDatos;
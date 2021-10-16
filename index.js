const express = require('express');
const usuarios = require('./routes/usuarios');
const vehiculos = require('./routes/vehiculos');
//Inicializamos la conexion a la base de datos
const baseDeDatos = require('./baseDeDatos');
const app = express();
const port = 4000;

//Convertimos todo a JSON, no necesitamos el body-parser porque estamos usando la ultima version
//de express
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//LLamamos el enrutamiento de express
//Archivo creado para centralziar todas las rutas
app.use(usuarios);
app.use(vehiculos);

app.listen(port, () => {
    console.log(`server http://localhost:${port}`);
})
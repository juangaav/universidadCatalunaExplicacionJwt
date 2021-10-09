//Node, express y jwt
const express = require('express');

const host = 'localhost';
const port = 3000;

const app = express();

app.get('/api', (request, response) => {
    response.json({
        message: "Bienvenido a mi API"
    })
});

app.post('/api/login', (request, response) => {
    //emular que este es el body que enviamos junto al metodo POST
    const usuario = {
        id: 1,
        nombre: 'Gustavo Garcia',
        email: 'gustavogblanco@live.com'
    }
    //Responder el body que enviamos a la peticion
    response.json({
        usuario
    })
});

app.post('/api/posts', (request, response) => {
    response.json({
        message: 'post creado'
    })
})

app.listen(port, host, () => {
    `Aplicacion funcionando sobre http://${host}:${port}`
})

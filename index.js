//Node, express y jwt
const express = require('express');
const jwt = require('jsonwebtoken');

const host = 'localhost';
const port = 3000;

const app = express();
//Middleware
//app.use(); -> Middleware
app.use(express.json());

app.get('/api', (request, response) => {
    response.json({
        message: "Bienvenido a mi API"
    })
});

//emulando el body del body y la validacion en base de datos
/*app.post('/api/login', (request, response) => {
    //emular que este es el body que enviamos junto al metodo POST
    const usuario = {
        id: 1,
        nombre: 'Gustavo Garcia',
        email: 'gustavogblanco@live.com'
    }
    
    //validar si el usuario esta autenticado para generar el token
    //Sintaxis -> jwt.sign(payload, secret, [options, callback])
    //Si tenemos un callback estamos trabajando con comunicacion asincrona
    jwt.sign({usuario}, 'secretKey', (err, token) => {
        if(err) {
            response.json({
                menssage: 'Error al crear el token'
            })
        } else {
            response.json({
                token
            })
        }
    });
    //Si no tenemos un callback estamos trabajando con comunicacion sincrona
    //jwt.sign({usuario}, 'secretKey');

});*/

//emular la informacion en la base de datos
app.post('/api/login', (request, response) => {
    //emular la informacion en la base de datos
    const usuario = {
        username: 'gustavogblanco',
        password: 12345678
    }

    if(request.body.username) {
        if(request.body['username'] === usuario.username && request.body['password'] === usuario.password) {
            jwt.sign({usuario: usuario}, 'secretKey', (err, token) => {
                response.json(
                    {token}
                )
            } );
        } else {
            response.json(
                {message: 'usuario y/o clave errada'}
            )
        }
    } else {
        response.sendStatus(302);
    }
});
    
    //validar si el usuario esta autenticado para generar el token
    //Sintaxis -> jwt.sign(payload, secret, [options, callback])
    //Si tenemos un callback estamos trabajando con comunicacion asincrona
    /*jwt.sign({usuario}, 'secretKey', (err, token) => {
        if(err) {
            response.json({
                menssage: 'Error al crear el token'
            })
        } else {
            response.json({
                token
            })
        }
    });
    //Si no tenemos un callback estamos trabajando con comunicacion sincrona
    //jwt.sign({usuario}, 'secretKey');
    });*/

app.post('/api/posts', (request, response) => {
    response.json({
        message: 'post creado'
    })
})

app.listen(port, host, () => {
    `Aplicacion funcionando sobre http://${host}:${port}`
})
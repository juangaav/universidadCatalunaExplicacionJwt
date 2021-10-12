//Node, express y jwt
var express = require('express');
const jwt = require('jsonwebtoken');
//manejar la conexion con la base de datos de mongo
//ODM - Bases de datos no relaciones
//ODM - Se asigna entre un modelo de objetos y una base de datosno relacional.
//ORM - Bases de datos relaciones
//ORM - Se asigna entre un modelo de objetos y una base de datos relacional.
const mongoose = require('mongoose');
const vehiculoControlador = require('../controllers/vehiculoController');
const vehiculoModelo = require('../models/Vehiculo');
const vehiculoRutas = express.Router();

const host = 'localhost';
const port = 4000;

const app = express();
//Middleware
//las funciones middleware son funcion que tienen acceso al request, repesonse y a la siguiente funcion.
//Ejecutar cualquier codigo, realizar cambios en el rquest y el response, finalizar ciclos y respuestas,
//y pueden invocar otars funciones middleware
//app.use(); -> Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

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
            jwt.sign({usuario: usuario}, 'secretKey', {expiresIn: '30s'},(err, token) => {
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

//funcion que valida el token
// Authorization: Bearer <token>
const verifyToken = (request, response, next) => {
    //rescatamos la propiedad authorization que viaja en el requestHEader desde mi cliente al servidor
    const bearerHeader = request.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        //['Bearer', <token>];
        request.token = bearerToken;
        next();
    } else {
        response.sendStatus(403);
    }
}

app.post('/api/posts', verifyToken, (request, response) => {
    //Sintaxis -> jwt.verify(jwtString, llavePublicaOPrivada, [options, callback])
    jwt.verify(request.token, 'secretKey', (err, auth) => {
        if(err) {
            response.sendStatus(500);
        }
        else {
            response.json({
                message: 'post creado',
                auth: auth
            })
        }
    })
})

/*app.get('/api', (request, response) => {
    response.json({
        message: "Bienvenido a mi API"
    })
});*/
app.get('/Vehiculo', function (resquest, response) {
    console.log('GET');
    vehiculoModelo.find({}, (err, data) => {
        if(err) {
            response.send(500, err.message);
        } else {
            console.log('GETALL /vehiculos');
            response.status(200).jsonp(data);
        }
    });
});
app.post('*', function(req, response){
    console.log('POST');
    console.log(req.body);

    /*let vehiculo = new vehiculoModelo({
        idVehiculo: mongoose.Types.ObjectId(),
        modelo: request.body.modelo,
        color: request.body.color,
        marca: request.body.marca,
        cilindraje: request.body.cilindraje
    });*/

    let vehiculo = new vehiculoModelo({
        modelo: "2008",
        color: "verde",
        marca: "Mazda",
        cilindraje: 2000
    });

    vehiculoModelo.create(vehiculo, function(err, vehiculo) {
        if(err) {
            return response.status(500).send(err.message);
        } else {
            response.send(vehiculo);
        }
    })
});
/*.get(vehiculoControlador.findAllVehiculos)
.post(vehiculoControlador.addVehiculo)*/

var userMongoAtlas = 'pruebadeconcepto';
var passwordMongoAtlas = 'cPQ9PxAN4y5HyyW';
var uriMongoAtlas = `mongodb+srv://${userMongoAtlas}:${passwordMongoAtlas}@cluster0.69kx2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
`

mongoose.connect(uriMongoAtlas, (err, response) => {
    if(err) {
        console.log('ERROR al conectarse a la base de datos' + err);
    }

    else {

    }
})

app.listen(port, host, () => {
    console.log(`Aplicación funcionando sobre http://${host}:${port}`)
})
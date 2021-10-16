const { request } = require('express');
const mongoose = require('mongoose');
const vehiculoModelo = require('../models/Vehiculo');
const jwt = require('jsonwebtoken');

const verifyToken = (token, secretKey) => {
    //rescatamos la propiedad authorization que viaja en el requestHEader desde mi cliente al servidor
    const bearerToken = token.split(' ')[1];
    return new Promise((resolve, reject) => {
        jwt.verify(bearerToken, secretKey, (err, auth) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(auth);
            }
        })
    })
}

//Traer toda la informacion
module.exports.findAllVehiculos = (request, response) => {
    //find({query}, callback) -> query que hacemos para buscar informacion, como en este caso es 
    //vacio, nos trae todo la informacion
    const token = request.headers['authorization'];
    const secretKey = request.headers['secretkey'];

    if(token == undefined || secretKey == undefined) {
        response.sendStatus(401);
    }else {
        verifyToken(token, secretKey).then(token => {
            vehiculoModelo.find({}, (err, data) => {
                if (err) {
                    response.send(500).json({
                        message: 'Error a ejecutar el metodo findAll()'
                    });
                } else {
                    if (data.length == 0) {
                        response.status(204).send(data);
                    } else {
                        response.status(200).send(data);
                    }
                }
            })
        }).catch((err) => {
            console.log(err);
            response.status(403).json({message: 'fallas en la autenticacion'});
            //response.status(403).send('<string>');
            //response.status(403).json({json});
        });
    }
}

//Traer un vehiculo por id
module.exports.findByIdVehiculo = (request, response) => {
    //pedimos el url param que nos envia la ruta
    const idVehiculo = request.params['idvehiculo'];
    console.log('GET');
    console.log(`id: ${idVehiculo}`);
    //findOne({query}, cllaback) -> query que hacemos para buscar el idVehiculo que enviamos como un 
    //url param
    vehiculoModelo.findOne({ idVehiculo: idVehiculo }, (err, vehiculo) => {
        if (err) {
            response.send('El idVehiculo no existe');
        } else {
            response.send(vehiculo);
        }
    })
}

//Traer un vehiculo por id
module.exports.findByRange = (request, response) => {
    //pedimos el url param que nos envia la ruta
    const { min, max } = request.query;
    console.log('GET');
    const minQuery = (min == undefined) ? 0 : Number(min);
    const maxQuery = (max == undefined) ? Number.MAX_VALUE : Number(max);
    const query = { $gt: minQuery, $lt: maxQuery };
    console.log(query);

    //findOne({query}, cllaback) -> query que hacemos para buscar el idVehiculo que enviamos como un 
    //url param
    vehiculoModelo.find({ cilindraje: query }, 'color marca', (err, vehiculo) => {
        if (err) {
            response.send('El idVehiculo no existe');
        } else {
            response.send(vehiculo);
        }
    })
}

//Traer un vehiculo por marca
module.exports.findByMarca = (request, response) => {
    //pedimos el url param que nos envia la ruta
    const marca = request.params['marca'];
    console.log('GET');
    console.log(`marca: ${marca}`);
    //findOne({query}, cllaback) -> query que hacemos para buscar el idVehiculo que enviamos como un 
    //url param
    vehiculoModelo.find({ marca: marca }, (err, vehiculo) => {
        if (err) {
            response.send('No hay vehiculos con esa marca');
        } else {
            response.send(vehiculo);
        }
    })
}

//Crear un vehiculo
module.exports.addVehiculo = (request, response) => {
    console.log('POST');
    console.log(request.body);

    const vehiculo = new vehiculoModelo({
        idVehiculo: mongoose.Types.ObjectId(),
        modelo: request.body.modelo,
        color: request.body.color,
        marca: request.body.marca,
        cilindraje: request.body.cilindraje
    });

    //modelo.save() -> Esta diseñado para insertar documentos llamando el modelo que se a creado
    //sin necesidad de usar los metodos insert() o insertMany()
    vehiculo.save((err, vehiculo) => {
        if (err) {
            return response.status(500).send(err.message);
        } else {
            response.send(vehiculo);
        }
    })
}

//Editar un vehiculo por idVehiculo
module.exports.updateVehiculo = (request, response) => {
    console.log('EDIT');
    console.log(request.body);

    const id = request.body.idVehiculo;
    const modelo = request.body.modelo;
    const color = request.body.color;
    const marca = request.body.marca;
    const cilindraje = request.body.cilindraje;

    //findOneAndUpdate({query}, cllaback) -> query que hacemos para buscar el idVehiculo que enviamos como un 
    //url param. Este metodo me busca solo un documento y si lo encuentra lo actualiza
    vehiculoModelo.findOneAndUpdate({ idVehiculo: id }, { modelo, color, marca, cilindraje }, (err, vehiculo) => {
        if (err) {
            return response.status(500).send(err.message);
        } else {
            response.send(vehiculo);
        }
    })
}

//Eliminar un vehiculo por idVehiculo
module.exports.deleteVehiculo = (request, response) => {
    console.log('EDIT');
    console.log(request.body);

    const id = request.body.idVehiculo;

    //findOneAndDelete({query}, cllaback) -> query que hacemos para buscar el idVehiculo que enviamos como un 
    //url param. Este metodo me busca solo un documento y si lo encuentra lo elimina
    vehiculoModelo.findOneAndDelete({ idVehiculo: id }, (err, vehiculo) => {
        if (err) {
            return response.status(500).send(err.message);
        } else {
            response.send(vehiculo);
        }
    })
}
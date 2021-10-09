const mongoose = require('mongoose');
const vehiculoModelo = require('../controllers/vehiculo');

//Trabajar con la base de datos
//Traer toda la informacion
exports.findAllVehiculos = function (resquest, response) {
    vehiculoModelo.find({}, (err, data) => {
        if(err) {
            response.send(500, err.message);
        } else {
            console.log('GETALL /vehiculos');
            response.status(200).jsonp(data);
        }
    })
}

//Crear un vehiculo
exports.addVehiculo = function(request, response) {
    console.log('POST');
    console.log(request.body);

    let vehiculo = new vehiculoModelo({
        idVehiculo: new ObjectId(),
        modelo: request.body.modelo,
        color: request.body.color,
        marca: request.body.marca,
        cilindraje: request.body.cilindraje
    });

    vehiculoModelo.save((err, vehiculo) => {
        if(err) {
            return response.status(500).send(err.message);
        } else {
            res.status(200).jsonp(vehiculo);
        }
    })
}
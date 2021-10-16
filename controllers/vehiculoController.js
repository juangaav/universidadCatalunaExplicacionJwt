const { request } = require('express');
const mongoose = require('mongoose');
const vehiculoModelo = require('../models/Vehiculo');

//Traer toda la informacion
module.exports.findAllVehiculos = (resquest, response) => {
    console.log('GETALL vehiculos');
    //find({query}, callback) -> query que hacemos para buscar informacion, como en este caso es 
    //vacio, nos trae todo la informacion
    vehiculoModelo.find({}, (err, data) => {
        if(err) {
            response.send(500).json({
                message: 'Error a ejecutar el metodo findAll()'
            });
        } else {
            if(data.length == 0) {
                response.status(204).send(data);
            } else {
                response.status(200).send(data);
            }
        }
    })
}

//Traer un vehiculo por id
module.exports.findByIdVehiculo = (request, response) => {
    //pedimos el url param que nos envia la ruta
    const idVehiculo = request.params['idvehiculo'];
    console.log('GET');
    console.log(`id: ${idVehiculo}`);
    //findOne({query}, cllaback) -> query que hacemos para buscar el idVehiculo que enviamos como un 
    //url param
    vehiculoModelo.findOne({idVehiculo: idVehiculo}, (err, vehiculo) => {
        if(err) {
            response.send('El idVehiculo no existe');
        } else {
            response.send(vehiculo);
        }
    })
}

//Traer un vehiculo por id
module.exports.findByRange = (request, response) => {
    //pedimos el url param que nos envia la ruta
    const {min, max} = request.query;
    console.log('GET');
    const minQuery = (min == undefined ) ? 0 : Number(min);
    const maxQuery = (max == undefined ) ? Number.MAX_VALUE : Number(max);
    const query = {$gt: minQuery, $lt: maxQuery};
    console.log(query);

    //findOne({query}, cllaback) -> query que hacemos para buscar el idVehiculo que enviamos como un 
    //url param
    vehiculoModelo.find({cilindraje: query}, (err, vehiculo) => {
        if(err) {
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
    vehiculoModelo.find({marca: marca}, (err, vehiculo) => {
        if(err) {
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
        if(err) {
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
    vehiculoModelo.findOneAndUpdate({idVehiculo: id}, {modelo, color, marca, cilindraje}, (err, vehiculo) => {
        if(err) {
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
    vehiculoModelo.findOneAndDelete({idVehiculo: id}, (err, vehiculo) => {
        if(err) {
            return response.status(500).send(err.message);
        } else {
            response.send(vehiculo);
        }
    })
}

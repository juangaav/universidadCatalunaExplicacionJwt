const { request } = require('express');
const mongoose = require('mongoose');
const usuarioModelo = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ usuario: usuario }, 'secretKey', (err, token) => {
            if(err) {
                reject(err)
            } else {
                resolve(token)
            }
        });
    })
}

//Crea token
module.exports.token = (request, response) => {
    console.log('GETALL usuarios');
    console.log(request.body);
    //find({query}, callback) -> query que hacemos para buscar informacion, como en este caso es 
    //vacio, nos trae todo la informacion
    usuarioModelo.find({username: request.body.username, password: request.body.password}, (err, data) => {
        if (err) {
            response.send(500).json({
                message: 'Error a ejecutar el metodo findAll()'
            });
        } else {
            if (data.length == 0) {
                console.log('acceso desautorizado');
                response.sendStatus(403);
            } else {
                generarToken(request.body.username).then(token => {
                    console.log(token);
                    response.status(200).send({token});
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    })
}
const { request } = require('express');
const mongoose = require('mongoose');
const usuarioModelo = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const generarToken = (usuario, password) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ usuario, password }, 'secretKey', (err, token) => {
            if(err) {
                reject(err)
            } else {
                resolve(token)
            }
        });
    })
}

//Callback - Es una funcion dentro de una funcion, primero se ekecuta la funcion
//donde envio mi callback como parametro y despues se ejecuta el callback.

//Promesas - Nos retorma un resolve() y reject()

//Crea token
module.exports.token = (request, response) => {
    console.log('Token usuario');
    console.log(request.body);
    //find({query}, callback) -> query que hacemos para buscar informacion, como en este caso es 
    //vacio, nos trae todo la informacion
    usuarioModelo.find({username: request.body.username, password: request.body.password}, (err, data) => {
        if (err) {
            response.send(500).json({
                message: 'Error en la autenticacion'
            });
        } else {
            if (data.length == 0) {
                response.sendStatus(403);
            } else {
                generarToken(request.body.username, request.body.password).then(token => {
                    response.status(200).send({token});
                }).catch(error => {
                    response.status(500).json({error: 'Intentelo mas tarde'});
                });
            }
        }
    })
}
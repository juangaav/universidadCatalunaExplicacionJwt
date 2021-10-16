const express = require('express')
const router = express.Router()

const usuarioController = require('../controllers/usuarioController')

//ruta para crear un token de autenticacion
router.post('/login', usuarioController.token);

module.exports = router;
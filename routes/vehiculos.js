const express = require('express')
const router = express.Router()

const vehiculoController = require('../controllers/vehiculoController')

//ruta para traer todos los vehiculos
router.get('/', vehiculoController.findAllVehiculos);
//ruta para traer un vehiculo en especial
router.get('/vehiculo/:idvehiculo', vehiculoController.findByIdVehiculo);
//ruta para crear un vehiculo
router.post('/vehiculo', vehiculoController.addVehiculo);
//ruta para editar un vehiculo
router.put('/editarVehiculo', vehiculoController.updateVehiculo);
//ruta para eliminar un vehiculo
router.delete('/eliminarVehiculo', vehiculoController.deleteVehiculo);

module.exports = router;
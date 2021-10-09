const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//ObjectId -> retornar un valor hexadecimal de 24 bytes
//ejemplo de un objectId -> 000000010000000000000000
const ObjectId = Schema.ObjectId;

const VehiculoSchema = new Schema({
  idVehiculo: ObjectId,
  modelo: String,
  color: String,
  marca: String,
  cilindraje: Number
});

module.exports = mongoose.model('vehiculo', VehiculoSchema);
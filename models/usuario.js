const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  username: String,
  password: String
});

module.exports = mongoose.model('usuarios', UsuarioSchema);
'use strict'

// Vinculamos al esquema en mongo del usuario con nuestro modelo a través del ORM mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definimos la estructura del Modelo Usuario
var UserSchema = Schema({
	name: String,
	surname: String,
	email: String,
	password: String,
	rol: String,
	image: String
});

// Exportamos el modelo 
module.exports = mongoose.model('User', UserSchema);
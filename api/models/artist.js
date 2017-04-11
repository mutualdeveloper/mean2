'use strict'

// Vinculamos al esquema en mongo del usuario con nuestro modelo a través del ORM mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definimos la estructura del Modelo Artista
var ArtistSchema = Schema({
	name: String,
	description: String,
	image: String
});

// Exportamos el modelo 
module.exports = mongoose.model('Artist', ArtistSchema);
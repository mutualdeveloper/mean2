'use strict'

// Vinculamos al esquema en mongo del usuario con nuestro modelo a través del ORM mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definimos la estructura del Modelo Sonido
var SongSchema = Schema({
	number: String,
	name: String,
	duration: String,
	file: String,
	album: {type: Schema.ObjectId, ref: 'Album'}
});

// Exportamos el modelo 
module.exports = mongoose.model('Song', SongSchema);
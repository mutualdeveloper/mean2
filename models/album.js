'use strict'

// Vinculamos al esquema en mongo del usuario con nuestro modelo a través del ORM mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definimos la estructura del Modelo Album
var AlbumSchema = Schema({
	title: String,
	description: String,
	year: Number,
	image: String,
	artist: {type: Schema.ObjectId, ref: 'Artist'}
});

// Exportamos el modelo 
module.exports = mongoose.model('Album', AlbumSchema);
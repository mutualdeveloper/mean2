'use strict'

// Importamos el módulo de express
var express = require('express');
// Importamos el modelo de Artista
var ArtistController = require('../controllers/artist');
// Usamos el MiddleWares para proteger las rutas
var md_auth	= require('../middlewares/authenticated');
// Importamos la funcion Router de express
var api = express.Router();

// Importamos Connect-Multiparty para subir archivos
var multipart = require('connect-multiparty');
// Configuramos el path de subida de la imagen
var md_upload = multipart({uploadDir: './uploads/artists'});

// Creamos la ruta /artist (protegida por el middleware) de la api para solicitar los artistas
api.get('/artist/:id',md_auth.ensureAuth, ArtistController.getArtist);
api.get('/artists/:page?',md_auth.ensureAuth, ArtistController.getArtists);
api.post('/artist',md_auth.ensureAuth, ArtistController.saveArtist);
api.put('/artist/:id',md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/artist/:id',md_auth.ensureAuth, ArtistController.deleteArtist);
api.post('/upload-image-artist/:id',[md_auth.ensureAuth,md_upload], ArtistController.uploadImage);
api.get('/get-image-artist/:imageFile',ArtistController.getImageFile);


// Exportamos el módulo
module.exports = api;
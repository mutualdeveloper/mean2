'use strict'

// Importamos el módulo de express
var express = require('express');
// Importamos el modelo de Artista
var AlbumController = require('../controllers/album');
// Usamos el MiddleWares para proteger las rutas
var md_auth	= require('../middlewares/authenticated');
// Importamos la funcion Router de express
var api = express.Router();

// Importamos Connect-Multiparty para subir archivos
var multipart = require('connect-multiparty');
// Configuramos el path de subida de la imagen
var md_upload = multipart({uploadDir: './uploads/albums'});

// Creamos la ruta /artist (protegida por el middleware) de la api para solicitar los artistas
api.get('/album/:id',md_auth.ensureAuth, AlbumController.getAlbum);
api.post('/album',md_auth.ensureAuth, AlbumController.saveAlbum);
api.get('/albums/:artist?',md_auth.ensureAuth, AlbumController.getAlbums);
api.put('/album/:id',md_auth.ensureAuth, AlbumController.updateAlbum);
api.delete('/album/:id',md_auth.ensureAuth, AlbumController.deleteAlbum);
api.post('/upload-image-album/:id',[md_auth.ensureAuth,md_upload], AlbumController.uploadImage);
api.get('/get-image-album/:imageFile',AlbumController.getImageFile);



// Exportamos el módulo
module.exports = api;
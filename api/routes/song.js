'use strict'

// Importamos el módulo de express
var express = require('express');
// Importamos el modelo de Artista
var SongController = require('../controllers/song');
// Usamos el MiddleWares para proteger las rutas
var md_auth	= require('../middlewares/authenticated');
// Importamos la funcion Router de express
var api = express.Router();

// Importamos Connect-Multiparty para subir archivos
var multipart = require('connect-multiparty');
// Configuramos el path de subida de la imagen
var md_upload = multipart({uploadDir: './uploads/songs'});

// Creamos la ruta /artist (protegida por el middleware) de la api para solicitar los artistas
api.get('/song/:id',md_auth.ensureAuth, SongController.getSong);
api.post('/song',md_auth.ensureAuth, SongController.saveSong);
api.get('/songs/:album?',md_auth.ensureAuth, SongController.getSongs);
api.put('/song/:id?',md_auth.ensureAuth, SongController.updateSong);
api.delete('/song/:id?',md_auth.ensureAuth, SongController.deleteSong);
api.post('/upload-file-song/:id',[md_auth.ensureAuth,md_upload], SongController.uploadFile);
api.get('/get-song-file/:songFile',SongController.getSongFile);

// Exportamos el módulo
module.exports = api;
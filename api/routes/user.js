'use strict'

// Importamos el módulo de express
var express = require('express');
//Importamos el modelo de Usuario
var UserController = require('../controllers/user');
// Usamos el middleware para porteger las rutas
var md_auth = require('../middlewares/authenticated');
// Importamos la función ROuter de Express
var api = express.Router();

// Importamos Connect-Multiparty para subir archivos
var multipart = require('connect-multiparty');
// Configuramos el path de subida de la imagen
var md_upload = multipart({uploadDir: './uploads/users'});

// Rutas para consultar de usuario 
api.get('/probando-contorlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload],UserController.uploadImage);
api.get('/get-image-user/:imageFile',UserController.getImageFile);

// Exportamos el módulo 
module.exports = api;

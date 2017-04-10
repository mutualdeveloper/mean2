'use strict'

//Cargamos los modulos: express | body-parser para ser utilizados
var express = require('express');
var bodyParser = require('body-parser');

var app = express();


// Enlazar los archivos de las rutas que usará la API
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');

// Inicializamos bodyparse
app.use(bodyParser.urlencoded({extended:false}));

// BodyParse se encarga de convertir el body de las peticiones a JSON
app.use(bodyParser.json());



// Configuración de las cabeceras HTTP

// Usamos las rutas anteriormente enlazadas 
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);

//Exportamos app para poder ser utilizada desde index.js
module.exports = app;
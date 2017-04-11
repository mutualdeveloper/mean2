'use strict'

//Cargamos los modulos: express | body-parser para ser utilizados
var express = require('express');
var bodyParser = require('body-parser');

var app = express();


// Enlazar los archivos de las rutas que usará la API
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');
var song_routes = require('./routes/song');
// Inicializamos bodyparse
app.use(bodyParser.urlencoded({extended:false}));

// BodyParse se encarga de convertir el body de las peticiones a JSON
app.use(bodyParser.json());

// Configuración de las cabeceras HTTP (es un middleware)
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
    next();
});
// Usamos las rutas anteriormente enlazadas 
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', song_routes);
//Exportamos app para poder ser utilizada desde index.js
module.exports = app;
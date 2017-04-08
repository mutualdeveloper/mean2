//
'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//cargar rutas
var user_routes = require('./routes/user');

//inicializamos bodyparse
app.use(bodyParser.urlencoded({extended:false}));

//convertimos bodyparse a json
app.use(bodyParser.json());


// configurar cabeceras http

// rutas base
app.use('/api', user_routes);





module.exports = app;
'use strict'

// Cargo el ORM para manejar la BD
var mongoose = require('mongoose');
// Importamos las configuraciones de express del archivo app
var app = require('./app');
// Seteamos el puerto por el que escuchará la api
var port = process.env.PORT || 3977;

// Realizamos la conexión a mongo
mongoose.connect('mongodb://localhost:27017/curso_mean2', (err,res) =>{
	if(err){
		throw err;
	}else{
		console.log('La conexión a la base de datos está funcionando correctamente...');
		app.listen(port, function(){
			console.log('Servidor del API Rest de musica escuchando en http://localhost:' + port);
		});
	}
});


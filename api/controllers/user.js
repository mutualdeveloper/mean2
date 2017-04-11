'use strict'

// Cargamos fs y path para manejar archivos del sistema
var fs = require('fs');
var path = require('path');
// Cargamos bcryps para encriptar la contraseña
var bcrypt = require('bcrypt-nodejs');
// Cargamos el modelo del Usuario
var User = require('../models/user');
// Importamos la configuración de JWT de services (Servicio de creación de Tokens)
var jwt = require('../services/jwt');


// Función de prueba simple
function pruebas(req,res){
	res.status(200).send({
		message: 'Probando una acción del controlador de usuario de la API'
	});
}


// Función para guardar un determinado usuario
function saveUser(req,res){
	var user = new User();
	var params = req.body;
	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.rol = 'ROLE_ADMIN';
	user.image = 'null';
	if(params.password){
		//Encriptar password y guardar datos
		bcrypt.hash(params.password,null,null, function(err,hash){
			user.password = hash;
			if(user.name != null && user.surname != null && user.email != null){
				//guarde el usuario
				user.save((err,userStored)=> {
					if(err){
						res.status(500).send({message: 'Error al guardar el usuario'});
					}else{
						if(!userStored){
							res.status(404).send({message: 'No se ha registrado el usuario'});
						}else{
							res.status(200).send({user: userStored});
						}
					}
				});
			}else{
				res.status(200).send({message: 'Rellena todos los campos'});
			}
		});
	}else{
		res.status(500).send({message: 'Introduce la contraseña'});
	}
}

// Función de login
function loginUser(req,res){
	var params = req.body;
	var email = params.email;
	var password = params.password;
	// Utilizamos mongoose para solicitar el usuario
	User.findOne({email: email.toLowerCase()},(err,user) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición' });
		}else{
			if(!user){
				res.status(404).send({message: 'El usuario no existe'});
			}else{
				//comparamos la contraseña enviada con la almacenada
				bcrypt.compare(password, user.password,function(err,check){
					if(check){
						// si se solicia el hash lo enviamos
						if(params.gethash){
							//devolvemos un TOKEN de JWT
							res.status(200).send({
								token: jwt.createToken(user)
							});
						}else{
							//devolvemos los datos del usuario
							res.status(200).send({user});
						}
					}else{
						res.status(404).send({message: 'El usuario no ha podido loguearse'});
					}
				});
			}
		}
	});

}

// Función para actualizar un usuario
function updateUser(req,res){
	var userId = req.params.id;
	var update = req.body;

	User.findByIdAndUpdate(userId,update, (err,userUpdate) =>{
		if(err){
			res.status(500).send({message: 'Erro al actualizar el usuario'});
		}else{
			if(!userUpdate){
				res.status(404).send({message: 'No se ha podido actualizar el usuario'});
			}else{
				res.status(200).send({user: userUpdate});
			}
		}
	});
}

//Subir una imagen
function uploadImage(req,res){
	var userId = req.params.id;
	var file_name = 'No subido..';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];
		
		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
			User.findByIdAndUpdate(userId,{image: file_name}, (err, userUpdate) =>{
				if(!userUpdate){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				}else{
					res.status(200).send({image:file_name, user: userUpdate});
				}
			})
		}else{
			res.status(200).send({message: 'Extensión del archivo no valida'});
		}
	}else{
		res.status(200).send({message: 'No ha subido ninguna imagen'});
	} 
}

// Ocultar la ruta de una imagen en el servidor: POTENCIA LA SEGURIDAD
function getImageFile(req,res){
	var imageFile = req.params.imageFile;
	var pathFile = './uploads/users/' + imageFile;
	fs.exists(pathFile,function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile));
		}else{
			res.status(200).send({message: 'No existe la imagen'});
		}
	});

}

// Exportamos todas las funciones
module.exports = {
	pruebas,
	saveUser,
	loginUser,
	updateUser,
	uploadImage,
	getImageFile
}
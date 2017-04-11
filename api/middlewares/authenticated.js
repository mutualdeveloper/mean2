'use strict'

// Importamos JWT para manejar el Hashing del login
var jwt = require('jwt-simple');
// Importamos Moment para manejar la fecha actual y la de expiración del token
var moment = require('moment');
// Clave secreta utilizada para enctriptar con JWT
var secret = 'clave_secreta_curso';

// Exportamos una función para manejar los Tokens
/*
	Si en la cabecera no tenemos declarado Authorization (y no contamos con un token), rechazamos cualquier petición.
	Si el token no es el correcto devolvemos un objecto con message 'Token no válido'.
	Si tenemos un token válido lo tomamos y verificamos su fecha de expiración.
	Si expiró devolvemos un mensaje comuncicando que expiró
	Si es correcto y no expiró agregamos a la request el usuario. Llamamos a la funcion next para continuar
*/
exports.ensureAuth = function(req, res,next){
	if(!req.headers.authorization){
		return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'});
	}
	var token = req.headers.authorization.replace(/['"]+/g,'');
	try{
		var payload = jwt.decode(token,secret);

		if(payload.exp <= moment.unix()){
			return res.status(401).send({message: 'El token ha expirado'});
		}

	}catch(ex){
		return res.status(404).send({message: 'Token no válido'});

	}

	req.user = payload;

	next();

};
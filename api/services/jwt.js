'use strict'

// Importamos JWT-SIMPLE y Moment
var jwt = require('jwt-simple');
var moment = require('moment');

// Utilizamos una clave secreta para encriptar con jwt
var secret = 'clave_secreta_curso';

// exportamos la función para crear tokens con 30 dias de expiración
exports.createToken = function(user){
	var payload = {
		sub: user._id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		role: user.role,
		image: user.image,
		iat: moment().unix(),
		exp: moment().add(30,'days').unix
	};
	return jwt.encode(payload, secret);
};
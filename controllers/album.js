'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Artist 	=	require('../models/artist');
var Album 	=	require('../models/album');
var Song 	= 	require('../models/song');

//Solicitamos un artista, se debe pasar por parametro el id
function getAlbum(req,res){
	res.status(200).send({message: 'Acción getAlbum'});
}

module.exports = {
	getAlbum
}

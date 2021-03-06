'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Artist 	=	require('../models/artist');
var Album 	=	require('../models/album');
var Song 	= 	require('../models/song');

//Solicitamos un artista, se debe pasar por parametro el id
function getAlbum(req,res){
	var albumId = req.params.id;
	//conseguir todos los datos de un artista a partir del id
	Album.findById(albumId).populate({path: 'artist'}).exec((err,album)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'})
		}else{
			if(!album){
				res.status(404).send({message: 'El album no existe'});
			}else{
				res.status(200).send({album});
			}
		}
	});
}

// Listar todos los albums de un artista
function getAlbums(req,res){
	var artistId = req.params.id;

	if(!artistId){
		//Sacamos todos los albums de la bd
		var find = Album.find({}).sort('title');
	}else{
		//Sacamos los albums de un artista
		var find = Album.find({artist: artistId}).sort('year');
	}

	find.populate({path: 'artist'}).exec((err,albums) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!albums){
				res.status(400).send({message: 'No hay albums'});
			}else{
				res.status(200).send({albums});
			}
		}
	});

}

// Función guardar un album
function saveAlbum(req, res){
	var album = new Album();
	var params = req.body;
	album.title = params.title;
	album.description = params.description;
	album.year = params.year;
	album.image = 'null';
	album.artist = params.artist;
	album.save((err,albumStored)=>{
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!albumStored){
				res.status(404).send({message: 'No se ha guardado el Album'});
			}else{
				res.status(200).send({album: albumStored});
			}
		}
	});
}

// Función actualizar un album
function updateAlbum(req,res){
	var albumId = req.params.id;
	var update = req.body;
	Album.findByIdAndUpdate(albumId,update,(err,albumUpdated)=>{
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!albumUpdated){
				res.status(404).send({message: 'No se ha actualizado el Album'});
			}else{
				res.status(200).send({album: albumUpdated});
			}
		}
	});
}


// Función borrar un album
function deleteAlbum(req,res){
	var albumId = req.params.id;
	Album.findByIdAndRemove(albumId, (err,albumRemoved) =>{
					if(err){
						res.status(500).send({message: 'Error al eliminar el album'});
					}else{
						if(!albumRemoved){
							res.status(404).send({message: 'El album no ha sido eliminado'});
						}else{
							Song.find({album: albumRemoved._id}).remove((err,songRemoved) =>{
								if(err){
									res.status(500).send({message: 'Error al eliminar la canción'});
								}else{
									if(!songRemoved){
										res.status(404).send({message: 'La canción no ha sido eliminado'});
									}else{
										res.status(200).send({album: albumRemoved});
									}
								}
							});
						}
					}
				});
}


//Subir una imagen
function uploadImage(req,res){
	var albumId = req.params.id;
	var file_name = 'No subido..';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];
		
		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
			Album.findByIdAndUpdate(albumId,{image: file_name}, (err, albumUpdated) =>{
				if(!albumUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el album'});
				}else{
					res.status(200).send({album: albumUpdated});
				}
			});
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
	var pathFile = './uploads/albums/' + imageFile;
	fs.exists(pathFile,function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile));
		}else{
			res.status(200).send({message: 'No existe la imagen'});
		}
	});

}



module.exports = {
	getAlbum,
	saveAlbum,
	getAlbums,
	updateAlbum,
	deleteAlbum,
	uploadImage,
	getImageFile
}

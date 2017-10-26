//jshint esnext: true
const mongoose = require('mongoose');

//Genre Schema
const genreSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	create_date: {
		type: Date,
		default: Date.now
	}
});

const Genre = module.exports = mongoose.model('Genre', genreSchema);

//get Genres
module.exports.getGenres = (callback, limit) => {
	Genre.find(callback).limit(limit);
};

//add Genre
module.exports.addGenre = (genre, callback) => {
	Genre.create(genre, callback);
};

//update Genre
module.exports.updateGenre = (id, genre, options, callback) => {
	let query = {_id: id};
	let update = {
		name: genre.name
	};
	Genre.findOneAndUpdate(query, update, options, callback);
};

//delete Genre
module.exports.deleteGenre = (id, callback) => {
	let query = {_id: id};
	Genre.remove(query, callback);
};
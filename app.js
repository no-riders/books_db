var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

var port = process.env.PORT || 3000;

//imports from db models
Genre = require('./models/genre');
Book = require('./models/books');

//Connect to Mongoose
mongoose.connect('mongodb://effg:<pass>@ds133465.mlab.com:33465/sandbox');
//database object
var db = mongoose.connection;

//routes
app.get('/', function(req, res) {
	res.send('Please use /api/books or /api/genres');
});

//GENRES
//retreive genre from db
app.get('/api/genres', function(req, res) {
	Genre.getGenres(function(err, genres) {
		if (err) throw err;
		res.json(genres);
	});
});

//add genre to db
app.post('/api/genres', function(req, res) {
	var genre = req.body;
	Genre.addGenre(genre, function(err, genre) {
		if (err) throw err;
		res.json(genre);
	});
});

//update genre at db
app.put('/api/genres/:_id', function(req, res) {
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, function(err, genre) {
		if (err) throw err;
		res.json(genre);
	});
});

//remove genre from db
app.delete('/api/genres/:_id', function(req, res) {
	var id = req.params._id;
	Genre.deleteGenre(id, function(err, genre) {
		if (err) throw err;
		res.json(genre);
	});
});

//BOOKS
//retreive book from db
app.get('/api/books', function(req, res) {
	Book.getBooks(function(err, books) {
		if (err) throw err;
		res.json(books);
	});
});

//add book to db
app.post('/api/books', function(req, res) {
	var book = req.body;
	Book.addBook(book, function(err, book) {
		if (err) throw err;
		res.json(book);
	});
});

//update book at db
app.put('/api/books/:_id', function(req, res) {
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function(err, book) {
		if (err) throw err;
		res.json(book);
	});
});

//get single book from db
app.get('/api/books/:id', function(req, res) {
	Book.getBookById(req.params.id, function(err, book) {
		if (err) throw err;
		res.json(book);
	});
});

//remove book from db
app.delete('/api/books/:_id', function(req, res) {
	var id = req.params._id;
	Book.deleteBook(id, function(err, book) {
		if (err) throw err;
		res.json(book);
	});
});

app.listen(port);
console.log('Listening on port ' + port);
//jshint esnext: true
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
mongoose.connect('mongodb://effg:qwerty12345@ds133465.mlab.com:33465/sandbox');
//database object
var db = mongoose.connection;

//routes
app.get('/', function(req, res) {
	res.send('Please use /api/books or /api/genres');
});

//GENRES
//retreive genre from db
app.get('/api/genres', (req, res) => {
	Genre.getGenres((err, genres) => {
		if (err) throw err;
		res.json(genres);
	});
});

//add genre to db
app.post('/api/genres', (req, res) => {
	var genre = req.body;
	Genre.addGenre(genre, (err, genre) => {
		if (err) throw err;
		res.json(genre);
	});
});

//update genre at db
app.put('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, (err, genre) => {
		if (err) throw err;
		res.json(genre);
	});
});

//remove genre from db
app.delete('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	Genre.deleteGenre(id, (err, genre) => {
		if (err) throw err;
		res.json(genre);
	});
});

//BOOKS
//retreive book from db
app.get('/api/books', (req, res) => {
	Book.getBooks((err, books) => {
		if (err) throw err;
		res.json(books);
	});
});

//add book to db
app.post('/api/books', (req, res) => {
	var book = req.body;
	Book.addBook(book, (err, book) => {
		if (err) throw err;
		res.json(book);
	});
});

//update book at db
app.put('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, (err, book) => {
		if (err) throw err;
		res.json(book);
	});
});

//get single book from db
app.get('/api/books/:id', (req, res) => {
	Book.getBookById(req.params.id, (err, book) => {
		if (err) throw err;
		res.json(book);
	});
});

//remove book from db
app.delete('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	Book.deleteBook(id, (err, book) => {
		if (err) throw err;
		res.json(book);
	});
});

app.listen(port);
console.log('Listening on port ' + port);
var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    app = express();
//    app = express.createServer();


// MONGO SETUP
mongoose.connect('mongodb://localhost/library_database');

var Keywords = new mongoose.Schema({
    keyword: String
});

//
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keywords: [Keywords]
});

var BookModel = mongoose.model('Book', Book);

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, 'public')));
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.get('/api', function (req, res) {
    res.send('API listening');
});

app.get('/api/books', function (req, res) {
    return BookModel.find(function (err, books) {
        if (!err) {
            return res.send(books);
        } else {
            return console.log(err);
        }
    })
});

app.get('/api/books/:id', function (req, res) {
    return BookModel.findById(req.params.id, function (err, book) {
        if (!err) {
            return res.send(book);
        } else {
            return console.log(err);
        }
    });
});

app.post('/api/books', function (req, res) {
    var book = new BookModel({
        title: req.body.title,
        author: req.body.author,
        releaseDate: req.body.releaseDate,
        keywords: req.body.keywords
    });
    book.save(function (err) {
        if (!err) {
            return console.log('created');
        } else {
            return console.log(err);
        }
    });
    return res.send(book);
});

app.put('/api/books/:id', function (req, res) {
    return BookModel.findByIdAndUpdate(req.params.id, { $set: {
        title: req.body.title,
        author: req.body.author,
        releaseDate: req.body.releaseDate,
        keywords: req.body.keywords}}, function (err) {
        if (!err) {
            console.log('updated');
        } else {
            console.log(err);
        }
    });
});

app.delete('/api/books/:id', function (req, res) {
    return BookModel.findByIdAndRemove(req.params.id, function (err) {
        if (!err) {
            console.log('deleted');
        } else {
            console.log(err);
        }
    })
});

app.listen(4711, function () {
    console.log('Express server listening on port %o', app);
});

/*

 ADD
 jQuery.post("/api/books", { "title":"JavaScript the good parts", "author":"Douglas Crockford", "releaseDate":new Date(2008, 4, 1).getTime(),
 "keywords":[{"keyword":"Javascript"},{"keyword":"Reference"}]
 }, function(data, textStatus, jqXHR) { console.log("Post response:"); console.dir(data); console.log(textStatus); console.dir(jqXHR);
 });

 GET BY ID
 jQuery.get("/api/books/4f95a8cb1baa9b8a1b000006", function (data, textStatus, jqXHR){ console.log("Get response:");
 console.dir(data);
 console.log(textStatus);
 console.dir(jqXHR); });

 GET ALL
 jQuery.get("/api/books/", function (data, textStatus, jqXHR) { console.log("Get response:");
 console.dir(data);
 console.log(textStatus);
 console.dir(jqXHR); });

 EDIT
 jQuery.ajax({ url:"/api/books/4f95a8cb1baa9b8a1b000006", type:"PUT",
 data:{
 "title":"JavaScript The good parts", "author":"The Legendary Douglas Crockford", "releaseDate":new Date(2008, 4, 1).getTime()
 },

 DELETE
 jQuery.ajax({ url:"/api/books/5171c10417da2e1d35000001", type:"DELETE",
 success: function(data, textStatus, jqXHR) {
 console.log("Post response:"); console.dir(data); console.log(textStatus); console.dir(jqXHR);
 } });

 */

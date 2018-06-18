
// dependencies
var express = require('express');
var exphb = require('express-handlebars');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// init express
var app = express();
var PORT = process.env.PORT || 9000;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.engine('handlebars', exphb({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

// public static directory to serve static files
app.use(express.static('public'));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

db.on('error', function(error){
    console.log('Mongoose error: ', error);
});

db.once('open', function() {
    console.log('Mongoose connection successful.');
});

require('./controllers/articleController.js')(app);

app.listen(PORT, function() {
    console.log('App running on port: ' + PORT);
});
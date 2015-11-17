var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var mongoose = require('mongoose');

var config = require('./config');

var routes = require('./routes/index');
var sign_up = require('./routes/sign_up');
var api = require('./routes/api');
var sign_in = require('./routes/sign_in');


//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var port = process.env.PORT || 8080;
mongoose.connect(config.database);


//.use :used for establishing middleware for Express
// use body parser so we can get info from POST and/or URL parameters
//app.use(favicon(path.join(__dirname, 'public', 'favicoc.ico')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use morgan to log requests to console
app.use(morgan('dev'));

app.use('/', routes);
app.use('/login', sign_up);
app.use('/api', api);
app.use('/sign_in', sign_in);


app.listen(port);

console.log('Server started at http://localhost:' + port);
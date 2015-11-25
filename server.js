var express = require('express'),
		app = express(),
		path = require('path'),
		bodyParser = require('body-parser'),
		cookieParser = require('cookie-parser'),
		favicon = require('serve-favicon'),
		morgan = require('morgan'),
		mongoose = require('mongoose'),
		config = require('./config');

var routes = require('./routes/index');
var api = require('./routes/api');



//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var port = process.env.PORT || 8080;
mongoose.connect(config.database);


//.use :used for establishing middleware for Express
// use body parser so we can get info from POST and/or URL parameters
//app.use(favicon(path.join(__dirname, 'public', 'favicoc.ico')));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use morgan to log requests to console
app.use(morgan('dev'));

app.use('/', routes);
app.use('/api', api);


app.listen(port);

console.log('Server started at http://localhost:' + port);
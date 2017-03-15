process.env.NODE_ENV='no';
if(process.env.NODE_ENV=='live'){
	process.env.DB_HOST='ds011369.mlab.com';
	process.env.DB_PORT=11369;
	process.env.DB_NAME='restaurant';
	process.env.DB_USER='restaurant';
	process.env.DB_PASS='restaurant123';
	
}
var http = require('http'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	errorHandler = require('errorhandler'),
	cookieParser = require('cookie-parser'),
	MongoStore = require('connect-mongo')(session),
	express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(stylus.middleware(
      {
        src: __dirname + '/public',
        compile: function(str, path) {
          return stylus(str).set('filename', path);
        }
      }));
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

// build mongo database connection url //
/*
var dbHost = process.env.DB_HOST || 'localhost'
var dbPort = process.env.DB_PORT || 27017;
var dbName = process.env.DB_NAME || 'node-login';

var dbURL = 'mongodb://'+dbHost+':'+dbPort+'/'+dbName;
if (process.env.NODE_ENV == 'live'){
// prepend url with authentication credentials //
	dbURL = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+dbHost+':'+dbPort+'/'+dbName;
}

app.use(session({
	secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ url: dbURL })
	})
);*/

require(__dirname + '/server/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

/**
 * Module dependencies.
 */

var database = require('./database');
var express = require('express');
var orm = require('orm');
var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/aromamood');

var app = express();

app.use(orm.express(database.connectionString), {
	define: function (db, models) {
		database.define(db);
		models = db.models;
	}
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('$#%T$#@#TG$H%JLWL@#!EDSQ@@$P#'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
	var edt = require('express-debug');
	edt(app);
	mongoose.set('debug', true);
}

require('./routes/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

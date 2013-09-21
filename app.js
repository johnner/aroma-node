
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');

var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/aromamood');

var app = express();

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

var aromasController = require('./controllers/aroma');
var productsController = require('./controllers/product');

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/aromas', aromasController.list);
app.get('/addaroma', aromasController.addaroma);
app.post('/aromas', aromasController.create);
app.get('/deletearoma/:id', aromasController.delete);

app.get('/aromas/:id(\\w{24})/products', aromasController.aromaproducts);

app.get('/products', productsController.list);
app.get('/addproduct', productsController.createform);
app.post('/products', productsController.create);

//app.post('/aromas/:id(\\w{24}/products)', aroma.createproduct(db));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

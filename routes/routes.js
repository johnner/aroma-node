var aromasController = require('../controllers/aroma');
var productsController = require('../controllers/product');

module.exports = function (app) {
	app.get('/', function(req, res){
		res.render('index', { title: 'Ароматное настроение' });
	});

	app.get('/aromas', aromasController.list);
	app.get('/addaroma', aromasController.addaroma);
	app.post('/aromas', aromasController.create);
	app.get('/deletearoma/:id', aromasController.delete);

	app.get('/aromas/:id(\\w{24})/products', aromasController.aromaproducts);

	app.get('/products', productsController.list);
	app.get('/addproduct', productsController.createform);
	app.post('/products', productsController.create);
};

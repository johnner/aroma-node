var mongoose = require('mongoose');
require('../models/product');
var Product = mongoose.model('Product');

exports.list = function (req, res) {
	Product.list({}, function (err, products) {
		if (err) return res.render('500');
		Product.count().exec(function (err, count) {
			res.render('products/productlist', {
				"productlist": products
			});
			//res.json({"aromas": docs});
		});
	});
};

/** Adding product form page */
exports.createform = function (req, res) {
	res.render('products/addproduct', {title: 'Добавить продукт'});
};


exports.create = function (req, res) {
	var p = new Product(req.body);
	p.save(function (err, product) {
		if (err) res.send("There was a problem adding info to db");
		res.redirect('products');
	});
};
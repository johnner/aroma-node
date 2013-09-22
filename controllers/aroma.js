/**
 * Aroma controllers module
 */

var mongoose = require('mongoose');
var $ = require('jquery');

require('../models/aroma');
require('../models/product');

var Aroma = mongoose.model('Aroma');
var Product = mongoose.model('Product');

exports.list = function (req, res) {
	Aroma.list({}, function (err, aromas) {
		if (err) return res.render('500');
		res.render('aromas/aromalist', {
			"aromalist": aromas
		});
			//res.json({"aromas": docs});
	});
};

exports.create = function (req, res) {
		var aroma = new Aroma(req.body);
		aroma.save(function (err, aroma) {
			if (err) res.send("There was a problem adding info to db");
			res.redirect('aromas');
		});
};

/** Aroma adding form page */
exports.addaroma = function (req, res) {
	res.render('aromas/addaroma', {title: 'Добавить запах'});
};


exports.delete = function (req, res) {
		var aroma_id = req.params.id;
		Aroma.remove({"_id":aroma_id}, function (err) {
			if (err) res.send("There was a problem adding info to db");
			res.redirect('aromas');
		});
};


exports.aromaproducts = function (req, res) {
	var aroma_id = req.params.id;
	Aroma.findOne({"_id": aroma_id}).populate('products').exec(function(err, aroma) {
		console.log('===== products ==== ', aroma.products);
		res.render('aromas/aromaproducts');
	});
};


//Link aromas to the product page view
exports.link = function (req, res) {
	var aromas;
	var products;
	var aDfd = $.Deferred();
	var pDfd = $.Deferred();

	Aroma.list({}, function (err, odors) {
		if (err) return res.render('500');
		aromas = odors;
		aDfd.resolve();
	});
	Product.list({}, function (err, prods) {
		if (err) return res.render('500');
		products = prods;
		pDfd.resolve();
	});

	$.when(aDfd, pDfd).then(function () {
		res.render('aromas/linkaroma', {
				"title": "Связывайте ароматы с продуктами",
				"aromas": aromas,
				"products": products
		});
	});
};

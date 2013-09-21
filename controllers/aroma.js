/**
 * Aroma controllers module
 */

var mongoose = require('mongoose');
require('../models/aroma');
var Aroma = mongoose.model('Aroma');


exports.list = function (req, res) {
	Aroma.list({}, function (err, aromas) {
		if (err) return res.render('500');
		Aroma.count().exec(function (err, count) {
			res.render('aromalist', {
				"aromalist": aromas
			});
			//res.json({"aromas": docs});
		});
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
	res.render('addaroma', {title: 'Добавить запах'});
};


exports.delete = function (req, res) {
		var aroma_id = req.params.id;
		Aroma.remove({"_id":aroma_id}, function (err) {
			if (err) res.send("There was a problem adding info to db");
			res.redirect('aromas');
		});
};

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
		var aroma = new Aroma({
			name: req.body.aromaname,
			title: req.body.aromatitle,
			link: req.body.aromalink
		});

		aroma.save(function (err, aroma) {
			if (err) res.send("There was a problem adding info to db");
			res.redirect('aromas');
			res.location('aromas');
		});
};

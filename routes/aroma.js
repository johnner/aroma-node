var AROMAS = 'aromamood.aromas';
var PRODUCTS = 'aromamood.products';


exports.aromaproducts = function (db) {
	return function (req, res) {
		var aroma_id = req.params.id;
		var collection = db.get(AROMAS);
		collection.find({"_id": aroma_id}, "-name -link", function (err, doc) {
			if (err) {
				res.send("There was a problem adding info to db");
			} else {
				var products = db.get(PRODUCTS);
				var results = [];
				var tasks = doc[0].products.length;

				if (tasks > 0) {
					doc[0].products.forEach(function (prod) {

						products.find({"pid": prod.product}, function (err, p) {
							if (err) {
								res.send("There was a problem adding info to db");
							} else {
								tasks--;
								if (p) {
									results.push(p);
								}
								if (tasks === 0) {
									res.render('aromaproducts', {
										"products": p,
										"odor": doc[0].title
									});
								}

							}
						});
					});
				} else {
					res.render('aromaproducts', {
						"products": null,
						"odor": doc[0].title
					});
				}
			}
		});
	};
};


exports.createproduct = function (db) {
	return function (req, res) {
		var aroma_id = req.params.id;
		var aromas = db.get(AROMAS);
		var products = db.get(PRODUCTS);

		var name = req.body.name;
		var title = req.body.title;
		var link = req.body.link;
		var image = req.body.image;

		products.insert({
			"name" : name,
			"title" : title,
			"link" : link,
			"image" : image
		}, function (err, newProduct) {
			if (err) {
				res.send("There was a problem adding info to db");
			} else {
				aromas.find({"_id": aroma_id}, {}, function (err, aroma) {
					if (err) {
						res.send("There was a problem adding info to db");
					} else {
						aroma.products.insert({
							"product": newProduct._id
						});
						res.redirect('aromas');
					}
				});
			}
		});

		collection.find({"_id": aroma_id}, "-name -link", function (err, doc) {
			if (err) {
				res.send("There was a problem adding info to db");
			} else {
				res.redirect('/aromas/'+aroma_id+'/products');
			}
		});
	};
};

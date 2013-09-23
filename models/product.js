/**
 * Product model
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: { type : String, trim : true },
	title: { type: String, trim: true },
	image: {
		files: []
	},
	link: { type: String, trim: true },
	aromas: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Aroma'
	}],
	createdAt: { type: Date, default: Date.now }
});


ProductSchema.statics = {
	list: function (options, cb) {
		var criteria = options.criteria || {};

		this.find(criteria).exec(cb);
	}
};

mongoose.model('Product', ProductSchema);
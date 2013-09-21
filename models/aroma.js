/**
 * Aroma model
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AromaSchema = new Schema({
	name: { type : String, trim : true },
	title: { type: String, trim: true },
	image: {
		files: []
	},
	link: { type: String, trim: true },
	products: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
	}],
	createdAt: { type: Date, default: Date.now }
});

/**
 * Aroma model methods
 */
AromaSchema.methods = {

};

AromaSchema.statics = {
	list: function (options, cb) {
		var criteria = options.criteria || {};

		this.find(criteria).exec(cb);
	}
};

mongoose.model('Aroma', AromaSchema);
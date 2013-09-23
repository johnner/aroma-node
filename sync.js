var database = require('./database');

database.connect(function (err, db) {
	if (err) throw err;
	db.sync(function (err) {
		if(err) throw err;
		console.log("Database synchronised!");
		db.close();
	});
});
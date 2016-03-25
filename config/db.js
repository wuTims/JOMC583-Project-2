var MongoClient = require('mongodb').MongoClient;

var state = {
	db: null
};


exports.connect = function(url, callback){
	MongoClient.connect(url, function(err, db){
		console.log("MongoDB connected..");
		state.db = db;

		//Only after MongoDB is connected do we perform any action
		callback();
	});
}

exports.get = function() {
	return state.db;
};

exports.close = function(callback){
	state.db.close(function(err, result){
		state.db = null;
		callback();
	});
}
var db = require('../config/db');
var ObjectId = require('mongodb').ObjectId;


exports.list = function(request, response){
	var collection = db.get().collection('clients');

	collection.find({}).toArray(function(err, documents){
		response.render('clients/list', {"clients": documents});
	});
};

exports.form = function(request, response){
	response.render('clients/form');
};

exports.create = function(request, response){
	var collection = db.get().collection('clients');
	collection.insert({
		"first_name": request.body.first_name,
		"last_name": request.body.last_name,
		"job_title": request.body.job_title,
		"street_addr": request.body.street_addr,
		"city": request.body.city,
		"state": request.body.state,
		"zip": request.body.zip,
		"notes": request.body.notes
	});

	response.redirect('/clients');

	console.log("Client Created");
};

exports.view = function(request, response){
	var collection = db.get().collection('clients');
	
	collection.find({
		"_id": ObjectId(request.params.id)
	}).toArray(function(err, documents) {
		response.render('clients/client', {client : documents[0]});
	});
}

exports.edit = function(request, response){
	var collection = db.get().collection('clients');

	collection.find({
		"_id": ObjectId(request.params.id)
	}).toArray(function(err, documents) {
		response.render('clients/edit', {client : documents[0]} );
	});
}

exports.save = function(request, response) {
	var collection = db.get().collection('clients');

	collection.updateOne(
		{"_id": ObjectId(request.params.id)},
		{"$set": {
			"first_name": request.body.first_name,
			"last_name": request.body.last_name,
			"job_title": request.body.job_title,
			"street_addr": request.body.street_addr,
			"city": request.body.city,
			"state": request.body.state,
			"zip": request.body.zip,
			"notes": request.body.notes
		}}
	);

	response.redirect('/clients');
}

exports.remove = function(request, response){
	var collection = db.get().collection('clients');

	collection.removeOne({
		"_id": ObjectId(request.params.id)
	});

	response.redirect('/clients');
}

exports.project = function(request, response){
	response.render('project/info')
}
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./config/db');
var clients = require('./controllers/clients');

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
	{"extended": true}
	)
);

  app.use(express.static(__dirname + '/public'));

//HTTP GET
app.get('/clients', clients.list);
app.get('/clients/new', clients.form);
app.get('/clients/:id', clients.view);
app.get('/clients/delete/:id', clients.remove);
app.get('/clients/edit/:id', clients.edit);

app.get('/project', clients.project);

//HTTP POST
app.post('/clients', clients.create);
app.post('/clients/:id', clients.save);

//first connect to database
db.connect('mongodb://localhost:27017/test',function(){
		//use express to listen on server
		app.listen(8080, function(){
			console.log("Express server started..");
		});
	}
);
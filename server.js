var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static(__dirname + "/src"));
app.use(bodyParser.json());

// Initialize the app.
var server = app.listen(process.env.PORT || 3000, function () {
	var port = server.address().port;
	console.log("App now running on port " + port);
	
	app.get('/', function(req, res) {
	  res.sendFile("src/index.html");
	});
});
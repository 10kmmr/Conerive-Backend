var express = require('express');
var connectionObject = require('../config/database');
var router = express.Router();
var mysql = require('mysql');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hello world from index");
});
router.get("/:id", function(req, res){
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function(err){
		if(err) { console.log(err) }
		else {
			connection.query("SELECT * FROM USERS", function (err2, users, fields) {
				console.log(users);
				// console.log(fields);
				connection.end();
				res.send("SHOW route");
			});
		}
	});
	// TODO - get details about a user
});

module.exports = router;

// =====================
//      APP CONFIG
// =====================

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var connectionObject = require('../../config/database');
var router = express.Router();
var querystring = require("querystring");

router.use(bodyParser.urlencoded({extended:true}));

// =====================
//      ROUTES
// =====================

// INDEX - return all emails
router.get('/', function(req, res) {
	res.send("no index");
});

// NEW - screen to create new email
router.get('/new', function(req, res){
	res.send("no new");
});

// CREATE - creates a new email
router.post("/", function(req, res){
	var userId = req.body.userId;
	var email = req.body.email;

	if (email!=undefined && email!=null) {

		var connection = mysql.createConnection(connectionObject);
		connection.connect(function (err) {
			if(err) { console.log(err) }
			else{
				var queryFields = "User_id, Email_id";
				var values = [[userId, email]];
				var query = "INSERT INTO EMAILS(" + queryFields + ") VALUES ?"
				connection.query(query, [values], function(err2, results, fields){
					if (err2) { console.log(err2); }
					else {
						console.log("email inserted");			
						connection.end();
						res.send("email id created");
					}
				});
			}
		});
	} else {
		res.send("email id not created");
	}
});



// SHOW - returns details about a single email
router.get("/:userId", function(req, res){
	var userId = req.params.userId;
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{

			var query = "SELECT * FROM EMAILS";
			query += " WHERE User_id = '" + userId + "'";
			
			connection.query(query , function(err2, results, fields){
				if (err2) { console.log(err2); }
				else {
					console.log(results);
					connection.end();
					res.send(results);
				}
			});
		}
	});
});

// EDIT - returns current details of a single email
router.get("/:id/edit", function(req, res) {
	res.send("no edit");
});

// UPDATE - updates DB with new email
router.put("/:userId", function(req, res){
	var userId = req.params.userId;
	var email = req.body.email;

	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{

			var query = "UPDATE EMAILS SET";
			query += " Email_id = '" + email + "'";
			query += " WHERE User_id = '" + userId + "'";
			
			connection.query(query , function(err2, results, fields){
				if (err2) { console.log(err2); }
				else {
					console.log(results);
					connection.end();
					res.send(results);
				}
			});
		}
	});
});

// DESTROY - deletes a email from the DB
router.delete("/:userId", function(req, res){
	var userId = req.params.userId;
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{

			var query = "DELETE FROM EMAILS";
			query += " WHERE User_id = '" + userId + "'";
			
			connection.query(query , function(err2, results, fields){
				if (err2) { console.log(err2); }
				else {
					console.log(results);
					connection.end();
					res.send(results);
				}
			});
		}
	});
});

module.exports = router;

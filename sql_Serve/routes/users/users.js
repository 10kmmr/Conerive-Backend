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

// INDEX - return all users
router.get('/', function(req, res) {
	res.send("no index");
});

// NEW - screen to create new user
router.get('/new', function(req, res){
	res.send("no new");
});

// CREATE - creates a new user
router.post("/", function(req, res){
	console.log("trying to connects to user/ ");
	var userId = req.body.userId;
	var name = req.body.name;
	var phone = req.body.phone;
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{
			var queryFields = "User_id, Name, Phone";
			var values = [[userId, name, phone]];
			var query = "INSERT INTO USERS(" + queryFields + ") VALUES ?"
			connection.query(query, [values], function(err2, results, fields){
				if (err2) { console.log(err2); }
				else {
					console.log("user inserted");
					connection.end();
					res.send(results);
				}
			});
		}
	});
});

// SHOW - returns details about a single user
router.get("/:userId", function(req, res){
	var userId = req.params.userId;
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{

			var query = "SELECT * FROM USERS";
			query += " NATURAL LEFT JOIN USER_DISPLAY_PICTURES";
			query += " NATURAL LEFT JOIN EMAILS";
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

// EDIT - returns current details of a single user
router.get("/:id/edit", function(req, res) {
	res.send("no edit");
});

// UPDATE - updates DB with new details
router.put("/:userId", function(req, res){
	var userId = req.params.userId;
	var name = req.body.name;
	var phone = req.body.phone;

	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{

			var query = "UPDATE USERS SET";
			query += " Name = '" + name + "'";
			query += ", Phone = '" + phone + "'";
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

// DESTROY - deletes a user from the DB
router.delete("/:userId", function(req, res){
	var userId = req.params.userId;
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{

			var query = "DELETE FROM USERS";
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

// =======================
//  USER LIST ROUTES
// =======================

router.get('/userList/:groupId', function (req, res) {
	var groupId = req.params.groupId;
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if (err) { console.log(err) }
		else {
			var query = 'SELECT * FROM USER_SUMMARY WHERE Group_id = ' + groupId;
			connection.query(query, function (err2, results, fields) {
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
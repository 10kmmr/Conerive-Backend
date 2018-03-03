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

// INDEX - return all groups
router.get('/', function(req, res) {
<<<<<<< HEAD
	res.send("no index");
=======
	res.send("groups index");
>>>>>>> 8cf84f097184ff19f199fbc7c3b0134a6b4346c0
});

// NEW - screen to create new group
router.get('/new', function(req, res){
	res.send("no new");
});

// CREATE - creates a new group
router.post("/", function(req, res){
	var groupName = req.body.groupName;
	var groupDescription = req.body.groupDescription;
	var adminId = req.body.adminId;
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{
			var queryFields = "Group_name, Group_description, Admin_id";
			var values = [[groupName, groupDescription, adminId]];
			var query = "INSERT INTO GROUPS(" + queryFields + ") VALUES ?"
			connection.query(query, [values], function(err2, results, fields){
				if (err2) { console.log(err2); }
				else {
					console.log("group inserted with id "+results.insertId);
					connection.end();
					res.send(results);
				}
			});
		}
	});
});

// SHOW - returns details about a single group
router.get("/:groupId", function(req, res){
	res.send("to do");
});

// EDIT - returns current details of a single group
router.get("/:id/edit", function(req, res) {
	res.send("no edit");
});

// UPDATE - updates DB with new details
router.put("/:id", function(req, res){
	res.send("UPDATE route");
	// TODO - update DB details of single group
});

// DESTROY - deletes a group from the DB
router.delete("/:id", function(req, res){
	res.send("DESTROY route");
	// TODO - delete image from DB
});

module.exports = router;
<<<<<<< HEAD
=======

// =======================
//  GROUP LIST ROUTES
// =======================

router.get('/groupList/:userId', function(req, res) {
	var userId = req.params.userId;
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{
			var query = 'SELECT * FROM GROUP_SUMMARY WHERE Group_id IN ( '
			query += 'SELECT Group_id from GROUP_MEMBERS WHERE User_id = "'+userId+'")';
			connection.query(query, function(err2, results, fields){
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
>>>>>>> 8cf84f097184ff19f199fbc7c3b0134a6b4346c0

// =====================
//      APP CONFIG
// =====================

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var connectionObject = require('../config/database');
var router = express.Router();
var querystring = require("querystring");

router.use(bodyParser.urlencoded({extended:true}));

// =====================
//      ROUTES
// =====================

// INDEX - return all group members
router.get('/', function(req, res) {
	res.send("no index");
});

// NEW - screen to create new group members
router.get('/new', function(req, res){
	res.send("no new");
});

// CREATE - creates a new group member
router.post("/", function(req, res){

	var groupId = req.body.groupId;
	var userId = req.body.userId;
	
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{
			var queryFields = "Group_id, User_id";
			var values = [[groupId, userId]];
			var query = "INSERT INTO GROUP_MEMBERS (" + queryFields + ") VALUES ?"
			connection.query(query, [values], function(err2, results, fields){
				if (err2) { console.log(err2); }
				else {
					connection.end();
					res.send("group member created");
				}
			});
		}
	});
});

// SHOW - returns details about a single group members
router.get("/:id", function(req, res){
	// TODO - get details about a group members
});

// EDIT - returns current details of a single group members
router.get("/:id/edit", function(req, res) {
	res.send("no edit");
});

// UPDATE - updates DB with new details
router.put("/:id", function(req, res){
	res.send("UPDATE route");
	// TODO - update DB details of single group notification radius
});

// DESTROY - deletes a group member from the DB
router.delete("/:id", function(req, res){
	res.send("DESTROY route");
});

// ======================
//      NOTIFICATIONS
// ======================

// INDEX - return all notifications of a user
router.get("/notifications/:userId", function (req, res) {
	var userId = req.params.userId;
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if (err) { console.log(err) }
		else {

			var query = "SELECT * FROM NOTIFICATIONS";
			query += " WHERE Receiver_id = '" + userId + "'";

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

// DESTROY - deletes a notification from the DB
router.delete("/:notificationId", function (req, res) {
	var notificationId = req.params.notificationId;
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if (err) { console.log(err) }
		else {

			var query = "DELETE FROM GROUP_INVITE_NOTIFICATION";
			query += " WHERE Notification_id = " + notificationId;

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

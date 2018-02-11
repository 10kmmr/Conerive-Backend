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
	res.send("no index");
});

// NEW - screen to create new group
router.get('/new', function(req, res){
	res.send("no new");
});

// CREATE - creates a new group
router.post("/", function(req, res){
	var groupName = req.body.groupName;
	var adminId = req.body.adminId;
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{
			var queryFields = "Group_name, Admin_id";
			var values = [[groupName, adminId]];
			var query = "INSERT INTO GROUPS(" + queryFields + ") VALUES ?"
			connection.query(query, [values], function(err2, results, fields){
				if (err2) { console.log(err2); }
				else {
					console.log(results.insertId)
					connection.end();
					res.redirect(307, "/groups/display-pictures/"+results.insertId);
				}
			});
		}
	});
});

// SHOW - returns details about a single group
router.get("/:id", function(req, res){
	// TODO - get details about a user
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

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
	
	var userId = req.body.userId;
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{
			var queryFields = "User_id, Name, Phone";
			var values = [[userId, name, phone]];
			var query = `
			SELECT 
			Group_id, 
			Group_name, 
			Image_url as Group_Display_picture, 
			count(User_id) as Member_count,
			Trip_count,
			Image_count
		FROM GROUPS
		NATURAL LEFT JOIN GROUP_DISPLAY_PICTURES
		NATURAL LEFT JOIN GROUP_MEMBERS
		NATURAL LEFT JOIN (
				
			SELECT 
				Group_id, 
				count(Trip_id) as Trip_count
			FROM GROUPS 
			NATURAL LEFT JOIN TRIPS
			GROUP BY Group_id
		) g1 NATURAL LEFT JOIN (
		
			SELECT 
				Group_id,
				count(Image_id) as Image_count
			FROM GROUPS
			NATURAL LEFT JOIN TRIPS
			NATURAL LEFT JOIN IMAGES 
			GROUP BY Group_id
		) g2 WHERE Group_id IN (
			SELECT Group_id
			FROM GROUPS 
			NATURAL LEFT JOIN GROUP_MEMBERS
			WHERE User_id = `+ userId +`) 
		GROUP BY Group_id;
		`
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

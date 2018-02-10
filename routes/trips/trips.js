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

// INDEX - return all trips
router.get('/', function(req, res) {
	res.send("no index");
});

// NEW - screen to create new trip
router.get('/new', function(req, res){
	res.send("no new");
});

// CREATE - creates a new trip
router.post("/", function(req, res){
	
	var tripName = req.body.tripName;
	var groupId = req.body.groupId;
	var connection = mysql.createConnection(connectionObject);
	
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{
			
			var queryFields = "Trip_name, Group_id";
			var values = [[tripName, groupId]];
			var query = "INSERT INTO TRIPS(" + queryFields + ") VALUES ?"
			
			connection.query(query, [values], function(err2, results, fields){
				if (err2) { console.log(err2); }
				else {
					connection.end();
					res.send("trip created");
				}
			});
		}
	});
});

// SHOW - returns details about a single trip
router.get("/:id", function(req, res){
	// TODO - get details about a trip
});

// EDIT - returns current details of a single trip
router.get("/:id/edit", function(req, res) {
	res.send("no edit");
});

// UPDATE - updates DB with new details
router.put("/:id", function(req, res){
	res.send("UPDATE route");
	// TODO - update DB details of single trip
});

// DESTROY - deletes a trip from the DB
router.delete("/:id", function(req, res){
	res.send("DESTROY route");
	// TODO - delete trip from DB
});

module.exports = router;

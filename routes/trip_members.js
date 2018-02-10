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

// INDEX - return all trip members
router.get('/', function(req, res) {
	res.send("no index");
});

// NEW - screen to create new trip members
router.get('/new', function(req, res){
	res.send("no new");
});

// CREATE - creates a new trip members
router.post("/", function(req, res){

	var tripId = req.body.tripId;
	var userId = req.body.userId;
	
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{
			var queryFields = "Trip_id, User_id";
			var values = [[tripId, userId]];
			var query = "INSERT INTO TRIP_MEMBERS (" + queryFields + ") VALUES ?"
			connection.query(query, [values], function(err2, results, fields){
				if (err2) { console.log(err2); }
				else {
					connection.end();
					res.send("trip member created");
				}
			});
		}
	});
});

// SHOW - returns details about a single trip member
router.get("/:id", function(req, res){
	// TODO - get details about a trip
});

// EDIT - returns current details of a single trip members
router.get("/:id/edit", function(req, res) {
	res.send("no edit");
});

// UPDATE - updates DB with new details
router.put("/:id", function(req, res){
	res.send("UPDATE route");
	// TODO - update DB details of single trip member
});

// DESTROY - deletes a trip member from the DB
router.delete("/:id", function(req, res){
	res.send("DESTROY route");
	// TODO - delete trip member from DB
});

module.exports = router;
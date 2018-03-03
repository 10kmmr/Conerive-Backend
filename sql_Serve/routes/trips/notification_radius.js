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

// INDEX - return all trip notification radius
router.get('/', function(req, res) {
	res.send("no index");
});

// NEW - screen to create new trip notification radius
router.get('/new', function(req, res){
	res.send("no new");
});

// CREATE - creates a new trip notification radius
router.post("/", function(req, res){

	var tripId = req.body.tripId;
	var notificationRadius = req.body.notificationRadius;
	
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{
			var queryFields = "Trip_id, Notification_radius";
			var values = [[tripId, notificationRadius]];
			var query = "INSERT INTO TRIP_NOTIFICATION_RADIUS(" + queryFields + ") VALUES ?"
			connection.query(query, [values], function(err2, results, fields){
				if (err2) { console.log(err2); }
				else {
					connection.end();
					res.send(results);
				}
			});
		}
	});
});

// SHOW - returns details about a single trip notification radius
router.get("/:id", function(req, res){
	// TODO - get details about a trip notification radius
});

// EDIT - returns current details of a single trip notification radius
router.get("/:id/edit", function(req, res) {
	res.send("no edit");
});

// UPDATE - updates DB with new details
router.put("/:id", function(req, res){
	res.send("UPDATE route");
	// TODO - update DB details of single trip notification radius
});

// DESTROY - deletes a trip notification radius from the DB
router.delete("/:id", function(req, res){
	res.send("DESTROY route");
	// TODO - delete trip notification radius from DB
});

module.exports = router;

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

	var vehicleName = req.body.vehicleName;
	var vehicleType = req.body.vehicleType;
	var driverId = req.body.driverId;
	var tripId = req.body.tripId;

	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{
			var queryFields = "Vehicle_name, Vehicle_type, Driver_id, Trip_id";
			var values = [[vehicleName, vehicleType, driverId, tripId]];
			var query = "INSERT INTO VEHICLES (" + queryFields + ") VALUES ?"
			connection.query(query, [values], function(err2, results, fields){
				if (err2) { console.log(err2); }
				else {
					connection.end();
					res.send("vehicle  created");
				}
			});
		}
	});
});

// SHOW - returns details about a single user
router.get("/:id", function(req, res){
	// TODO - get details about a user
});

// EDIT - returns current details of a single user
router.get("/:id/edit", function(req, res) {
	res.send("no edit");
});

// UPDATE - updates DB with new details
router.put("/:id", function(req, res){
	res.send("UPDATE route");
	// TODO - update DB details of single user 
});

// DESTROY - deletes a user from the DB
router.delete("/:userId", function(req, res){
	res.send("user deleted from DB");
});

module.exports = router;

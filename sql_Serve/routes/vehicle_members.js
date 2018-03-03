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

// INDEX - return all vehicle members
router.get('/', function(req, res) {
	res.send("no index");
});

// NEW - screen to create new vehicle members
router.get('/new', function(req, res){
	res.send("no new");
});

// CREATE - creates a new vehicle members
router.post("/", function(req, res){

	var vehicleId = req.body.vehicleId;
	var userId = req.body.userId;
	
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{
			var queryFields = "Vehicle_id, User_id";
			var values = [[vehicleId, userId]];
			var query = "INSERT INTO VEHICLE_MEMBERS (" + queryFields + ") VALUES ?"
			connection.query(query, [values], function(err2, results, fields){
				if (err2) { console.log(err2); }
				else {
					connection.end();
					res.send("vehicle member created");
				}
			});
		}
	});
});

// SHOW - returns details about a single vehicle member
router.get("/:id", function(req, res){
	// TODO - get details about a vehicle member
});

// EDIT - returns current details of a single vehicle members
router.get("/:id/edit", function(req, res) {
	res.send("no edit");
});

// UPDATE - updates DB with new details
router.put("/:id", function(req, res){
	res.send("UPDATE route");
	// TODO - update DB details of single vehicle member
});

// DESTROY - deletes a vehicle member from the DB
router.delete("/:id", function(req, res){
	res.send("DESTROY route");
	// TODO - delete vehicle member from DB
});

module.exports = router;

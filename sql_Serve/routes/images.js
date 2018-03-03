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

// INDEX - return all images
router.get('/', function(req, res) {
	res.send("no index");
});

// NEW - screen to create new image
router.get('/new', function(req, res){
	res.send("no new");
});

// CREATE - creates a new image
router.post("/", function(req, res){
	
	var imageURL = req.body.imageURL;
	var imageTime = req.body.imageTime;
	var imageLat = req.body.imageLat;
	var imageLng = req.body.imageLng;
	var userId = req.body.userId;
	var tripId = req.body.tripId;
	
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{
			var queryFields = "Image_url, Image_time, Image_lat, Image_lng, User_id, Trip_id";
			var values = [[imageURL, imageTime, imageLat, imageLng, userId, tripId]];
			var query = "INSERT INTO IMAGES(" + queryFields + ") VALUES ?"
			connection.query(query, [values], function(err2, results, fields){
				if (err2) { console.log(err2); }
				else {
					connection.end();
					res.send("image created");
				}
			});
		}
	});
});

// SHOW - returns details about a single image
router.get("/:id", function(req, res){
	// TODO - get details about a image
});

// EDIT - returns current details of a single image
router.get("/:id/edit", function(req, res) {
	res.send("no edit");
});

// UPDATE - updates DB with new details
router.put("/:id", function(req, res){
	res.send("UPDATE route");
	// TODO - update DB details of single image
});

// DESTROY - deletes a image from the DB
router.delete("/:id", function(req, res){
	res.send("DESTROY route");
	// TODO - delete image from DB
});

module.exports = router;

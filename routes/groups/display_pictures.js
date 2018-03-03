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

// INDEX - return all group display pictures
router.get('/', function(req, res) {
	res.send("no index");
});

// NEW - screen to create new group display picture
router.get('/new', function(req, res){
	res.send("no new");
});

// CREATE - creates a new group display picture
router.post("/", function(req, res){
	var groupId = req.body.groupId;
	var displayPictureURL = req.body.displayPictureURL;
	if (displayPictureURL!=null && displayPictureURL!=null){
		var connection = mysql.createConnection(connectionObject);
		connection.connect(function (err) {
			if(err) { console.log(err) }
			else{
				var queryFields = "Group_id, Image_url";
				var values = [[groupId, displayPictureURL]];
				var query = "INSERT INTO GROUP_DISPLAY_PICTURES(" + queryFields + ") VALUES ?"
				connection.query(query, [values], function(err2, results, fields){
					if (err2) { console.log(err2); }
					else {
						console.log("group display picture inserted");
						connection.end();
						res.send(results);
					}
				});
			}
		});
	}
});



// SHOW - returns details about a single group display picture
router.get("/:id", function(req, res){
	// TODO - get details about a group display picture
});

// EDIT - returns current details of a single group display picture
router.get("/:id/edit", function(req, res) {
	res.send("no edit");
});

// UPDATE - updates DB with new details
router.put("/:id", function(req, res){
	res.send("UPDATE route");
	// TODO - update DB details of single group display picture
});

// DESTROY - deletes a group display picture from the DB
router.delete("/:id", function(req, res){
	res.send("DESTROY route");
	// TODO - delete group display picture from DB
});

module.exports = router;

// =====================
//      APP CONFIG
// =====================

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var connectionObject = require('../../config/database');
var router = express.Router();

router.use(bodyParser.urlencoded({extended:true}));

// =====================
//      ROUTES
// =====================

// INDEX - return all user display pictures
router.get('/', function(req, res) {
	res.send("no index");
});

// NEW - screen to create new user display picture
router.get('/new', function(req, res){
	res.send("no new");
});

// CREATE - creates a new display picture
router.post("/", function(req, res){
	var userId = req.body.userId;
	var displayPictureURL = req.body.displayPictureURL;
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{
			var queryFields = "User_id, Image_path";
			var values = [[userId, displayPictureURL]];
			var query = "INSERT INTO USER_DISPLAY_PICTURES(" + queryFields + ") VALUES ?"
			connection.query(query, [values], function(err2, results, fields){
				if (err2) { console.log(err2); }
				else {
					connection.end();
					res.send("user display picture created");
				}
			});
		}
	});
});



// SHOW - returns details about a single user display picture
router.get("/:id", function(req, res){
	// TODO - get details about a user display picture
});

// EDIT - returns current details of a single user display picture
router.get("/:id/edit", function(req, res) {
	res.send("no edit");
});

// UPDATE - updates DB with new details
router.put("/:id", function(req, res){
	res.send("UPDATE route");
	// TODO - update DB details of single user display picture
});

// DESTROY - deletes a user display picture from the DB
router.delete("/:id", function(req, res){
	res.send("DESTROY route");
	// TODO - delete user display picture from DB
});

module.exports = router;

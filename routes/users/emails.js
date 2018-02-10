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

// INDEX - return all emails
router.get('/', function(req, res) {
	res.send("no index");
});

// NEW - screen to create new email
router.get('/new', function(req, res){
	res.send("no new");
});

// CREATE - creates a new email
router.post("/", function(req, res){
	var userId = req.body.userId;
	var email = req.body.email;
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else{
			var queryFields = "User_id, Email_id";
			var values = [[userId, email]];
			var query = "INSERT INTO EMAILS(" + queryFields + ") VALUES ?"
			connection.query(query, [values], function(err2, results, fields){
				if (err2) { console.log(err2); }
				else {
					connection.end();
					res.send("email id created");
				}
			});
		}
	});
});



// SHOW - returns details about a single email
router.get("/:id", function(req, res){
	// TODO - get details about a email
});

// EDIT - returns current details of a single email
router.get("/:id/edit", function(req, res) {
	res.send("no edit");
});

// UPDATE - updates DB with new email
router.put("/:id", function(req, res){
	res.send("UPDATE route");
	// TODO - update DB details of single email
});

// DESTROY - deletes a email from the DB
router.delete("/:id", function(req, res){
	res.send("DESTROY route");
	// TODO - delete email from DB
});

module.exports = router;

// =====================
//      APP CONFIG
// =====================

var express = require('express');
var mysql = require('mysql');
var connectionObject = {
    host: "localhost",
    user: 'root',
    password: 'Abhijeeth29$',
    database: 'conerivedev',
    port: 3306
  };
var router = express.Router();

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
	res.send("CREATE route");
	// TODO - insert a new user into the DB 
});

// SHOW - returns details about a single user
router.get("/:id", function(req, res){
	res.send("SHOW route");
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
router.delete("/:id", function(req, res){
	res.send("DESTROY route");
	// TODO - delete user from DB
});

module.exports = router;

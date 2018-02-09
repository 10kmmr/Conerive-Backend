// =====================
//      APP CONFIG
// =====================

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var connectionObject = require('../config/database');
var router = express.Router();

router.use(bodyParser.urlencoded({extended:true}));

// =====================
//      ROUTES
// =====================

// INDEX - return all groups
router.get('/', function(req, res) {
	res.send("no index");
});

// NEW - screen to create new group
router.get('/new', function(req, res){
	res.send("no new");
});

// CREATE - creates a new group
router.post("/", function(req, res){
	// TODO - insert a new group into the DB 
});

// SHOW - returns details about a single group
router.get("/:id", function(req, res){
	// TODO - get details about a user
});

// EDIT - returns current details of a single group
router.get("/:id/edit", function(req, res) {
	res.send("no edit");
});

// UPDATE - updates DB with new details
router.put("/:id", function(req, res){
	res.send("UPDATE route");
	// TODO - update DB details of single group
});

// DESTROY - deletes a group from the DB
router.delete("/:id", function(req, res){
	res.send("DESTROY route");
	// TODO - delete image from DB
});

module.exports = router;

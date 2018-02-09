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

// INDEX - return all trips
router.get('/', function(req, res) {
	res.send("no index");
});

// NEW - screen to create new trip
router.get('/new', function(req, res){
	res.send("no new");
});

// CREATE - creates a new trip
router.post("/", function(req, res){
	// TODO - insert a new trip into the DB 
});

// SHOW - returns details about a single trip
router.get("/:id", function(req, res){
	// TODO - get details about a trip
});

// EDIT - returns current details of a single trip
router.get("/:id/edit", function(req, res) {
	res.send("no edit");
});

// UPDATE - updates DB with new details
router.put("/:id", function(req, res){
	res.send("UPDATE route");
	// TODO - update DB details of single trip
});

// DESTROY - deletes a trip from the DB
router.delete("/:id", function(req, res){
	res.send("DESTROY route");
	// TODO - delete trip from DB
});

module.exports = router;

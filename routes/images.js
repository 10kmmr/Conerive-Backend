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
	res.send("new image created");
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

var express = require('express');
var connectionObject = require('./config/database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hello world from index");
});

module.exports = router;

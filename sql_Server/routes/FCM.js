// =====================
//      APP CONFIG
// =====================

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var connectionObject = require('../config/database');
var router = express.Router();
var querystring = require("querystring");

router.use(bodyParser.urlencoded({ extended: true }));

// =====================
//      ROUTES
// =====================

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("hello world - from index");
});

router.post('/newtoken', function (req, res) {
    var userId = req.body.userId;
    var token = req.body.token;

    var connection = mysql.createConnection(connectionObject);
    connection.connect(function (err) {
        if (err) { console.log(err) }
        else {
            var queryFields = "User_id, Token";
            var values = [[userId, token]];
            var query = "INSERT INTO USER_REGISTRATION_TOKEN(" + queryFields + ") VALUES ?"
            connection.query(query, [values], function (err2, results, fields) {
                if (err2) { console.log(err2); }
                else {
                    console.log("token inserted");
                    connection.end();
                    res.send(results);
                }
            });
        }
    });
});

router.post("/notificationInvition", function (req, res) {
    /*
        {
            "groupid": "groupid"
            "group"
        }
    */
});

router.post("notificatonGroup")

module.exports = router;

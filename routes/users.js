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

/* GET users listing. */
router.get('/', function(req, res, next) {
	var connection = mysql.createConnection(connectionObject);
	connection.connect(function (err) {
		if(err) { console.log(err) }
		else {
			connection.query("SELECT * FROM USERS", function(err, users, fields){
				console.log(users);
				connection.end();
				res.send("connected to db");
			});
		}	
	});
});

module.exports = router;

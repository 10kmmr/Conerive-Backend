var express = require('express');
var router = express.Router();

// router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function (req, res, next) {
    res.send("hello world - from index");
});

module.exports = router;

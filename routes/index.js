var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');   
});

module.exports = router;

var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
console.log("trying");
  models.user.findAll()
  .then(results => res.send(results))
  .catch(error => res.send(error))
});

module.exports = router;
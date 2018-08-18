var express = require('express');
var router = express.Router();
var data = require('../data.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.json(
    data
  //   [{
  //   id: 1,
  //   username: "samsepi01"
  // }, {
  //   id: 2,
  //   username: "D0loresH4ze"
  // },
  // {
  //   id: 3,
  //   username: "D0lesH4ze"
  // }]
  )
});

module.exports = router;

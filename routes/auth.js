var express = require('express');
var router = express.Router();
const data = require('../data/auth')

/* GET home login. */
router.get('/', function(req, res, next) {
  res.send('登录');
});
router.post('/', function(req, res, next) {
  data
    .auth(req.body)
    .then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  res.send('------');
});

module.exports = router;

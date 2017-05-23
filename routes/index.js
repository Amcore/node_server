var express = require('express');
var router = express.Router();
const data = require('../data')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.jade')
});



async function getList() {
  let _data = await data.selectList()
  return _data
}
module.exports = router;

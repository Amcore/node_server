var express = require('express');
var router = express.Router();
const data = require('../data/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  data
    .selectUser()
    .then((result) => {
      res.send({
        data: result,
        msg: '查询成功',
        code: 0
      })
    }, (result) => {
      res.send({
        msg: '数据库查询错误',
        code: 1,
      })
    })
});

module.exports = router;

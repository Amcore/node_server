var express = require('express');
var router = express.Router();
const data = require('../data/auth')

/* GET home login. */
router.get('/', function(req, res, next) {
  res.send('登录');
});

router.post('/', function(req, res, next) {
  const password = req.body.password;
  const account = req.body.account;
  if (!password && !account) {
    res.send('用户名密码错误');
  } else {
    data
      .auth(req.body)
      .then((result) => {
        console.log(result.length);
        if (result.length) {
          res.send({
            code: 0,
            msg: '登入成功！',
            data: result[0]
          });
        } else {
          res.send({
            code: 1,
            msg: '用户名或密码错误'
          });
        }
      }, (err) => {
        res.send({
          code: 1,
          msg: '用户名或密码错误',
          data: err
        });
      });
  }
});

router.put('/', function(req, res, next) {
  const password = req.body.password;
  const account = req.body.account;
  const newPassword = req.body.newPassword;
  const uuid = req.body.uuid;
  if (!password && !account && !newPassword && !uuid) {
    res.send('用户名密码错误');
  } else {
    data
      .modiUser(req.body)
      .then((result) => {
        if (result.changedRows) {
          res.send({
            code: 0,
            msg: '修改成功，请重新登入',
            data: result
          });
        } else {
          res.send({
            code: 1,
            msg: '修改失败, 找不到该用户'
          })
        }
      }, (err) => {
        res.send({
          code: 1,
          msg: '修改失败',
          data: err
        });
      });
  }
});

module.exports = router;

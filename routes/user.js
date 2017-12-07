var express = require('express');
var router = express.Router();
const data = require('../data/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  data
    .getAllUser()
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

router.post('/', function(req, res, next) {
  const password = req.body.password;
  const account = req.body.account;
  if (!password && !account && !newPassword && !uuid) {
    res.send('用户名密码错误');
  } else {
    data
      .addUser(req.body)
      .then((result) => {
        if (result.code) {
          res.send(result);
        } else {
          res.send({
            data: result,
            msg: '添加成功',
            code: 0
          });
        }
      }, (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({
            msg: '未知名错误',
            code: 1
          });
        }
      })
  }
});

router.delete('/', function(req, res, next) {
  const uuid = req.query.uuid;
  if (uuid) {
    data
      .deleteUser(3)
      .then((result) => {
        res.send({
          code: 0,
          msg: '删除成功'
        })
      })
  } else {
    res.send({
      code: 3,
      msg: '请检查请求URL是否有误！'
    });
  }
});

router.put('/', function(req, res, next) {
  const password = req.body.password;
  const account = req.body.account;
  const newPassword = req.body.newPassword;
  if (!password && !account && !newPassword) {
    res.send('输入有误');
  } else {
    data
      .isAccountPassoword(req.body)
      .then((confirmInfo) => {
        if (confirmInfo.code) {
          res.send(confirmInfo);
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
                  code: 2,
                  msg: '修改失败, 未找到该用户'
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
      }, (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({
            msg: '未知名错误',
            code: 1
          });
        }
      });
  }
});

module.exports = router;

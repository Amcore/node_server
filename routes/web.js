var express = require('express');
var router = express.Router();
var data = require('../data/web')

router.get('/', (req, res, next) => {
  data
    .selectWeb()
    .then((result) => {
      res.send({
        msg: '查询成功！',
        code: 0,
        data: result
      })
    })
})

router.get('/single', (req, res, next) => {
  data
    .selectWebById(req.query.uuid)
    .then((result) => {
      res.send({
        msg: '查询成功！',
        code: 0,
        data: result
      })
    })
})



router.post('/single', (req, res, next) => {
  const webName = req.body.webName
  if (webName) {
    data
      .addWeb(webName)
      .then((result) => {
        res.send({
          msg: '添加成功！',
          code: 0,
          data: result
        })
      }, (err) => {
        res.send(err)
      })
  } else {
    res.send({
      msg: '添加失败！',
      code: 1,
      data: result
    })
  }
})


router.put('/single', (req, res, next) => {
  console.log(req.body)
  if (req.body.uuid && req.body.webName) {
    data
      .updateWeb(req.body.webName, req.body.uuid)
      .then((result) => {
        res.send({
          mag: '更新成功！',
          code: 0,
          data: result
        }, (err) => {
          console.log(err)
        })
      })
  } else {
    res.send({
      msg: '更新失败!',
      code: 1,
      data: null
    })
  }
})

router.delete('/single', (req, res, next) => {
  console.log(req.body)
  if (res.body.uuid) {
    data
      .deleteWeb(res.body.uuid)
      .then((result) => {
        res.send({
          msg: '删除成功！',
          code: 0,
          data: []
        })
      }, (err) => {
        console.log(err)
      })
  } else {
    res.send({
      msg: '删除失败！',
      code: 1,
      data: []
    })
  }
})

module.exports = router

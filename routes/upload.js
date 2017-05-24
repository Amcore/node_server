var express = require('express');
var router = express.Router();
var qiniu = require('qiniu')
var multiparty = require('multiparty');
var fs = require('fs')
var path = require('path')

router.get('/', function(req, res, next) {
  res.send({});
});

qiniu.conf.ACCESS_KEY = 'vmIDPmMjNQ8B6FJvfHx6ZVjLawDeFxO-0tB_udBn';
qiniu.conf.SECRET_KEY = 'L25sscCTOzy3tGg-aoiKP8p2l4I0tgj6FoRKofQ_';

const bucket = 'images';


router.post('/', function(req, res, next) {
  var form = new multiparty.Form()
  form.uploadDir = __dirname
  form.parse(req, function(err, fields, files) {
    if(err) {
      console.log(err)
    } else {
      if (!files.file) {
        res.send({
          msg: '上传失败！',
          code: 1,
          data: null
        })
        return
      }
      const key = files.file[0].originalFilename
      const localPath = files.file[0].path
      token = uptoken(bucket, key)
      responseURL(token, key, localPath)
        .then((result) => {
          if (result) {
            res.send({
              msg: '上传成功！',
              code: 0,
              data: `http://om0wp2jdb.bkt.clouddn.com/${result}`
            })
            fs.unlink(localPath, (err) => {
              if (err) {
                cosnole.log(err)
              }
            })
          }
        }, (result) => {
          res.send({
            msg: '上传失败！',
            code: 0,
            data: result
          })
          fs.unlink(localPath, (err) => {
            if (err) {
              cosnole.log(err)
            }
          })
        })
        .catch((err) => {
          res.send({
            msg: err,
            code: 1,
            data: null
          })
        })
    }
  })
})

function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token();
}

function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
  return new Promise((resolve, reject) => {
    qiniu.io.putFile(uptoken, key, localFile, extra, (err, ret) => {
      if(!err) {
        resolve(ret.key)
      } else {
        reject(err)
      }
    })
  })
}

async function responseURL(uptoken, key, localFile) {
  let url = await uploadFile(uptoken, key, localFile)
  return url
}

module.exports = router;

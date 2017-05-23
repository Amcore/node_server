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
      var nowTime = new Date()
      let key = String(nowTime.getTime())
      let localPath = `upload/${key}.png`
      fs.renameSync(files.file[0].path, localPath, function(err) {
        console.log(err)
      });
      token = uptoken(bucket, key)
      const url = uploadFile(token, key, localPath)
      var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(token, key, localPath, extra, function(err, ret) {
          if(!err) {
            res.send({
              msg: 'upload success',
              code: 0,
              url: `http://om0wp2jdb.bkt.clouddn.com/${ret.key}`
            })
            // console.log(`http://om0wp2jdb.bkt.clouddn.com/${ret.key}`)
            // console.log(ret.hash, ret.key, ret.persistentId);
          } else {
            console.log(err);
          }
      });
      if (url) {
        res.send({
          msg: '上传成功！',
          code: 0,
          data: url
        })
      }
    }
  })
})

function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token();
}

function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        const url = `http://om0wp2jdb.bkt.clouddn.com/${ret.key}`
        console.log('1111')
        return url
        // console.log(`http://om0wp2jdb.bkt.clouddn.com/${ret.key}`)
        // console.log(ret.hash, ret.key, ret.persistentId);
      } else {
        console.log(err);
      }
  });
}

module.exports = router;

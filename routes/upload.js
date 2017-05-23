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
      res.send('上传成功！')
      var nowTime = new Date()
      fs.renameSync(files.file[0].path, String('upload/' + nowTime.getTime() + '.png'), function(err) {
        console.log(err)
      });
      let key = String('upload/' + nowTime.getTime() + '.png')
      token = uptoken(bucket, key)
      uploadFile(token, key, String('upload/' + nowTime.getTime() + '.png'))
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
        console.log(ret.hash, ret.key, ret.persistentId);
      } else {
        console.log(err);
      }
  });
}

module.exports = router;

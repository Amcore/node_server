var connection = require('../index.js')

module.exports = {

  addUser(body) {
    return new Promise((resolve, reject) => {
      const account = body.account;
      const password = body.password;
      connection.query({
        sql: `SELECT * FROM user WHERE account = '${account}'`
      }, (err, result, fields) => {
        if (err) {
          reject(err)
        } else {
          if (result.length) {
            reject({
              code: 1,
              msg: '用户名已存在',
            })
          } else {
            connection.query({
              sql: `INSERT INTO user(password, account, username) VALUES ('${password}', '${account}', '${account}')`
            }, (err, result, fields) => {
              if (err) reject(err);
              resolve(result);
            })
          }
        }
      })
    })
  },

  isAccountPassoword(body) {
    return new Promise((resolve, reject) => {
      const account = body.account;
      const password = body.password;
      const newPassword = body.newPassword;
      connection.query({
        sql: `SELECT * FROM user WHERE account = '${account}'`
      }, (err, result, fields) => {
        if (err) {
          reject(err)
        }
        if (result.length) {
          if (password === result[0].password) {
            resolve({
              code: 0,
              msg: 'can modi',
            });
          } else {
            resolve({
              code: 1,
              msg: '密码错误'
            })
          }
        } else {
          resolve({
            code: 1,
            msg: '不存在用户名'
          })
        }
      })
    })
  },

  modiUser(body) {
    return new Promise((resolve, reject) => {
      const account = body.account;
      const password = body.password;
      const newPassword = body.newPassword;
      connection.query({
        sql: `UPDATE user SET password = '${newPassword}' WHERE account = '${account}'`
      }, (err, result, fields) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  deleteUser(uuid) {
    return new Promise((resolve, reject) => {
      connection.query({
        sql: `DELETE FROM user WHERE uuid = ${uuid}`
      }, (err, result, fields) => {
        if (err) reject(err);
        resolve(err);
      })
    })
  },

  getAllUser(req) {
    return new Promise((resolve, reject) => {
      connection.query({
        sql: `SELECT * FROM user`
      }, (err, result, fields) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }

}
// update `web_build`.`auth` set `password`='admie' where `uuid`='9'
// delete from `web_build`.`user` where `uuid`='2'

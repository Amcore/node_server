var connection = require('../index.js')

module.exports = {

  auth(req) {
    return new Promise((resolve, reject) => {
      const account = req.account;
      const password = req.password;
      connection.query({
        sql: `SELECT * FROM user WHERE account = '${account}' AND password = '${password}'`
      }, (err, result, fields) => {
        if (err) {
          reject(err)
        }
        resolve(result);
      })
    })
  },

  modiUser(body) {
    return new Promise((resolve, reject) => {
      const uuid = body.uuid;
      const account = body.account;
      const password = body.password;
      const newPassword = body.newPassword;
      connection.query({
        sql: `UPDATE user SET password = '${newPassword}' WHERE uuid = ${uuid} AND account = '${account}' AND password = '${password}'`
      }, (err, result, fields) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
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
  },

  addUser(req) {
    return new Promise((resolve, reject) => {
      const account = req.account;
      const password = req.password;
      connection.query({
        sql: `INSERT INTO user(password, account, username) VALUES ('${password}', '${account}', '${account}')`
      }, (err, result, fields) => {
        if (err) reject(err);
        resolve(result);
      })
    })
  }

}
// update `web_build`.`auth` set `password`='admie' where `uuid`='9'

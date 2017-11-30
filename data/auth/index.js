var connection = require('../index.js')

module.exports = {

  auth(req) {
    return new Promise((resolve, reject) => {
      const account = req.account;
      const password = req.password;
      connection.query({
        sql: `SELECT * FROM auth WHERE account = '${account}' AND password = '${password}'`
      }, (err, result, fields) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }

}

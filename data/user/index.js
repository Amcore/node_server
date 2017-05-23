var connection = require('../index.js')

module.exports = {

  selectUser() {
    return new Promise((resolve, reject) => {
      connection.query({
        sql: 'SELECT * FROM admin'
      }, (err, result, fields) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
  
}

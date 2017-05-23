var connection = require('../index.js')

module.exports = {

  selectWeb() {
    return new Promise((resolve, reject) => {
      connection.query({
        sql: 'SELECT * FROM web'
      }, (err, result, fields) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },

  selectWebById(uuid) {
    return new Promise((resolve, reject) => {
      connection.query({
        sql: `SELECT * FROM web WHERE uuid = ${uuid}`
      }, (err, result, fields) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },

  addWeb(data) {
    return new Promise((resolve, reject) => {
      connection.query({
        sql: `INSERT INTO web(webName) VALUES('${data}')`
      }, (err, result, fields) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },

  updateWeb(data, uuid) {
    return new Promise((resolve, reject) => {
      connection.query({
        sql: `UPDATE web SET webName = '${data}' WHERE uuid = ${uuid}`
      }, (err, result, fields) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },

  deleteWeb(uuid) {
    return new Promise((resolve, reject) => {
      connection.query({
        sql: `DELETE FROM web WHERE uuid = ${uuid}`
      }, (err, result, fields) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }

}

const mysql = require('mysql');
const config = require('./config');
const pool = mysql.createPool(config.mysql);


// 获取数据库连接
function getConnection() {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, connection) {
      if(err)
        reject(err);
      else
        resolve(connection);
    })
  })
}

// 执行 sql 语句
function execute(sql) {
  return new Promise (function(resolve, reject) {
    getConnection()
      .then((connection) => {
        connection.query(sql, (err, result) => {
          if(err) {
            reject(err);
          }
          else {
            resolve(result);
            connection.release();
          }     
        })
      })
      .catch((err) => {
        reject(err);
      })
  })
}


module.exports.execute = execute;
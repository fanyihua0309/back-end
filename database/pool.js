const mysql = require('mysql');

const pool  = mysql.createPool({
  connectionLimit : 10,
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'mydb',
  post: 3306,
  timezone: "08:00",          // 设置时区使时间与本地同步
  multipleStatements: true,   // 允许执行多条 sql 语句
});

module.exports = pool;
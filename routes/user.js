var express = require('express');
var router = express.Router();
const pool = require('../database/pool');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


// 用户标记喜欢/取消喜欢的 post 请求接口
router.post('/like', function(req, res, next) {
  const { user_id, movie_id, like } = req.body;

  let sql_part;
  if(like) {
    sql_part = `DELETE FROM userlike
                WHERE user_id=${user_id} AND movie_id=${movie_id}`;
  }
  else {
    sql_part = `INSERT INTO userlike(user_id, movie_id)
                VALUES(${user_id}, ${movie_id})`;
  }

  let sql = `CREATE TABLE 
              IF NOT EXISTS userlike (
              id INT NOT NULL AUTO_INCREMENT,
              user_id INT NOT NULL,
              movie_id INT NOT NULL,
              PRIMARY KEY(id)
              );` + sql_part;
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": `标记${like ? "取消喜欢" : "喜欢"}失败`, "err": `标记${like ? "取消喜欢" : "喜欢"}失败`});
    }
    else {
      res.json({"code": 0, "msg": `标记${like ? "取消喜欢" : "喜欢"}成功`});
    }
  })
})

// 用户标记看过/取消看过的 post 请求接口
router.post('/see', function(req, res, next) {
  const { user_id, movie_id, see } = req.body;
  let sql_part;
  if(see) {
    sql_part = `DELETE FROM usersee
                WHERE user_id=${user_id} AND movie_id=${movie_id}`;
  }
  else {
    sql_part = `INSERT INTO usersee(user_id, movie_id)
                VALUES(${user_id}, ${movie_id})`;
  }

  let sql = `CREATE TABLE 
              IF NOT EXISTS usersee (
              id INT NOT NULL AUTO_INCREMENT,
              user_id INT NOT NULL,
              movie_id INT NOT NULL,
              PRIMARY KEY(id)
              );` + sql_part;
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": `标记${see ? "取消看过" : "看过"}失败`, "err": `标记${like ? "取消看过" : "看过"}失败`});
    }
    else {
      res.json({"code": 0, "msg": `标记${see ? "取消看过" : "看过"}成功`});
    }
  })
})


module.exports = router;
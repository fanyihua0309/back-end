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

// 用户更新电影评分的 patch 请求接口
router.patch('/see/rate', function(req, res, next) {
  const { user_id, movie_id, rate } = req.body;

  const sql = `UPDATE usersee
               SET rate=${rate}
               WHERE user_id=${user_id} AND movie_id=${movie_id}`;

  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "编辑评分失败", "err": "编辑评分失败"});
    }
    else {
      res.json({"code": 0, "msg": "编辑评分成功"});
    }
  })
})

// 用户标记看过并给电影评分的 post 请求接口
router.post('/see', function(req, res, next) {
  const { user_id, movie_id, see, rate } = req.body;

  const sqlCreateTable = `CREATE TABLE 
                          IF NOT EXISTS usersee (
                          id INT NOT NULL AUTO_INCREMENT,
                          user_id INT NOT NULL,
                          movie_id INT NOT NULL,
                          rate SMALLINT,
                          PRIMARY KEY(id)
                          );`;
  const sqlInsert = `INSERT INTO usersee(user_id, movie_id, rate)
                     VALUES(${user_id}, ${movie_id}, ${rate});`;
  const sql = sqlCreateTable + sqlInsert;

  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "标记看过失败", "err": "标记看过失败"});
    }
    else {
      res.json({"code": 0, "msg": "标记看过成功"});
    }
  })
})

// 获取指定 id 的用户信息 get 请求接口
router.get('/info/:user_id', function(req, res, next) {
  const user_id = req.params.user_id;
  console.log(user_id);
  const sql = `SELECT * FROM users
               WHERE id=${user_id}`;
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "获取用户信息失败", "err": "存在错误获取用户信息失败！"});
    }
    else {
      res.json({"code": 0, "msg": "获取用户信息成功", "data": results[0]});
    }
  })
}) 


module.exports = router;
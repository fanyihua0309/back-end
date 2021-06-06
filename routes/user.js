var express = require('express');
var router = express.Router();
const pool = require('../database/pool');
const moment = require('moment');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


// 用户标记喜欢/取消喜欢的 post 请求接口
router.post('/like', function(req, res, next) {
  const { user_id, movie_id, like } = req.body;

  const createTime = moment().format("YYYY-MM-DD HH:mm:ss"); //当前时间

  let sql_part;
  if(like) {
    sql_part = `DELETE FROM userlike
                WHERE user_id=${user_id} AND movie_id=${movie_id}`;
  }
  else {
    sql_part = `INSERT INTO userlike(user_id, movie_id, create_time)
                VALUES(${user_id}, ${movie_id}, '${createTime}')`;
  }

  let sql = `CREATE TABLE 
              IF NOT EXISTS userlike (
              id INT NOT NULL AUTO_INCREMENT,
              user_id INT NOT NULL,
              movie_id INT NOT NULL,
              create_time DATETIME NOT NULL,
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
  const createTime = moment().format("YYYY-MM-DD HH:mm:ss"); //当前时间

  const sqlCreateTable = `CREATE TABLE 
                          IF NOT EXISTS usersee (
                          id INT NOT NULL AUTO_INCREMENT,
                          user_id INT NOT NULL,
                          movie_id INT NOT NULL,
                          rate SMALLINT NOT NULL,
                          PRIMARY KEY(id)
                          );`;
  const sqlInsert = `INSERT INTO usersee(user_id, movie_id, rate, create_time)
                     VALUES(${user_id}, ${movie_id}, ${rate}, '${createTime}');`;
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

// 获取指定 id 的用户标记电影喜欢历史记录 get 请求接口
router.get('/mark/like/:user_id', function(req, res, next) {
  const user_id = req.params.user_id;
  
  const sql = `SELECT movie_id, create_time FROM userlike
               WHERE user_id=${user_id}
               ORDER BY create_time DESC;

               SELECT * FROM movies
               WHERE id IN (
               SELECT movie_id FROM userlike
               WHERE user_id=${user_id}
               ORDER BY create_time DESC);`;

  pool.query(sql, function(error, results, fields) {

    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "获取用户标记喜欢记录失败", "err": "存在错误获取用户标记喜欢记录失败！"});
    }
    else {
      let data = results[0];
      const movies = results[1];
      for(let i = 0; i < data.length; i++) {
        data[i].name = movies[i].name;
        data[i].date = movies[i].date;
        data[i].area = movies[i].area;
        data[i].director = movies[i].director;
        data[i].starring = movies[i].starring;
        data[i].type = movies[i].type;
      }
      res.json({"code": 0, "msg": "获取用户标记喜欢记录成功", "data": data});
    }
  })
}) 

// 获取指定 id 的用户标记电影看过历史记录 get 请求接口
router.get('/mark/see/:user_id', function(req, res, next) {
  const user_id = req.params.user_id;
  
  const sql = `SELECT movie_id, rate, create_time FROM usersee
               WHERE user_id=${user_id}
               ORDER BY create_time DESC;

               SELECT * FROM movies
               WHERE id IN (
               SELECT movie_id FROM usersee
               WHERE user_id=${user_id}
               ORDER BY create_time DESC)`;

  pool.query(sql, function(error, results, fields) {
    let data = results[0];
    const movies = results[1];
    for(let i = 0; i < data.length; i++) {
      data[i].name = movies[i].name;
      data[i].date = movies[i].date;
      data[i].area = movies[i].area;
      data[i].director = movies[i].director;
      data[i].starring = movies[i].starring;
      data[i].type = movies[i].type;
    }

    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "获取用户标记喜欢记录失败", "err": "存在错误获取用户标记喜欢记录失败！"});
    }
    else {
      res.json({"code": 0, "msg": "获取用户标记喜欢记录成功", "data": data});
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

// 更新指定 id 的用户信息 patch 请求接口
router.patch('/info', function(req, res, next) {
  const {id, nickname, mobile, email} = req.body;
  const sql = `UPDATE users
               SET nickname='${nickname}', mobile='${mobile}', email='${email}'
               WHERE id=${id}`;
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "更新用户信息失败", "err": "存在错误更新用户信息失败！"});
    }
    else {
      res.json({"code": 0, "msg": "更新用户信息成功"});
    }
  })
}) 

// 更新指定 id 的用户登录密码 patch 请求接口
router.patch('/password', function(req, res, next) {
  const {id, password, newPassword } = req.body;
  const sql = `SELECT * FROM users
               WHERE id=${id} AND password='${password}';
               UPDATE users
               SET password=${newPassword}
               WHERE id=${id} AND password='${password}';`;
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "修改密码失败", "err": "存在错误更新用户信息失败！"});
    }
    else {
      if(results[0].length === 0) {
        res.json({"code": -1, "msg": "修改密码失败", "err": "原密码错误！无法修改密码！"});
      }
      else {
        res.json({"code": 0, "msg": "修改密码成功"});
      }
    }
  })
}) 

module.exports = router;
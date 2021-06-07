// 定义用户部分相关路由模块，需要传递 user_id 参数，其中的基本表和视图需要提前创建好

var express = require('express');
var router = express.Router();
const pool = require('../database/pool');
const moment = require('moment');


// 获取所有电影信息 get 请求接口
router.get('/:user_id', function(req, res, next) {
  const user_id = req.params.user_id;

  // 第 1 条 sql 语句是从视图 moviesall 中查询电影相关的所有信息
  // 第 2、3 条 sql 语句是查询当前用户是否标记看过/喜欢/评分
  const sql = `
               SELECT * FROM moviesall

               SELECT movie_id FROM userlike 
               WHERE user_id=${user_id};

               SELECT movie_id, rate FROM usersee
               WHERE user_id=${user_id};`;

  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "获取电影信息失败", "err": "存在错误获取电影信息失败！"});
    }
    else {
      let data = results[0];
      const likeList = results[1];
      const seeList = results[2];

      // 比对当前电影的 id 是否与用户标记喜欢电影的 id 相同
      // 为电影的 like 属性设置值为 true 或 false
      data = data.map((cur) => {
        cur.like = false;
        for(let i = 0; i < likeList.length; i++) {
          if(cur.id === likeList[i].movie_id) {
            cur.like = true;
          }
        }
        return cur;
      })

      // 同理为电影的 see 属性设置值为 true 或 false
      data = data.map((cur) => {
        cur.see = false;
        cur.rate = null;
        for(let i = 0; i < seeList.length; i++) {
          if(cur.id === seeList[i].movie_id) {
            cur.see = true;
            cur.rate = seeList[i].rate;
          }
        }
        return cur;
      })
      res.json({"code": 0, "msg": "获取电影信息成功", "data": data});
    }
  })
})

// 搜索电影信息 post 请求接口
router.post('/search', function(req, res, next) {
  const { user_id } = req.body;
  let { name, date, area, director, starring, type } = req.body.movie;
  // 用户并不是每个字段都键入值进行搜索，如果对应字段没有值设为空字符串
  name = name || '';
  date = date || '';
  area = area || '';
  director = director || '';
  starring = starring || '';
  type = type || '';
  const sql = `SELECT * FROM movies
               WHERE name LIKE '%${name}%' AND date LIKE '%${date}%' AND area LIKE '%${area}%'
               AND director LIKE '%${director}%' AND starring LIKE '%${starring}%' AND type LIKE '%${type}%';
               
               SELECT movie_id FROM userlike 
               WHERE user_id=${user_id};

               SELECT movie_id, rate FROM usersee
               WHERE user_id=${user_id};`;

  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "搜索电影信息失败", "err": "存在错误搜索电影信息失败！"});
    }
    else {
      let data = results[0];
      const likeList = results[1];
      const seeList = results[2];

      // 比对当前电影的 id 是否与用户标记喜欢电影的 id 相同
      // 为电影的 like 属性设置值为 true 或 false
      data = data.map((cur) => {
        cur.like = false;
        for(let i = 0; i < likeList.length; i++) {
          if(cur.id === likeList[i].movie_id) {
            cur.like = true;
          }
        }
        return cur;
      })

      // 同理为电影的 see 属性设置值为 true 或 false
      data = data.map((cur) => {
        cur.see = false;
        cur.rate = null;
        for(let i = 0; i < seeList.length; i++) {
          if(cur.id === seeList[i].movie_id) {
            cur.see = true;
            cur.rate = seeList[i].rate;
          }
        }
        return cur;
      })
      res.json({"code": 0, "msg": "搜索电影信息成功", "data": data});
    }
  })
})

// 获取所有电影信息并按指定的字段升序或降序排序 post 请求接口
router.post('/sort', function(req, res, next) {
  const { user_id, orderName, type } = req.body;
  const sql = `
              SELECT id, name, date, area, director, starring, type, likeTotal, seeTotal, rateAvg FROM movies,movieslike, moviessee
              WHERE movies.id = movieslike.movie_id AND movies.id = moviessee.movie_id
              ORDER BY ${orderName} ${type};
              
              SELECT movie_id FROM userlike 
              WHERE user_id=${user_id};

              SELECT movie_id, rate FROM usersee
              WHERE user_id=${user_id};`;

  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "获取电影信息失败", "err": "存在错误获取电影信息失败！"});
    }
    else {
      let data = results[0];
      const likeList = results[1];
      const seeList = results[2];
  
       // 比对当前电影的 id 是否与用户标记喜欢电影的 id 相同
      // 为电影的 like 属性设置值为 true 或 false
      data = data.map((cur) => {
        cur.like = false;
        for(let i = 0; i < likeList.length; i++) {
          if(cur.id === likeList[i].movie_id) {
            cur.like = true;
          }
        }
        return cur;
      })
  
      // 同理为电影的 see 属性设置值为 true 或 false
      data = data.map((cur) => {
        cur.see = false;
        cur.rate = null;
        for(let i = 0; i < seeList.length; i++) {
          if(cur.id === seeList[i].movie_id) {
            cur.see = true;
            cur.rate = seeList[i].rate;
          }
        }
        return cur;
      })
      res.json({"code": 0, "msg": "获取电影信息成功", "data": data});
    }
  })
})

// 用户标记喜欢/取消喜欢的 post 请求接口
router.post('/like', function(req, res, next) {
  const { user_id, movie_id, like } = req.body;
  const createTime = moment().format("YYYY-MM-DD HH:mm:ss"); //当前时间
  let sql;

  if(like) {
    sql = `DELETE FROM userlike
                WHERE user_id=${user_id} AND movie_id=${movie_id}`;
  }
  else {
    sql = `INSERT INTO userlike(user_id, movie_id, create_time)
                VALUES(${user_id}, ${movie_id}, '${createTime}')`;
  }

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

// 用户标记看过并给电影评分的 post 请求接口
router.post('/see', function(req, res, next) {
  const { user_id, movie_id, see, rate } = req.body;
  const createTime = moment().format("YYYY-MM-DD HH:mm:ss"); //当前时间
  const sql = `INSERT INTO usersee(user_id, movie_id, rate, create_time)
                     VALUES(${user_id}, ${movie_id}, ${rate}, '${createTime}');`;

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

// 获取指定 id 的用户信息 get 请求接口
router.get('/info/:user_id', function(req, res, next) {
  const user_id = req.params.user_id;
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
router.patch('/info/password', function(req, res, next) {
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
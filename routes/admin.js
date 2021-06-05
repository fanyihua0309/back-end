var express = require('express');
var router = express.Router();
const pool = require('../database/pool');


// 获取所有电影信息 get 请求接口
router.get('/', function(req, res, next) {
  const sql = `
              SELECT id, name, date, area, director, starring, type, likeTotal, seeTotal, rateAvg FROM movies,movieslike, moviessee
              WHERE movies.id = movieslike.movie_id AND movies.id = moviessee.movie_id`;
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "获取电影信息失败", "err": "存在错误获取电影信息失败！"});
    }
    else {
      res.json({"code": 0, "msg": "获取电影信息成功", "data": results});
    }
  })
})

// 获取所有电影信息并按指定的字段升序或降序排序 post 请求接口
router.post('/sort', function(req, res, next) {
  const { orderName, type } = req.body;
  const sql = `
              SELECT id, name, date, area, director, starring, type, likeTotal, seeTotal, rateAvg FROM movies,movieslike, moviessee
              WHERE movies.id = movieslike.movie_id AND movies.id = moviessee.movie_id
              ORDER BY ${orderName} ${type}`;
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "获取电影信息失败", "err": "存在错误获取电影信息失败！"});
    }
    else {
      res.json({"code": 0, "msg": "获取电影信息成功", "data": results});
    }
  })
})


module.exports = router;
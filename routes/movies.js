// 定义管理员部分路由模块，其中的基本表和视图需要提前创建好

const express = require('express');
const router = express.Router();
const pool = require('../database/pool');


// 获取所有电影信息 get 请求接口
router.get('/', function(req, res, next) {
  // 执行2条 sql 语句
  // 当存储电影信息的数据表不存在时新建数据表 movies
  // 向 movies 中插入新增的电影信息，由于 id 设置为自增长，无需手动设值
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

// 新增电影信息 post 请求接口
router.post('/add', function(req, res, next) {
  const { name, date, area, director, starring, type } = req.body.movie;

  const sql = `INSERT INTO movies(name, date, area, director, starring, type)
               VALUES('${name}', '${date}', '${area}', '${director}', '${starring}', '${type}')`;
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      if(error.code === 'ER_DUP_ENTRY') {
        res.json({"code": -1, "msg": "新增电影信息失败", "err": `电影 ${name} 已存在！`});
      }
      else {
        res.json({"code": -1, "msg": "新增电影信息失败", "err": "存在错误新增电影信息失败！"});
      }
    }
    else {
      res.json({"code": 0, "msg": "新增电影信息成功", "data": "null"});
    }
  })
})

// 删除指定 id 集合的电影信息 delete 请求接口
router.delete('/delete/:idList', function(req, res, next) {
  const idList = req.params.idList;
  const sql = `DELETE FROM movies
               WHERE id IN(${idList})`;
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": `删除 id 为 ${idList} 的电影信息失败`, "err": "存在错误删除电影信息失败！"});
    }
    else {
      res.json({"code": 0, "msg": `删除 id 为 ${idList} 的电影信息成功`, "suc": "删除电影信息成功", "data": "null"});
    }
  })
})

// 编辑电影信息 patch 请求接口
router.patch('/edit', function(req, res, next) {
  const { id, name, date, area, director, starring, type } = req.body.movie;
  const sql = `UPDATE movies
               SET name='${name}', date='${date}', area='${area}', director='${director}', starring='${starring}', type='${type}'
               WHERE id=${id}`
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "编辑电影信息失败", "err": "存在错误编辑电影信息失败！"});
    }
    else {
      res.json({"code": 0, "msg": "编辑电影信息成功", "suc": "编辑电影信息成功", "data": "null"});
    }
  })
})

// 搜索电影信息 post 请求接口
router.post('/search', function(req, res, next) {
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
               AND director LIKE '%${director}%' AND starring LIKE '%${starring}%' AND type LIKE '%${type}%'`;
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "搜索电影信息失败", "err": "存在错误搜索电影信息失败！"});
    }
    else {
      res.json({"code": 0, "msg": "搜索电影信息成功", "data": results});
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
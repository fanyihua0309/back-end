const express = require('express');
const router = express.Router();
const pool = require('../database/pool');

// 获取所有电影信息 get 请求接口
router.get('/', function(req, res, next) {
  const sql = `SELECT * FROM movies`;
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "获取电影信息失败", "err": error});
      throw error;
    }
    console.log(results);
    res.json({"code": 0, "msg": "获取电影信息成功", "data": results});
  })
})

// 新增电影信息 post 请求接口
router.post('/add', function(req, res, next) {
  const params = JSON.parse(req.body.params);
  const { name, date, area, director, starring, type } = params;
  const sql = `INSERT INTO movies(name, date, area, director, starring, type)
               VALUES('${name}', '${date}', '${area}', '${director}', '${starring}', '${type}')`;
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "新增电影信息失败", "err": error});
      throw error;
    }
    res.json({"code": 0, "msg": "新增电影信息成功", "data": "null"});
  })
})

// 编辑电影信息 patch 请求接口
router.patch('/edit', function(req, res, next) {
  const params = JSON.parse(req.body.params);
  console.log(params);
  const { id, name, date, area, director, starring, type } = params;
  const sql = `UPDATE movies
               SET name='${name}', date='${date}', area='${area}', director='${director}', starring='${starring}', type='${type}'
               WHERE id=${id}`
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "编辑电影信息失败", "err": error});
      throw error;
    }
    res.json({"code": 0, "msg": "编辑电影信息成功", "data": "null"});
  })
})

// 删除指定 id 的电影信息 delete 请求接口
router.delete('/delete/:id', function(req, res, next) {
  const id = req.params.id;
  const sql = `DELETE FROM movies
               WHERE id=${id}`;
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "删除指定 id 的电影信息失败", "err": error});
      throw error;
    }
    console.log(results);
    res.json({"code": 0, "msg": "删除指定 id 的电影信息成功", "data": "null"});
  })
})


module.exports = router;
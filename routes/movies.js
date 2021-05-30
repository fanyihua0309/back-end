const express = require('express');
const router = express.Router();
const pool = require('../database/pool');


router.get('/', function(req, res, next) {
  // res.send("test");
  const sql = `SELECT * FROM movies`;
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log("err: " + error);
      throw error;
    }
    // console.log(results);
    res.json({"code": 0, "msg": "获取电影信息成功", "data": results});
  })
})

router.delete('/delete/:id', function(req, res, next) {
  const id = req.params.id;
  // const id = req.data.id;
  console.log("id=" + id);
  // res.send("delete ok");
  const sql = `DELETE FROM movies
               WHERE id=${id}`;
  pool.query(sql, function(error, results, fields) {
    if(error) {
      console.log("123err: " + error);
      res.json({"code": -1, "msg": "删除指定 id 的电影信息失败", "err": "什么鬼"});
      // throw error;
    }
    console.log(results);
    res.json({"code": 0, "msg": "删除指定 id 的电影信息成功"});
  })
})


module.exports = router;
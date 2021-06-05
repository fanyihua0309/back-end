var express = require('express');
var router = express.Router();
const pool = require('../database/pool');


// 获取所有电影信息 get 请求接口
router.get('/', function(req, res, next) {
  const user_id = req.params.user_id;
  const sql = `SELECT * FROM movies;

               SELECT movie_id, COUNT(movie_id) FROM userlike
               GROUP BY movie_id;
                
               SELECT movie_id, AVG(rate), COUNT(movie_id) FROM usersee
               GROUP BY movie_id`;
  pool.query(sql, function(error, results, fields) {
    let data = results[0];
    const likeTotal = results[1];
    const seeTotal = results[2];

    data = data.map((cur) => {
      cur.likeTotal = 0;
      for(let i = 0; i < likeTotal.length; i++) {
        if(cur.id === likeTotal[i].movie_id) {
          cur.likeTotal = likeTotal[i]['COUNT(movie_id)'];
        }
      }
      return cur;
    })

    data = data.map((cur) => {
      cur.seeTotal = 0;
      cur.rateAvg = 0;
      for(let i = 0; i < seeTotal.length; i++) {
        if(cur.id === seeTotal[i].movie_id) {
          cur.seeTotal = seeTotal[i]['COUNT(movie_id)'];
          cur.rateAvg = seeTotal[i]['AVG(rate)'];
        }
      }
      return cur;
    })

    if(error) {
      console.log(error);
      res.json({"code": -1, "msg": "获取电影信息失败", "err": "存在错误获取电影信息失败！"});
    }
    else {
      res.json({"code": 0, "msg": "获取电影信息成功", "data": data});
    }
  })
})

module.exports = router;
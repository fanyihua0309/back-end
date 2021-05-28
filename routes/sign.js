const express = require('express');
const router = express.Router();
const pool = require('../database/pool');


// 用户登录功能 post 请求接口
router.post('/in', function(req, res, next) {
  const { mobile, password } = req.body;
  const sql = `SELECT COUNT(*) FROM
               (SELECT * FROM users
               WHERE mobile='${mobile}' AND password='${password}') checkuser`
  pool.execute(sql)
    .then((result) => {
      const count = result[0]['COUNT(*)'];
      if(count === 0)
        res.json({"code": -1, "msg": "登录失败", "err": "用户名不存在或用户名密码存在错误！"});
      // else {
      //   const checksql = `SELECT COUNT(*) FROM
      //                     (SELECT * FROM users
      //                      WHERE mobile='${mobile}' AND password='${password}') checkuser`
      //   pool.execute(checksql)
      //     .then((result) => {
      //       if(result.RowDataPacket === undefined)
      //       res.json({"code": -1, "msg": "登录失败", "err": "用户名或密码错误！"});
      //     })
      // }
      res.json({"code": 0, "msg": "登录成功"});
    })
    .catch((err) => {
      console.log(err);
      res.json({"code": -1, "msg": "登录失败"});
    })
})

// 用户登录功能 post 请求接口
router.post('/up', function(req, res, next) {
  const sql = `INSERT 
               INTO users(nickname, mobile, password)
               VALUES("${req.body.nickname}", "${(req.body.mobile)}", "${req.body.password}")`;
  pool.execute(sql)
    .then((result) => {
      console.log(result);
      res.json({"code": 0, "msg": "注册成功"});
    })
    .catch((err) => {
      console.log(err);
      if(err.code === 'ER_DUP_ENTRY')
        res.json({"code": -1, "msg": "注册失败", "err": "该用户已存在!"});
      else
        res.json({"code": -1, "msg": "注册失败"});
    })
})


module.exports = router;
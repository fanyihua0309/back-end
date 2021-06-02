const express = require('express');
const router = express.Router();
const pool = require('../database/pool');


// 用户登录功能 post 请求接口
router.post('/in', function(req, res, next) {
  const { mobile, password } = req.body;
  const sql = `SELECT COUNT(*) FROM
               (SELECT * FROM users
               WHERE mobile='${mobile}') checkUserMobile;
               SELECT COUNT(*) FROM
               (SELECT * FROM users
               WHERE mobile='${mobile}' AND password='${password}') checkuser`;
  pool.query(sql, function (error, results, fields) {
  if (error) {
    console.log(error);
    res.json({"code": -1, "msg": "登录失败", "err": "存在错误登录失败！"});
  }
  const count = [results[0][0]['COUNT(*)'], results[1][0]['COUNT(*)']];
  if(count[0] === 0) {
    res.json({"code": -1, "msg": "登录失败", "err": `手机号码为 ${mobile} 的用户不存在，请先注册！`});
  }
  else if(count[1] === 0) {
    res.json({"code": -1, "msg": "登录失败", "err": "用户名或密码错误!"});
  }
  else {
    res.json({"code": 0, "msg": "登录成功", "suc": "登录成功"});
  }
  });
})

// 用户注册功能 post 请求接口
router.post('/up', function(req, res, next) {
  const { nickname, mobile, password } = req.body;

  // 执行2条 sql 语句
  // 当存储用户信息的数据表不存在时新建数据表 users
  // 向 users 中插入新注册的用户信息，由于 user_id 设置为自增长，无需手动设值
  const sql = `CREATE TABLE
               IF NOT EXISTS users (
                user_id INT NOT NULL AUTO_INCREMENT,
                nickname VARCHAR (32) NOT NULL,
                mobile VARCHAR (11) NOT NULL UNIQUE,
                password VARCHAR (32) NOT NULL,
                PRIMARY KEY (user_id)
               );
               INSERT 
               INTO users(nickname, mobile, password)
               VALUES('${nickname}', '${(mobile)}', '${password}')`;
  pool.query(sql, function (error, results, fields) {
    if (error) {
      console.log(error);
      if(error.code === 'ER_DUP_ENTRY') {
        res.json({"code": -1, "msg": "注册失败", "err": `手机号码为 ${mobile} 的用户已存在！`});
      }
      else {
        res.json({"code": -1, "msg": "注册失败", "err": "存在错误注册失败！"});
      }
    }
    else {
      res.json({"code": 0, "msg": "注册成功"});
    }
  });
})


module.exports = router;
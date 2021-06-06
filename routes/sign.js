const express = require('express');
const router = express.Router();
const pool = require('../database/pool');


// 用户注册功能 post 请求接口
router.post('/up', function(req, res, next) {
  const { nickname, mobile, email, password } = req.body;

  // 执行2条 sql 语句
  // 当存储用户信息的数据表不存在时新建数据表 users
  // 向 users 中插入新注册的用户信息，由于 id 设置为自增长，无需手动设值
  const sql = `CREATE TABLE
               IF NOT EXISTS users (
                id INT NOT NULL AUTO_INCREMENT,
                nickname VARCHAR (32) NOT NULL,
                mobile VARCHAR (11) NOT NULL UNIQUE,
                email VARCHAR(32) NOT NULL,
                password VARCHAR (32) NOT NULL,
                PRIMARY KEY (id)
               );
               INSERT 
               INTO users(nickname, mobile, email, password)
               VALUES('${nickname}', '${mobile}', '${email}', '${password}')`;
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

// 用户登录功能 post 请求接口
router.post('/in', function(req, res, next) {
  const { mobile, password } = req.body;
  const sql = `SELECT * FROM users
               WHERE mobile='${mobile}';
               SELECT * FROM users
               WHERE mobile='${mobile}' AND password='${password}'`;
  pool.query(sql, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.json({"code": -1, "msg": "登录失败", "err": "存在错误登录失败！"});
    }
    else {
      if(results[0].length === 0) {
        res.json({"code": -1, "msg": "登录失败", "err": `手机号码为 ${mobile} 的用户不存在，请先注册！`});
      }
      else if(results[1].length === 0) {
        res.json({"code": -1, "msg": "登录失败", "err": "用户名或密码错误!"});
      }
      else {
        res.json({"code": 0, "msg": "登录成功", "data": {user_id: results[1][0].id, user_nickname: results[1][0].nickname, user_mobile: results[1][0].mobile, user_email: results[1][0].email}});
      }
    }
})
})

// 管理员登录功能 post 请求接口
router.post('/admin', function(req, res, next) {
  const { mobile, password } = req.body;
  const sql = `SELECT * FROM admin
               WHERE mobile='${mobile}';
               SELECT * FROM admin
               WHERE mobile='${mobile}' AND password='${password}'`;
  pool.query(sql, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.json({"code": -1, "msg": "登录失败", "err": "存在错误登录失败！"});
    }
    else {
      if(results[0].length === 0) {
        res.json({"code": -1, "msg": "登录失败", "err": `手机号码为 ${mobile} 的管理员不存在！`});
      }
      else if(results[1].length === 0) {
        res.json({"code": -1, "msg": "登录失败", "err": "管理员用户名或密码错误!"});
      }
      else {
        res.json({"code": 0, "msg": "登录成功", "data": {admin_id: results[1][0].id}});
      }
    }
})
})


module.exports = router;
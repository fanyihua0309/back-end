// 定义注册登录部分路由模块

const express = require('express');
const router = express.Router();
const pool = require('../database/pool');
const jwt = require('jsonwebtoken');
const auth = require('../authenticateJWT');
const accessTokenSecret = auth.accessTokenSecret;
const refreshTokenSecret = auth.refreshTokenSecret;
const refreshTokens = auth.refreshTokens;


// 用户注册功能 post 请求接口
router.post('/up', function(req, res, next) {
  const { nickname, mobile, email, password } = req.body;
  const sql = `
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

// 用户或管理员登录功能 post 请求接口
router.post('/in', function(req, res, next) {
  const { mobile, password, role } = req.body;
  const tableName = role === 'admin' ? 'admin' : 'users';

  const accessToken = jwt.sign({ username: mobile, role: role }, accessTokenSecret);
  console.log(accessToken);

  const sql = `SELECT * FROM ${tableName}
               WHERE mobile='${mobile}';
               SELECT * FROM ${tableName}
               WHERE mobile='${mobile}' AND password='${password}'`;
               
  pool.query(sql, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.json({"code": -1, "msg": "登录失败", "err": "存在错误登录失败！"});
    }
    else {
      if(results[0].length === 0) {
        res.json({"code": -1, "msg": "登录失败", "err": `手机号码为 ${mobile} 的${role === 'user' ? '用户' : '管理员'}不存在！`});
      }
      else if(results[1].length === 0) {
        res.json({"code": -1, "msg": "登录失败", "err": `${role === 'user' ? '用户' : '管理员'}用户名或密码错误!`});
      }
      else {
        let data;
        if(role === 'user') {
          data = {user_id: results[1][0].id, user_nickname: results[1][0].nickname, accessToken};
          console.log(results[1][0]);
        }
        else {
          data = {accessToken};
        }
        res.json({"code": 0, "msg": "登录成功", "data": data});
      }
    }
})
})



module.exports = router;
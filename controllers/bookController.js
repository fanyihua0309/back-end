// const Book = require('../models/book');

// exports.index = (req, res) => { res.send('未实现：站点首页'); };

var mysql = require("mysql");
var config = require('../database/config.js');
// var querySql = require('../database/querysql.js');
//使用DBConfig中配置信息创建一个MySQL连接池
var pool = mysql.createPool( config.mysql );
var responseJSON = function(res,ret){
  if(typeof ret == 'undefined') {
    res.json({code:"-200",msg:"操作失败"});
  }
  else {
     res.json(ret);
  }
};

exports.index = (req, res) => {
  pool.getConnection(function(err,connection){
    // var params = req.query || req.params;        //前端传的参数（暂时写这里，在这个例子中没用）
    var sql = 'select * from websites';
    connection.query(sql,function(err,result){
      responseJSON(res,result);   //将结果以json形式返回到前台
      connection.release();     //释放链接
    })
  })
}
# Movies Web App

## 1.项目简介

项目开发时间：2021年5月20日-2021年6月7日

功能概述：用户角色分为普通用户和管理员，用户登录成功后进入系统，管理员与普通用户看到的页面不同。管理员可以对电影信息进行操作，用户不可对电影信息操作，可以对电影进行标记喜欢或看过并打分。具体功能点见功能说明部分。

前后端分离，提交于不同的代码仓库

前端项目地址：https://github.com/fanyihua0309/front-end.git

后端项目地址：https://github.com/fanyihua0309/back-end.git



## 2.开发环境和工具

1.操作系统：windows 10 64bit

2.开发框架及语言：

（1）前端：React 框架（JavaScript / JSX）

（2）后端：Express 网页框架（node.js）

3.开发工具：

（1）编译器 Visual Studio Code version 1.56

（2）数据库 MySQL server、Navicat可视化工具

（3）请求调试工具Postman



## 3.项目运行

#### 1.安装依赖和 MySQL

前后端需要先安装 package.json 文件中写明的项目依赖，后端需要在本地安装 MySQL ，在后端 database/pool.js 中配置自己的user, password, database, port等信息。

#### 2.事先定义好基本表和视图

```
一、基本表
（1）创建管理员身份信息表
CREATE TABLE
IF NOT EXISTS admin (
id INT NOT NULL AUTO_INCREMENT,
mobile VARCHAR (11) NOT NULL UNIQUE,
password VARCHAR (32) NOT NULL,
PRIMARY KEY (id)
);

（2）创建用户身份信息表
CREATE TABLE
IF NOT EXISTS users (
id INT NOT NULL AUTO_INCREMENT,
nickname VARCHAR (32) NOT NULL,
mobile VARCHAR (11) NOT NULL UNIQUE,
email VARIANCE(32) NOT NULL,
password VARCHAR (32) NOT NULL,
PRIMARY KEY (id)
);

（3）创建电影基本信息表
CREATE TABLE
IF NOT EXISTS movies (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR (128) NOT NULL UNIQUE,
date DATE,
area VARCHAR (128),
director VARCHAR (128),
starring VARCHAR (128),
type VARCHAR (128),
PRIMARY KEY (id)
);

（4）创建用户标记喜欢记录表
CREATE TABLE 
IF NOT EXISTS userlike (
id INT NOT NULL AUTO_INCREMENT,
user_id INT NOT NULL,
movie_id INT NOT NULL,
create_time DATETIME NOT NULL,
PRIMARY KEY(id),

FOREIGN KEY(user_id) REFERENCES users(id)
ON UPDATE CASCADE
ON DELETE CASCADE,

FOREIGN KEY(movie_id) REFERENCES movies(id)
ON UPDATE CASCADE
ON DELETE CASCADE
);

（5）创建用户标记看过/评分记录表
CREATE TABLE 
IF NOT EXISTS usersee (
id INT NOT NULL AUTO_INCREMENT,
user_id INT NOT NULL,
movie_id INT NOT NULL,
rate SMALLINT,
create_time DATETIME NOT NULL,
PRIMARY KEY(id),

FOREIGN KEY(user_id) REFERENCES users(id)
ON UPDATE CASCADE
ON DELETE CASCADE,

FOREIGN KEY(movie_id) REFERENCES movies(id)
ON UPDATE CASCADE
ON DELETE CASCADE
);

二、视图
（1）movieslike
通过左外连接表movies和表userlike统计每部电影标记喜欢的总人数
CREATE VIEW movieslike
AS
SELECT movies.id AS movie_id, COUNT(movie_id) AS likeTotal
FROM movies LEFT OUTER JOIN userlike ON (movies.id=userlike.movie_id)
GROUP BY (movies.id)

（2）moviessee
通过左外连接表movies和表usersee统计每部电影标记看过的总人数及评分平均分
CREATE VIEW moviessee
AS
SELECT movies.id AS movie_id, COUNT(movie_id) AS seeTotal, AVG(rate) AS rateAvg
FROM movies LEFT OUTER JOIN usersee ON (movies.id=usersee.movie_id)
GROUP BY (movies.id)
```

#### 3.终端运行

使用Visual Studio Code 编译器，需要拆分两个终端，在终端分别键入命令启动前后端：

前端

```
npm start
```

后端

```
npm run devstart
```

访问 http://localhost:3000/ 即可看到前端应用界面



## 4.功能说明

#### 1.注册登录部分

（1）用户注册：输入昵称、手机号码、邮箱、密码、确认密码进行注册，注册成功后可用手机号码作为用户名，使用用户名和密码进行登录。每个手机号码只能注册一个账号。

（2）用户登录：输入用户名和密码进行登录。

（3）管理员注册：内置管理员用户名和密码，不可注册，管理员账号唯一。

（4）管理员登录：输入用户名和密码进行登录。

#### 2.管理员部分

（1）浏览：浏览呈现的电影基本信息列表，包括电影名称、上映时间、国家地区、导演、主演、类型、喜欢人数、看过人数、评分平均分等。

（2）新增：输入电影名称、上映时间、国家地区、导演、主演、类型可发布一个新的电影信息，其中电影名称不可重复，且不为空，其他字段可以为空。

（3）编辑：选择需要待编辑的电影，可用修改电影名称、上映时间、国家地区、导演、主演、类型中的一个或多个。

（4）删除/批量删除：可用选择待删除的电影，删除该电影的所有信息；也可以多选或全选待删除的电影，进行批量删除。

（5）检索：可以按基本信息的某个字段输入关键字进行检索或组合检索。

（6）排序：选择按喜欢人数、看过人数、评分情况进行升序或降序排序电影。

#### 3.用户部分

（1）浏览：浏览呈现的电影基本信息列表，包括电影名称、上映时间、国家地区、导演、主演、类型、喜欢人数、看过人数、评分平均分等。

（2）标记：可以对某部电影标记喜欢、看过并进行评分，标记之后支持可以取消喜欢、编辑评分。

（3）查看标记历史动态：可以查看自己标记喜欢或看过、评分的历史动态，以时间倒序展示。

（4）修改个人信息和退出登录：在个人资料页可以查看自己的注册信息；可以修改昵称、手机号码、邮箱、密码，其中修改密码需要先验证旧密码；可以退出登录。



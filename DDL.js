// 定义基本表和视图
// 基本表：管理员表、用户表、电影信息表、用户标记喜欢表、用户标记看过/评分表
// 视图：电影标记喜欢情况、电影标记看过/评分情况、电影整合之后的所有有关信息
// 启动服务器之前，执行 node DDL.js 

const pool = require('./database/pool');

const sql = 
            `CREATE TABLE
            IF NOT EXISTS admin (
            id INT NOT NULL AUTO_INCREMENT,
            mobile VARCHAR (11) NOT NULL UNIQUE,
            password VARCHAR (32) NOT NULL,
            PRIMARY KEY (id)
            );

            CREATE TABLE
            IF NOT EXISTS users (
            id INT NOT NULL AUTO_INCREMENT,
            nickname VARCHAR (32) NOT NULL,
            mobile VARCHAR (11) NOT NULL UNIQUE,
            email VARCHAR (32) NOT NULL,
            password VARCHAR (32) NOT NULL,
            PRIMARY KEY (id)
            );

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

            CREATE OR REPLACE VIEW movieslike
            AS
            SELECT movies.id AS movie_id, COUNT(movie_id) AS likeTotal
            FROM movies LEFT OUTER JOIN userlike ON (movies.id=userlike.movie_id)
            GROUP BY (movies.id);

            CREATE OR REPLACE VIEW moviessee
            AS
            SELECT movies.id AS movie_id, COUNT(movie_id) AS seeTotal, AVG(rate) AS rateAvg
            FROM movies LEFT OUTER JOIN usersee ON (movies.id=usersee.movie_id)
            GROUP BY (movies.id);

            CREATE OR REPLACE VIEW moviesall
            AS
            SELECT id, name, date, area, director, starring, type, likeTotal, seeTotal, rateAvg FROM movies,movieslike, moviessee
            WHERE movies.id = movieslike.movie_id AND movies.id = moviessee.movie_id;`

pool.query(sql, function(error, results, fields) {
  if(error) {
    throw error;
  }
  console.log("Data definition is done.");
})
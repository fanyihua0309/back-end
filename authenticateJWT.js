const jwt = require('jsonwebtoken');

// 生成随机字符串作为 accessTokenSecret 的值
const accessTokenSecret = Math.random().toString(36).substr(2);

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
module.exports.accessTokenSecret = accessTokenSecret;
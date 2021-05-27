const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('test sign');
})

// router.use(express.urlencoded());
router.post('/in', function(req,res,next){
  // let username = req.body.username;
  // let password = req.body.password;
  res.send(req.body);
})

module.exports = router;
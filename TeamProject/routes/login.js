var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var app = express()
var dbcon = require('../db/db');
const bcrypt = require('bcrypt');
const saltRounds = 10

app.use(bodyParser.urlencoded({ extended: true }))

/* GET loginpage */
router.get('/', function(req, res, next) {
  res.render('login');
});



router.post('/register', function(req, res, next) {
  dbcon.SQLconn();
  var userName = req.body.name;          //form에서 받은 데이터
  var userEmail = req.body.email;       //form에서 받은 데이터
  var userPassword = req.body.password;  //form에서 받은 데이터
  // 첫번째 argument : 실제 비밀번호
  // hash : 암호화된 비밀번호
  bcrypt.hash(userPassword, saltRounds, function(err, hash) { //비밀번호를 암호화 한 뒤 DB에 insert 한다.
    if(err) {
      return next(err);
    }
      userPassword = hash; 
      dbcon.Insert(userName, userEmail, userPassword)
  });
  res.redirect('/login')
});

router.post('/signin', function(req, res, next) {

});

module.exports = router;
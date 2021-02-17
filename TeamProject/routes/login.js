var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var app = express()
var jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');
const saltRounds = 10

var dbcon = require('../db/db');
var secretObj = require('../config/jwt');

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
    console.log("Welcome!")
  });
  res.redirect('/login')
});

router.post('/signin', function(req, res, next) {
  dbcon.SQLconn();
  var userEmail = req.body.email;       //form에서 받은 데이터
  var userPassword = req.body.password;  //form에서 받은 데이터
  dbcon.Select(userEmail, function(err, results) {
    if (err) {
      console.log("Database error!");
    }
    else {
      console.log(results);
    }
    var name = results[0].name
    var dbemail = results[0].email
    var hash_password = results[0].password
    if(userEmail === dbemail) {
      console.log("Correct email!")
      bcrypt.compare(userPassword, hash_password, function(err, result) {
        if(err) { console.log(err); } 
        else {
          if(result) { //true
            console.log("Correct password!")
            console.log("Login success")
            res.redirect('/', /*{ name : name }*/)
          } else {
            console.log("Uncorrect password!")
            res.redirect('/login')
          }
        }
      })
    } else {
      console.log("Don't find this user!")
      res.redirect('/login')
    }
  })
});

module.exports = router;
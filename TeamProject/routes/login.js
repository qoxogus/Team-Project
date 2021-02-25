var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var app = express()

const bcrypt = require('bcrypt');
const saltRounds = 10

var dbcon = require('../db/db');
const jwt = require('../modules/jwt');

app.use(bodyParser.urlencoded({ extended: true }))

/* GET loginpage */
router.get('/', function(req, res, next) {
  res.render('login');
});



router.post('/register', function(req, res, next) { //회원가입
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

router.post('/signin', function(req, res, next) { //login
  dbcon.SQLconn();                      //db 연결
  var userEmail = req.body.email;       //form에서 받은 데이터
  var userPassword = req.body.password;  //form에서 받은 데이터
  dbcon.Select(userEmail, function(err, results) {
    if (err) {
      console.log("Database error!");
    }
    if(results[0] == null) {
      console.log("Don't find this user!  [Login failed]")
      res.redirect('/login')
      return
    }
    else {
      console.log(results);
    }
    var names = results[0].name
    var dbemail = results[0].email
    var hash_password = results[0].password
    var ismanager = results[0].ismanager
    if(userEmail === dbemail) {
      console.log("Correct email!")
      bcrypt.compare(userPassword, hash_password, async function(err, result) {
        if(err) { console.log(err); } 
        else {
          if(result) { //true
            console.log("Correct password!  [Login success]")
            //토큰 발급
            const jwtToken = await jwt.sign(names, dbemail, ismanager);
            console.log(jwtToken.token);
            console.log("refresh token : "+jwtToken.refreshToken);
            res.writeHead(200, {
              'Set-Cookie':[
                  `jwt_cookie=${jwtToken.token}; HttpOnly; Max-Age=${60*30}; Path=/`
              ]                                                
          });
          res.end(`${jwtToken.token}`)
            // return 
            // res.status(200).send(jwtToken.token)
            // res.redirect('/')
          } else {
            console.log("Uncorrect password!  [Login failed]")
            res.redirect('/login')
          }
        }
      })
    } else {
      console.log("Don't find this user!  [Login failed]")
      res.redirect('/login')
    }
  })
});

module.exports = router;
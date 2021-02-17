// if(userEmail === dbemail) {
//     console.log("Correct email!")
//     bcrypt.compare(userPassword, hash_password, function(err, result) {
//       if(err) { console.log(err); } 
//       else {
//         if(result) { //true
//           console.log("Correct password!")
//           console.log("Login success")
//           res.redirect('/main', /*{ name : name }*/)
//         } else {
//           console.log("Uncorrect password!")
//           res.redirect('/login')
//         }
//       }
//     })
//   } else {
//     console.log("Don't find this user!")
//     res.redirect('/login')
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

//   }
router.get('/', function(req, res, next) {
  // var userPassword = 111111;
  // var hash_password = "$2b$10$EbR8Vk5bT7iMFKqaD2q4oeG0Dtgv11FA788PwyD/WFsLRen17PUNi";
  // bcrypt.compare(userPassword, hash_password, function(err, result) {
    
  //   var userEmail = 123;
  //   var dbemail = 123;
  //   if(userEmail === dbemail && userPassword === hash_password) { //패스워드문제남
  //     //success login
  //     res.send('hi');
  //     // res.render('main', /*{ name : names }*/)
  //     // res.redirect('/')
  //   } else {
  //     //failed login
  //     res.send('bye');
  //     // res.redirect('/login')
  //   }
  // })
  var userEmail = 123;
  var dbemail = 123;
  var userPassword = '111111';
  var hash_password = "$2b$10$EbR8Vk5bT7iMFKqaD2q4oeG0Dtgv11FA788PwyD/WFsLRen17PUNi";
  if(userEmail === dbemail) {
    console.log("Correct email!")
    bcrypt.compare(userPassword, hash_password, function(err, result) {
      if(err) { console.log(err); } 
      else {
        if(result) { //true
          console.log("Correct password!  [Login success]")
        } else {
          console.log("Uncorrect password!")
        }
      }
    })
    // bcrypt.compare(userPassword, hash_password, function(err, result) {
    //   console.log(result)
    // })
  } else {
    res.send("Don't find this user!")
  }
  res.send('hahahahahaahahahaha')
})
  

// if(userEmail === dbemail) {
//   console.log("Correct email!")
//   bcrypt.compare(userPassword, hash_password, function(err, result) {
//     if(err) { console.log(err); } 
//     else {
//       if(result) { //true
//         console.log("Correct password!  [Login success]")
//       } else {
//         console.log("Uncorrect password!")
//       }
//     }
//   })
//   // bcrypt.compare(userPassword, hash_password, function(err, result) {
//   //   console.log(result)
//   // })
// } else {
//   res.send("Don't find this user!")
// }

module.exports = router;
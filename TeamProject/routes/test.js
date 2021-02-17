if(userEmail === dbemail) {
    console.log("Correct email!")
    bcrypt.compare(userPassword, hash_password, function(err, result) {
      if(err) { console.log(err); } 
      else {
        if(result) { //true
          console.log("Correct password!")
          console.log("Login success")
          res.redirect('/main', /*{ name : name }*/)
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
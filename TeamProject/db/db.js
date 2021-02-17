var express = require('express')
var dbj = require('./db.json')
//mysql 모듈 불러오기
var mysql = require('mysql2')

//mysql 커넥션 생성
var connection = mysql.createConnection({
    host : dbj.HOST,
    port : dbj.PORT,
    user : dbj.USER,
    password : dbj.PASSWORD,
    database : dbj.database
})

module.exports = {
    SQLconn:function() {
        connection.connect()
        console.log("[DB 연결 완료]")
    },
    Insert:function(userName, userEmail, userPassword) {
        connection.query("INSERT INTO user (name, email, password) VALUES ('"+userName+"', '"+userEmail+"', '"+userPassword+"')")
        console.log("[INSERT 완료]")
    },
    Select:function(userEmail, callback) {
    connection.query("SELECT * FROM user WHERE email = ?",[userEmail], function(err, results) {
        if(err) {
            console.log(err)
        } 
        console.log("[SELCET 완료]")
        callback(null, results);
    })  
    }
}



const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createConnection({
    host : '150.158.157.98',
    user : 'root',
    password : 'ahj52777',
    database : 'user_test'
})


db.connect((err)=>{
    if (err) {
        throw err
    }
    console.log('connect successful')
})

// 测试数据库的增删改查


app.get('/createdb' , (req,res)=>{
    let sql = `CREATE DATABASE user` 
    db.query(sql , (err , result)=>{
        if(err) {
            throw err
        } 
        console.log(result) 
        res.send('database create successful')
    })
})

// 创建表
app.get('/createtable' , (req , res)=>{
    let sql = `CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255) , body VARCHAR(255) , PRIMARY KEY(id))` 
    db.query(sql , (err , result)=>{
        if(err) {
            throw err
        } 
        console.log(result)
        res.send('table create successful')
    })
})
// 增加两条数据 







app.listen(3000,()=>{
    console.log('server is listening')
})
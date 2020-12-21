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







app.listen(3000,()=>{
    console.log('server is listening')
})
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
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


// 创建表 另一种写法 

app.get('/create/table' , (req , res) => {
    let sql = `
    CREATE TABLE  IF NOT EXISTS user_table (
        id INT NOT NULL AUTO_INCREMENT,
        message VARCHAR(255),
        PRIMARY KEY(id)
    )
    `;

    db.query(sql , (err , result)=>{
        if(err){
            throw err
        }
        res.send('table create successful user_table')
    })
} )

app.get('/create/table2' , (req , res) => {
    let sql = `
    CREATE TABLE  IF NOT EXISTS user_table2 (
        id INT NOT NULL AUTO_INCREMENT,
        title   VARCHAR(255),
        message VARCHAR(255),
        PRIMARY KEY(id)
    )
    `;

    db.query(sql , (err , result)=>{
        if(err){
            throw err
        }
        res.send('table create successful user_table2')
    })
})


// 增加两条数据 

app.post('/addmessage' , (req,res)=>{
   const {title , body} = req.body 
   let sql = `INSERT INTO posts SET ?` 
   db.query(sql , {title , body} , (err , result)=>{
       if(err) {
           throw err
       } 
       console.log(result) 
       res.send('insert successful ')
   })
})


app.post('/add/message' , (req,res)=>{
    const {message} = req.body 
    let sql = `INSERT INTO user_table(message) VALUES(?)` 
    db.query(sql , message , (err , result)=>{
        if(err) {
            throw err
        } 
        console.log(result) 
        res.send('insert successful ')
    })
 })

 app.post('/add/message2' , (req,res)=>{
    const {title , message} = req.body 
    let sql = `INSERT INTO user_table2(title,message) VALUES(?,?) ` 
    db.query(sql , [title , message ], (err , result)=>{
        if(err) {
            throw err
        } 
        console.log(result) 
        res.send('insert successful ')
    })
 })









// 查找数据 

app.get('/searchall' , (req,res)=>{
    let sql = `
       SELECT * FROM posts
    `

    db.query(sql , (err , result)=>{
        if(err) {
            throw err
        } 
        res.json(result)
    })
})



app.get('/search/all' , (req,res)=>{
    let sql = `
       SELECT * FROM user_table
    `

    db.query(sql , (err , result)=>{
        if(err) {
            throw err
        } 
        res.json(result)
    })
})

app.get('/search/all2' , (req,res)=>{
    let sql = `
       SELECT * FROM user_table2
    `

    db.query(sql , (err , result)=>{
        if(err) {
            throw err
        } 
        res.json(result)
    })
})





// 根据特定查找数据

app.get('/search/:id' , (req,res)=>{
    let sql = `
    SELECT * FROM posts WHERE id = ${req.params.id}
    `
    db.query(sql , (err , result)=>{
        if(err) {
            throw err
        } 
        res.json(result)
    })
})


// 删除数据

app.delete('/delete/:id' , (req , res)=>{

    let sql = `
    DELETE FROM posts WHERE id = ${req.params.id}
    `
    db.query(sql , (err , result)=>{
        if(err) {
            throw err
        } 
        res.json(result)
    })
})



// 更新数据 

app.post('/updateposts' , (req , res)=>{
    const {id , title} = req.body
    let sql = `
    UPDATE  posts SET title = '${title}' WHERE id = ${id}
    `
    db.query(sql , (err , result)=>{
        if(err) {
            throw err
        } 
        res.json(result)
    })
})








app.listen(3000,()=>{
    console.log('server is listening')
})
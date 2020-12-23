const bp = require('body-parser')
const express = require('express')
const mysql = require('mysql')
var app = express()

// app.set('view engine','ejs');
// app.use(bp.json)
var sqlcon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodetest',
    multipleStatements: true
});
sqlcon.connect((err)=>{
    if(!err){
        console.log('Success')
    } else {
        console.log("Failed"+JSON.stringify(err,undefined,2));
    }
})

app.get('/',(req,res)=>{
    res.send("Hello");  
    console.log("Hello world");
});

var path = require("path");
app.get('/index',function(req,res){
    res.sendFile(path.join(__dirname+'/test.html'));
});

app.get('/new',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/node',(req,res)=>{
    res.send('Welcome to nodejs');
})
app.get('/emp',(req,res)=>{
    sqlcon.query('select * from User',(err,rows,fields)=>{
        if(!err){
            res.send({data: rows});
        } else {
            console.log(err)
        }
    })
})
app.get('/emp/:id',(req,res)=>{
    sqlcon.query('select * from User where id=?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send({data: rows});
        } else {
            console.log(err)
        }
    })
})
app.post('/empins',(req,res)=>{
    let emp = req.body;
    var ins = "insert into User values(2,'hiral','CE',35000)";
    sqlcon.query(ins,{emp: emp},(err,rows,fields)=>{
        if(!err){
            res.send("data inserted successfully");
        } else {
            console.log(err)
        }
    })
})
app.put('/empupt/:id',(req,res)=>{
    let emp = req.body;
    var upt = "update User set department='Sales',salary='45000' where id=?";
    sqlcon.query(upt,[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send("data updated successfully");
        } else {
            console.log(err)
        }
    })
})
app.delete('/empdel/:id',(req,res)=>{
    sqlcon.query('delete from User where id=?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send("deleted successfully");
        } else {
            console.log(err)
        }
    })
})
app.listen(8090,()=>console.log('Server started'));

//npm run serve
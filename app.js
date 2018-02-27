let express = require('express');
let fs = require('fs');
let pg = require('pg');
let models = require('./models')
//let sequelize = require('sequelize');
let bodyParser = require('body-parser')
////1
let app = express()
//////2
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

let user = models.User
let todo = models.Todo


app.get('/', function (req, res) {  
    res.send('hai');
    
})


app.get('/baca', function (req, res) {  

    fs.readFile('./readme.txt', 'utf8', function (err, data) {
        if (err) {
          console.log("err");          
        } 
        var splitEnter = data.split('\n');
        
        var yunaCo = []
       for (let i = 1; i < splitEnter.length; i++) {
            var a = splitEnter[i].split(',')
            
            var people = {}
            people.nama = a[0]
            people.kelas = a[1]
            people.alamat = a[2]
            // console.log(yunaCo)
            yunaCo.push(people)         
       }
       res.send(yunaCo)   
    
    })

})

app.get('/tampil/:userId', function (req,res) {
    user.findAll({
        where:{ id: req.params.userId },
        include:[{model:todo}]
    }).then(function (data) {
        res.send(data)
    })
})

app.post('/adduser', function(req,res) {
    user.create({name:req.body.name}).then(function(){
        res.redirect('/tampil')
        
    })
    
})

app.post('/addtodo', function(req,res) {
    todo.create({task:req.body.task, userId:req.body.userId}).then(function(){
        res.redirect('/tampil')
        
    })
    
})

app.listen('3000', function () {
    console.log('telah berjalan di server 3000');
    
})
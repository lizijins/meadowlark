var express = require('express');
var app = express();

//连接数据库
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/project");

//添加初始数据
var Animal = require('./models/animals.js');

app.set('port', process.env.PORT || 3000);


//express中，路由和中间件的添加顺序至关重要
app.use(express.static(__dirname + '/public')); //添加static中间件（相当于给静态文件创建了一个路由）

app.get('/', function(req, res) { //app.get是添加路由的方法
    res.sendfile('index.html');
});

app.get('/api/animals', function(req, res) {
    Animal.find(function(err, animals) {
        if(animals.length) {
            res.json(animals);
        } else {
            console.log('error!!!');
        }
    });
});

//定制404页面
app.use(function(req, res) { //app.use是express添加中间件的方法
    res.status(404);
    res.send("404");
});

//定制500页面
app.use(function(err, req, res, next) {
    //console.error(err.stack);
    res.status(500);
    res.send("500");
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
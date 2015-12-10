var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();

//设置handlebars视图引擎
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);


//express中，路由和中间件的添加顺序至关重要
//app.use(function(req, res, next) {
//    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
//    next();
//});
//app.use(express.static(__dirname + '/public')); //添加static中间件（相当于给静态文件创建了一个路由）
//
//app.get('/', function(req, res) { //app.get是添加路由的方法
//    res.render('home');
//});
//
//app.get('/about', function(req, res) {
//    res.render('about', {
//        fortune: fortune.getFortune(),
//        pageTestScript: '/qa/tests-about.js'
//    });
//});
////定制404页面
//app.use(function(req, res) { //app.use是express添加中间件的方法
//    res.status(404);
//    res.render('404');
//});
//
////定制500页面
//app.use(function(err, req, res, next) {
//    console.error(err.stack);
//    res.status(500);
//    res.render("500");
//});


app.use(function(req, res, next) {
    console.log('\n\nALLWAYS');
    next();
});

app.get('/a', function(req, res) {
    console.log('/a:路由终止');
    res.send('a');
});

app.get('/a', function(req, res) {
    console.log('/a:永远不会调用');
});

app.get('/b', function(req, res, next) {
    console.log('/b:路由未终止');
    next();
});

app.use(function(req, res, next) {
    console.log('SOMETIMES');
    next();
});

app.get('/b', function(req, res, next) {
    console.log('/b(part 2):抛出错误');
    throw new Error('b 失败');
});

app.use('/b', function(err, req, res, next) {
    console.log('/b 检测到错误并传递');
    next(err);
});

app.get('/c', function(err, req) {
    console.log('/c:抛出错误');
    throw new Error('c 失败');
});

app.use('/c', function(err, req, res, next) {
    console.log('/c: 检测到错误但不传递');
    next();
});

app.use(function(err, req, res, next) {
    console.log('检测到未知错误：'+err.message);
    res.send('500 - 服务器错误');
});

app.use(function(req, res) {
    console.log('未处理的路由');
    res.send('404 - 未找到');
});


app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
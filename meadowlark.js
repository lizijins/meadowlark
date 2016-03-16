var express = require('express');

var app = express();

//连接数据库
//var mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost");

app.set('port', process.env.PORT || 3000);


//express中，路由和中间件的添加顺序至关重要
app.use(express.static(__dirname + '/public')); //添加static中间件（相当于给静态文件创建了一个路由）

app.get('/', function(req, res) { //app.get是添加路由的方法
    res.sendfile('index.html');
});

app.get('/api/animals', function(req, res) {
    var animals = [{"id": 0, "url": 'animal-1.svg', "word": "狮子", "introduce": '狮子（学名：Panthera leo；英文名：Lion）：简称狮，中国古称狻猊。是一种生存在非洲与亚洲的大型猫科动物，是现存平均体重最大的猫科动物，也是在世界上唯一一种雌雄两态的猫科动物。'},
        {"id": 1, "url": 'animal-2.svg', "word": "斑马", "introduce": '斑马（英文名称：zebra）：是现存的奇蹄目马科马属3种兽类的通称。因身上有起保护作用的斑纹而得名。没有任何动物比斑马的皮毛更与众不同。斑马周身的条纹和人类的指纹一样——没有任何两头完全相同。斑马为非洲特产。非洲东部、中部和南部产平原斑马，由腿至蹄具条纹或腿部无条纹。东非还产一种格式斑马，体格最大，耳长（约20厘米）而宽，全身条纹窄而密，因而又名细纹斑马。南非洲产山斑马，与其它两种斑马不同的是，它有一对象驴似的大长耳朵。除腹部外，全身密布较宽的黑条纹，雄体喉部有垂肉。'},
        {"id": 2, "url": 'animal-3.svg', "word": "大象 ", "introduce": '大象是现存世界上最大的陆地栖息群居性哺乳动物，通常以家族为单位活动，有时几个象群聚集起来，结成上百只大象。非洲象由雌象做首领，每天活动的时间，行动路线，觅食地点，栖息场所等均听雌象指挥；亚洲象则相反，由成年雄象承担保卫家庭安全的责任。大象的皮层很厚，但皮层褶皱间的皮肤很薄，因此常用泥土浴的方式防止蚊虫叮咬。象牙是防御敌人的重要武器。'}];
    res.json(animals);
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
var fortuneCookies = [
    "Conquer your fears or they will conquer you",
    "Rivers need springs",
    "Do not fear what you don't know",
    "you will have a pleasant surprise"
];

//注意全局变量的使用，想要让一个东西在模块外可见，必须把它加到exports上
exports.getFortune = function() {
    var idx = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies[idx];
};
var mongoose = require('mongoose');

var animalSchema = mongoose.Schema({
    id: Number,
    url: String,
    name: String,
    introduce: String
});

var Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;
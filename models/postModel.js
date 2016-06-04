'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var postModel = new Schema({
    title: String,
    subTitle: String,
    author: String,
    theme: String,
    body: String,
    postDate: {type: Date, default : Date.now()}
});

module.exports = mongoose.model('Post', postModel);
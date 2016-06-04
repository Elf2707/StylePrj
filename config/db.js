var mongoose = require('mongoose');
var config = require('./config');

//setup mongoose
if(process.env.ENV == 'test'){
    mongoose.connect(config.dbUrlTest);
} else {
    mongoose.connect(config.dbUrl);
}

var db = mongoose.connection;

db.on('error', (err)=> {
    console.log('mongoose connection error: ' + err);
});

db.once('open', function () {
    console.log('Connect to database done');
});

module.exports = db;

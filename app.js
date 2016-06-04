var express = require('express');
var path = require('path');
var config = require('./config/config');
var bodyParser = require('body-parser');

var postsRouter = require('./routes/postsRouter');
var navigationRouter = require('./routes/navigationRouter');

var app = express();
var port = process.env.PORT || config.port;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//static files
app.use(express.static(path.join(__dirname, '/frontend')));

app.use('/', navigationRouter);
app.use('/api/posts', postsRouter);
app.db = require('./config/db');

app.listen(port, function (err) {
    if (err) {
        console.log('Error while starting server' + err);
        return;
    }

    console.log('Server is runing on port ' + port);
});

module.exports = app;
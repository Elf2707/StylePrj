var express = require('express');
var path = require('path');
var config = require('./config/config');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');


var postsRouter = require('./routes/postsRouter');
var navigationRouter = require('./routes/navigationRouter');
var usersRouter = require('./routes/usersRouter');

var app = express();
var port = process.env.PORT || config.port;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: "my my very very !@#^%$",
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//static files
app.use(express.static(path.join(__dirname, '/frontend')));

app.use('/', navigationRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

app.db = require('./config/db');

app.listen(port, function (err) {
    if (err) {
        console.log('Error while starting server' + err);
        return;
    }

    console.log('Server is runing on port ' + port);
});

module.exports = app;
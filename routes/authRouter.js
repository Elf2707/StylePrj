/**
 * Created by Elf on 05.06.2016.
 */
'use strinct';
var User = require('../models/userModel');
var express = require('express');

var router = express.Router();
var authConfig = require('../auth/config/auth-config');

router.route('/').get(authConfig);

module.exports = router;
/**
 * Created by Elf on 05.06.2016.
 */
'use strinct';
var User = require('../models/userModel');
var express = require('express');

var router = express.Router();
var usersController = require('../controllers/usersController')(User);

router.route('/').get(usersController.getAllUsers);
router.route('/user').get(usersController.getUserByOptions);

module.exports = router;
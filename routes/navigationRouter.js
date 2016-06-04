/**
 * Created by Elf on 03.06.2016.
 */
// Router for refreshing pages on site
var express = require('express');
var path = require('path');
var config = require('../config/config.js')

var router = express.Router();

router.route(['/admin/posts', '/about']).get((req, res) => {
    res.sendFile(path.join(__dirname, '..', config.indexHtml));
});

module.exports = router;
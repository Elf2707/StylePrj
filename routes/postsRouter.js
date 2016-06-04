'use strinct';
var Post = require('../models/postModel');
var express = require('express');

var router = express.Router();
var postsController = require('../controllers/postsController')(Post);

router.route('/').get(postsController.getAllPosts)
    .post(postsController.addPost);

router.route('/:postId').get(postsController.getPostById)
    .put(postsController.updatePost)
    .patch(postsController.updatePostPartially)
    .delete(postsController.deletePost);

module.exports = router;
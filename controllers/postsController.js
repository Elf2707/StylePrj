'use strinct';

var postController = (Post)=> {
    var getAllPosts = (req, res)=> {
        var callBack = (err, posts)=> {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.json(posts);
            }
        };

        //Test was limit params in query
        var postCount = parseInt(req.query.count);

        if (!isNaN(postCount) && isFinite(postCount)) {
            Post.find({})
                .sort({postDate: -1})
                .limit(postCount)
                .exec(callBack);
        } else {
            Post.find({})
                .sort({postDate: -1})
                .exec(callBack);
        }
    };

    var addPost = (req, res)=> {
        var post = new Post(req.body);

        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        } else {
            post.save();
            res.status(201);
            res.send(post);
        }
    };

    var getPostById = (req, res)=> {
        Post.findById(req.params.postId, (err, post)=> {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else if (post) {
                res.json(post);
            } else {
                res.status(404).send('Post not found');
            }
        });
    };

    var updatePost = (req, res)=> {
        Post.findById(req.params.postId, (err, post)=> {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else if (post) {
                post.title = req.body.title;
                post.subTitle = req.body.subTitle;
                post.author = req.body.author;
                post.theme = req.body.theme;
                post.body = req.body.body;
                post.postDate = new Date(req.body.postDate);

                post.save((err)=> {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                        res.status(200).json(post);
                    }
                });
            } else {
                res.status(404).send('Post not found');
            }
        });
    };

    var updatePostPartially = (req, res)=> {
        Post.findById(req.params.postId, (err, post)=> {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else if (post) {
                if (req.body._id) {
                    delete req.body._id;
                }

                for (var p in req.body) {
                    post[p] = req.body[p];
                }

                post.save((err)=> {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                        res.status(200).json(post);
                    }
                });
            } else {
                res.status(404).send('Post not found');
            }
        });
    };

    var deletePost = (req, res)=> {
        Post.findById(req.params.postId, (err, post)=> {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else if (post) {
                post.remove((err)=> {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                        res.status(204).end();
                    }
                });
            } else {
                res.status(404).send('Post not found');
            }
        });
    };

    return {
        getAllPosts: getAllPosts,
        addPost: addPost,
        getPostById: getPostById,
        updatePost: updatePost,
        updatePostPartially: updatePostPartially,
        deletePost: deletePost
    }
}

module.exports = postController;
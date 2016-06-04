var should = require('should'),
    sinon = require('sinon');

describe('posts controller test', ()=> {
    describe('Post tests', ()=> {
        it('Should not allow to add post with an empty title', ()=> {
            var Post = function(post){
                this.save = ()=>{};
            };

            var req = {
                body: {
                    author: 'John'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var postController = require('../controllers/postsController')(Post);

            postController.addPost(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        });
    });
});
var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    Post = require('../models/postModel'),
    agent = request.agent(app);

describe('Post CRUD test', ()=> {
    it('Should allow a post to be posted it should return id', (done)=> {
        var postToPost = {
            title: 'new post',
            author: 'Unknown',
            theme: 'About something',
            mainImage: 'sdsdsdsd'
        };

        agent.post('/api/posts')
            .send(postToPost)
            .expect(201)
            .end((err, results)=> {
                if (err) {
                    console.log(err);
                }

                results.body.title.should.equal('new post');
                results.body.should.have.property('_id');
                done();
            });
    });

    afterEach((done)=> {
        Post.remove().exec();
        done();
    });
});
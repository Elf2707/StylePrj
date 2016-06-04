/**
 * Created by Elf on 28.05.2016.
 */
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/common';
import {RouteParams, Router} from '@angular/router-deprecated';
import {Http, HTTP_PROVIDERS} from '@angular/http';

import {Post} from '../model/post.model';
import {PostService} from "../shared/post.service";

@Component({
    selector: 'edit-post-form',
    templateUrl: 'app/posts/edit-post-form/edit-post-form.component.html',
    styleUrls: [
        'app/posts/edit-post-form/edit-post-form.component.css'
    ],
    providers: [PostService, HTTP_PROVIDERS]
})
export class EditPostFormComponent implements OnInit {
    post:Post;
    errorMessage:any;

    constructor(private postService: PostService, private routeParams:RouteParams,
                private router: Router){}

    onSubmit(){
        //Post new post to server
        this.postService.updatePost(this.post)
                        .subscribe(
                            post => console.log('Post was successfully updated ' + new Date()),
                            error => this.errorMessage = <any>error);
        var link = ['AdminPosts'];
        this.router.navigate(link);
    }

    ngOnInit():any {
        this.postService.getPost(this.routeParams.get('id'))
                    .subscribe(
                        (editPost) => {
                            this.post = editPost;
                        },
                        (error) => this.errorMessage = <any>error
                    );
    }

    get diagnostic() {return JSON.stringify(this.post)}
}
/**
 * Created by Elf on 28.05.2016.
 */
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/common';
import {Router} from '@angular/router-deprecated';
import {Http, HTTP_PROVIDERS} from '@angular/http';

import {Post} from '../model/post.model';
import {PostService} from "../shared/post.service";

@Component({
    selector: 'add-post-form-form',
    templateUrl: 'app/posts/add-post-form/add-post-form.component.html',
    styleUrls: [
        'app/posts/add-post-form/add-post-form.component.css'
    ],
    providers: [PostService, HTTP_PROVIDERS]
})
export class AddPostFormComponent implements OnInit {
    post:Post;
    errorMessage:any;

    constructor(private postService: PostService, private router: Router){}

    onSubmit(){
        //Post new post to server
        this.postService.addPost(this.post)
                        .subscribe(
                            post => console.log('Successfully added post ' + new Date()),
                            error => this.errorMessage = <any>error);
        var link = ['AdminPosts'];
        this.router.navigate(link);
    }

    ngOnInit():any {
        this.post = new Post("", "", "","", "","", new Date().toISOString());
    }

    get diagnostic() {return JSON.stringify(this.post)}
}
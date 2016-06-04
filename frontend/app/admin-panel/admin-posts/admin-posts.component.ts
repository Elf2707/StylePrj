/**
 * Created by Elf on 30.05.2016.
 * Admin panel for posts
 */
import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Post} from "../../posts/model/post.model";
import {PostService} from "../../posts/shared/post.service";
import {StringToDatePipe} from "../../posts/shared/pipes/str-to-date.pipe";

@Component({
    selector: 'admin-posts',
    templateUrl: 'app/admin-panel/admin-posts/admin-posts.component.html',
    directives: [ROUTER_DIRECTIVES],
    pipes: [StringToDatePipe]
})

export class AdminPostsComponent implements OnInit {
    private posts:Post[];
    private errorMessage:any;

    constructor(private postService:PostService, private router:Router){}


    ngOnInit():any {
        this.postService.getAllPosts().subscribe(
            posts => this.posts = posts,
            error => this.errorMessage = <any>error
        );
    }

    public editPost(id:string){
        let link = ['EditPostForm', {id: id}];
        this.router.navigate(link);
    }

    public deletePost(id:string){
        this.postService.deletePost(id).subscribe(
            () => this.posts = this.posts.filter((post)=>{
                return post._id !== id;
            }),
            error => this.errorMessage = <any>error
        );
    }
}

/**
 * Created by Elf on 30.05.2016.
 */
import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Post} from "../model/post.model";
import {PostService} from "../shared/post.service";
import {ShortCutPipe} from "../shared/pipes/short-cut.pipe";
import {StringToDatePipe} from "../shared/pipes/str-to-date.pipe";

@Component({
    selector: 'posts-list',
    templateUrl: 'app/posts/posts-list/posts-list.component.html',
    styleUrls: ['app/posts/posts-list/posts-list.component.css'],
    directives: [ROUTER_DIRECTIVES],
    pipes: [ShortCutPipe, StringToDatePipe]
})
export class PostsListComponent implements OnInit {
    private posts:Post[];
    private errorMessage:any;

    constructor(private postService:PostService){}


    ngOnInit():any {
        this.postService.getAllPosts().subscribe(
            posts => this.posts = posts,
            error => this.errorMessage = <any>error
        );
    }
}

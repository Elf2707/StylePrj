import {Component, OnInit} from '@angular/core';
import {Route, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {PostService} from "../posts/shared/post.service";
import {Post} from "../posts/model/post.model";

@Component({
    selector: 'my-main-menu',
    templateUrl: 'app/main-menu/main-menu.component.html',
    styleUrls: ['app/main-menu/main-menu.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class MainMenuComponent implements OnInit{
    posts:Post[];
    errorMsg:any;

    constructor(private postService:PostService){

    }

    ngOnInit():any {
        this.postService.getSomeLastPosts(5).subscribe(
            (posts) => {
                this.posts = posts;
            },
            (error) => {
                 this.errorMsg = <any>error;
             }
        )
    }

    get diagnostic() {return JSON.stringify(this.posts[0].title)}
}


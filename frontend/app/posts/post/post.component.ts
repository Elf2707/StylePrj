import {Component, OnInit} from '@angular/core'
import {RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Post} from "../model/post.model";
import {PostService} from "../shared/post.service";
import {StringToDatePipe} from "../shared/pipes/str-to-date.pipe";

@Component({
    selector: 'my-posts',
    templateUrl: 'app/posts/post/post.component.html',
    styleUrls: ['app/posts/post/post.component.css'],
    pipes: [StringToDatePipe],
    directives: [ROUTER_DIRECTIVES]
})
export class PostComponent implements OnInit {
    private post:Post;
    private errorMsg:any;

    constructor(private postService:PostService,
                private routeParams: RouteParams){
    }

    ngOnInit():any {
        this.postService.getPost(this.routeParams.get('id')).subscribe(
            post => this.post = post,
            error => this.errorMsg = <any>error
        )
    }
}
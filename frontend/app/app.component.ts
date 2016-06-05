import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {MainMenuComponent} from './main-menu/main-menu.component';
import {PostComponent} from "./posts/post/post.component.ts";
import {AboutComponent} from "./about/about.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {AddPostFormComponent} from "./posts/add-post-form/add-post-form.component";
import {PostsListComponent} from "./posts/posts-list/posts-list.component";
import {AdminPostsComponent} from "./admin-panel/admin-posts/admin-posts.component";
import {PostService} from "./posts/shared/post.service";
import {EditPostFormComponent} from "./posts/edit-post-form/edit-post-form.component";
import {RegistrationComponent} from "./users/registration/registration.component";


@Component({
    selector: 'my-app',
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [PostService]
})
@RouteConfig([
    {path: '/', name: 'MainMenu', component: MainMenuComponent, useAsDefault: true},
    {path: '/posts', name: 'AllPosts', component: PostsListComponent},
    {path: '/posts/:id', name: 'PostView', component: PostComponent},
    {path: '/about', name: 'About', component: AboutComponent},
    {path: '/contacts', name: 'Contacts', component: ContactsComponent},
    {path: '/posts/add', name: 'AddPostForm', component: AddPostFormComponent},
    {path: '/posts/edit/:id', name: 'EditPostForm', component: EditPostFormComponent},
    {path: '/admin/posts', name: 'AdminPosts', component: AdminPostsComponent},
    {path: '/users/register', name: 'UserRegister', component: RegistrationComponent}
])
export class AppComponent {
}
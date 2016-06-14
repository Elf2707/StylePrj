/**
 * Created by Elf on 13.06.2016.
 */
import {Injectable} from '@angular/core';

import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Control} from "@angular/common";

import User from '../model/user.model'

@Injectable()
export default class UserService {
    private userApiBaseUrl = '/api/users';

    constructor(private http:Http) {
    }

    getUserByEmail(email:string):Observable<User> {
        return this.http.get(this.userApiBaseUrl + '/user?email=' + email)
            .map(this.extractData)
            .catch(this.handleError);
    }

    checkUserExistance(options:any) {
        return this.http.get(this.userApiBaseUrl + '/user?' + (options.email ? `email=${options.email}&` : '') +
                (options.displayName ? `displayName=${options.displayName}` : ''))
            .map(this.extractData)
            .catch(this.handleError);
    }

    //getAllPosts():Observable<Post[]> {
    //    return this.http.get(this.postApiBaseUrl)
    //        .map(this.extractData)
    //        .catch(this.handleError);
    //}
    //
    //getSomeLastPosts(count:number):Observable<Post[]> {
    //    return this.http.get(this.postApiBaseUrl + '?count=' + count)
    //        .map(this.extractData)
    //        .catch(this.handleError);
    //}
    //
    //addPost(post:Post):Observable<Post> {
    //    let headers = new Headers({ 'Content-Type': 'application/json' });
    //    let options = new RequestOptions({ headers: headers });
    //    //del _id property for database generated _id
    //    delete post._id;
    //    let body = JSON.stringify(post);
    //
    //    return this.http.post(this.postApiBaseUrl, body, options)
    //        .map(this.extractData)
    //        .catch(this.handleError);
    //}
    //
    //updatePost(post:Post){
    //    let headers = new Headers({ 'Content-Type': 'application/json' });
    //    let options = new RequestOptions({ headers: headers });
    //
    //    return this.http.put(this.postApiBaseUrl + '/' + post._id, JSON.stringify(post), options)
    //        .map(this.extractData)
    //        .catch(this.handleError);
    //}
    //
    //deletePost(id:string){
    //    return this.http.delete(this.postApiBaseUrl + '/' + id)
    //        .catch(this.handleError);
    //}
    //
    private extractData(res:Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error:any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server Error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
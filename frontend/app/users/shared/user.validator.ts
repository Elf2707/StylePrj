/**
 * Created by Elf on 13.06.2016.
 */
import {Control} from '@angular/common';
import {Injector} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {ReflectiveInjector} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';

import UserService from './user.service';

interface  IUsernameEmailValidator {

}

function checkUser(control:Control, field:string):Observable<IUsernameEmailValidator> {
    let injector = ReflectiveInjector.resolveAndCreate([UserService, Http, HTTP_PROVIDERS]);
    let userService = injector.get(UserService);

    return new Observable((obs:any) => {
        control.valueChanges
            .debounceTime(500)
            .flatMap(value => {
                return userService.checkUserExistance({[field]: value});
            })
            .subscribe(
                data => {
                    obs.next(null);
                    obs.complete();
                },

                error => {
                    let reason;
                    if (field === 'displayName') {
                        reason = 'usernameTaken';
                    }

                    if (field === 'email') {
                        reason = 'emailTaken'
                    }

                    obs.next({[reason]: true});
                    obs.complete();
                }
            )
    });
}

export default class UserExistenceValidator {
    constructor() {
    }

    static checkUsername(control:Control) {
        return checkUser(control, 'displayName');
    }

    static checkEmail(control:Control) {
        return checkUser(control, 'email');
    }

}
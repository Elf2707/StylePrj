/**
 * Created by Elf on 13.06.2016.
 */
import {Control} from '@angular/common';
import {Injector} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {ReflectiveInjector} from '@angular/core';

import UserService from './user.service';

interface  IUsernameEmailValidator {

}

function checkUser(control:Control, field:string):Observable<IUsernameEmailValidator> {
    let injector = ReflectiveInjector.resolveAndCreate([UserService]);
    let userService = injector.get(UserService);

    return new Observable((obs:any) => {
        control.valueChanges
            .debounceTime(400)
            .flatMap(value => userService.checkUserExistance(value))
            .subscribe(
                data => {
                    obs.next(null);
                    obs.complite();
                },

                error => {
                    let message = error.json().message;
                    let reason;
                    if (message === 'Username already exists') {
                        reason = 'usernameTaken';
                    }

                    if (message === 'User with this email already exists') {
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
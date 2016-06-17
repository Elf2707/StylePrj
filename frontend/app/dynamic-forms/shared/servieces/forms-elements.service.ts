/**
 * Created by Elf on 05.06.2016.
 */
import {Injectable} from '@angular/core';

import {TextboxElement} from "../../base-elements/textbox-element";
import GroupElementsBase from "../../base-elements/group-elements-base";
import {ElementBase} from "../../base-elements/element-base";

@Injectable()
export class FormsElementsService {
    getElementsForRegistrationForm(){
        let elements:ElementBase<any>[] = [
            new TextboxElement({
                key: 'displayName',
                label: 'Name',
                type: 'text',
                required: true,
                minLength: 3,
                maxLength: 20,
                customValidExistance: true,
                placeholder: 'Enter name to display',
                order: 1
            }),
            new TextboxElement({
                key: 'email',
                label: 'Email',
                type: 'email',
                required: true,
                customValidExistance: true,
                patternMatch: '^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$',
                placeholder: 'Enter email',
                order: 2
            }),
            new GroupElementsBase({
                equalsValid: true,
                key:'passwdGroup',
                order:3,
                elements: [
                    new TextboxElement({
                        key: 'password',
                        label: 'Password',
                        type: 'password',
                        required: true,
                        minLength: 4,
                        placeholder: 'Enter password',
                        order: 3
                    }),
                    new TextboxElement({
                        key: 'confirmPassword',
                        label: 'Confirm password',
                        type: 'password',
                        required: true,
                        minLength: 4,
                        placeholder: 'Confirm password',
                        order: 4
                    })
                ]
            }),
        ];

        return elements.sort((a,b)=> a.order - b.order);
    }
}
/**
 * Created by Elf on 05.06.2016.
 */
import {Injectable} from '@angular/core';

import {ElementBase} from "../../base-elements/element-base";
import {TextboxElement} from "../../base-elements/textbox-element";


@Injectable()
export class FormsElementsService {
    getElementsForRegistrationForm(){
        let elements:ElementBase<any>[] = [
            new TextboxElement({
                key: 'displayName',
                label: 'Name',
                type: 'text',
                required: true,
                placeholder: 'Enter name to display',
                order: 1
            }),
            new TextboxElement({
                key: 'email',
                label: 'Email',
                type: 'email',
                required: true,
                placeholder: 'Enter email',
                order: 2
            }),
            new TextboxElement({
                key: 'password',
                label: 'Password',
                type: 'password',
                required: true,
                placeholder: 'Enter password',
                order: 3
            }),
            new TextboxElement({
                key: 'confirmPassword',
                label: 'Confirm password',
                type: 'password',
                required: true,
                placeholder: 'Confirm password',
                order: 4
            })
        ];

        return elements.sort((a,b)=> a.order - b.order);
    }
}
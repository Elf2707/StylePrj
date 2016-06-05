/**
 * Created by Elf on 05.06.2016.
 */
import {Injectable} from '@angular/core';
import {ElementBase} from "../base-elements/element-base";
import {TextboxElement} from "../base-elements/textbox-element";


@Injectable()
export class FormsElementsService {
    getElementsForRegistrationForm(){
        let elements:ElementBase<any>[] = [
            new TextboxElement({
                key: 'displayName',
                label: 'Name',
                type: 'text',
                required: true,
                order: 1
            }),
            new TextboxElement({
                key: 'email',
                label: 'Email',
                type: 'email',
                required: true,
                order: 2
            }),
            new TextboxElement({
                key: 'password',
                label: 'Password',
                required: true,
                order: 3
            }),
            new TextboxElement({
                key: 'password2',
                label: 'Confirm password',
                required: true,
                order: 4
            })
        ];

        return elements.sort((a,b)=> a.order - b.order);
    }
}